import { NextApiRequest, NextApiResponse } from "next"
import Stripe from "stripe"
import { client } from "@lib/sanity/client"
import { merchQuery } from "@lib/sanity/merchQuery"

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { validateCartItems } = require("use-shopping-cart/utilities")

// import { formatAmountForStripe } from '../../../utils/stripe-helpers'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2022-11-15",
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      // fetch the items from Sanity
      const products = await client.fetch(merchQuery)

      const line_items = validateCartItems(products, req.body)

      // Create Checkout Sessions from body params.
      const params: Stripe.Checkout.SessionCreateParams = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        shipping_address_collection: {
          allowed_countries: ["US"],
        },
        line_items,
        success_url: `${req.headers.origin}/shoppe/preview?transaction=success`,
        cancel_url: `${req.headers.origin}/shoppe/preview?transaction=failed`,
      }
      const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create(params)
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
