import { NextApiRequest, NextApiResponse } from "next"
import Stripe from "stripe"
// import { validateCartItems } from "use-shopping-cart"
import { client } from "@lib/sanity/client"
import { merchQuery } from "@lib/sanity/merchQuery"

const { validateCartItems } = require('use-shopping-cart/utilities')

// import { formatAmountForStripe } from '../../../utils/stripe-helpers'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const amount: number = req.body.amount
    try {
      // fetch the items from Sanity
      const products = await client.fetch(merchQuery)

      console.log("products", products)

      console.log("req.body", req.body)

      const line_items = validateCartItems(products, req.body)

      console.log("line_items", line_items)

      // Create Checkout Sessions from body params.
      const params: Stripe.Checkout.SessionCreateParams = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        shipping_address_collection: {
          allowed_countries: ["US"],
        },
        line_items,
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/shoppe/preview`,
      }
      console.log('params', params)
      const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create({
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        shipping_address_collection: {
          allowed_countries: ["US"],
        },
        line_items: line_items,
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/shoppe`,
      })
      if (!checkoutSession.url) {
        throw new Error("checkout session URL not found")
      }
      res.redirect(303, checkoutSession.url)
      // res.status(200).json(checkoutSession)
      console.log('redirecting')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Internal server error"
      res.status(500).json({ statusCode: 500, message: errorMessage })
    }
  } else {
    res.setHeader("Allow", "POST")
    res.status(405).end("Method Not Allowed")
  }
}
