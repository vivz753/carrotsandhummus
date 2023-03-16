// Endpoint: `/api/stripe/checkout`
// Type: POST
// Purpose: Used to perform checkout order with Stripe
import { NextApiRequest, NextApiResponse } from "next"
// import Stripe from "stripe"
import { client } from "@lib/sanity/client"
import { merchQuery } from "@lib/sanity/merchQuery"
import getStripe from "lib/stripe/getStripe"
import Stripe from "stripe"

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { validateCartItems } = require("use-shopping-cart/utilities")

// import { formatAmountForStripe } from '../../../utils/stripe-helpers'
const stripe = getStripe()
const salesTaxId = process.env.STRIPE_SALES_TAX_ID

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      // fetch the items from Sanity
      const products = await client.fetch(merchQuery)
      console.log("products", products)
      console.log("req.body", req.body)

      const line_items = validateCartItems(products, req.body).map((itemToAddTax: any) => {
        console.log(itemToAddTax)
        return {
          ...itemToAddTax,
          tax_rates: [
            salesTaxId
          ],
        }
      })

      // Create Checkout Sessions from body params.
      const params: Stripe.Checkout.SessionCreateParams = {
        submit_type: "pay",
        mode: "payment",
        invoice_creation: { enabled: true },
        payment_method_types: ["card"],
        shipping_address_collection: {
          allowed_countries: ["US"],
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: { amount: 200, currency: "usd" },
              display_name: "Standard Shipping",
              delivery_estimate: {
                minimum: { unit: "business_day", value: 2 },
                maximum: { unit: "business_day", value: 5 },
              },
            },
          },
        ],
        line_items,
        success_url: `${req.headers.origin}/shoppe/preview?transaction=success`,
        cancel_url: `${req.headers.origin}/shoppe/preview?transaction=failed`,
      }
      const checkoutSession: Stripe.Checkout.Session = await stripe?.checkout.sessions.create(params)

      // res.redirect(303, checkoutSession.url)
      res.status(200).json(checkoutSession)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Internal server error"
      res.status(500).json({ statusCode: 500, message: errorMessage })
    }
  } else {
    res.setHeader("Allow", "POST")
    res.status(405).end("Method Not Allowed")
  }
}
