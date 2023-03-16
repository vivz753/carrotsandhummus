import type { Stripe } from "stripe"
import { NextApiRequest, NextApiResponse } from "next"
import { buffer } from "micro"
import getStripe from "lib/stripe/getStripe"
import { sendStripeEmail } from "pages/api"

const STRIPE_SIGNATURE_HEADER = "stripe-signature"
const webhookSecretKey = process.env.STRIPE_WEBHOOKS_SECRET || ""

export enum StripeWebhooks {
  AsyncPaymentSuccess = "checkout.session.async_payment_succeeded",
  Completed = "checkout.session.completed",
  PaymentFailed = "checkout.session.async_payment_failed",
}

// NB: we disable body parser to receive the raw body string. The raw body
// is fundamental to verify that the request is genuine
export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function checkoutsWebhooksHandler(req: NextApiRequest, res: NextApiResponse) {
  const stripe = getStripe()

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST")
    res.status(405).end("Method Not Allowed")
    return
  }

  const signature = req.headers[STRIPE_SIGNATURE_HEADER] || ""
  const rawBody = await buffer(req)

  try {
    const event = stripe?.webhooks.constructEvent(rawBody.toString(), signature, webhookSecretKey)
    const { type } = event
    console.log("type", type)
    switch (type) {
      case StripeWebhooks.AsyncPaymentSuccess: {
        console.log("ASYNC PAYMENT SUCCESS")
        sendStripeEmail(type, event.data.object as Stripe.Checkout.Session)

        break
      }

      case StripeWebhooks.Completed: {
        console.log("CHECKOUT COMPLETED")
        sendStripeEmail(type, event.data.object as Stripe.Checkout.Session)
        
        break
      }

      case StripeWebhooks.PaymentFailed: {
        console.log("ASYNC PAYMENT FAILED")
        sendStripeEmail(type, event.data.object as Stripe.Checkout.Session)

        break
      }

      default: {
        const msg = `Unhandled event: ${type}`
        console.log(msg)
      }
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Internal server error"
    res.status(400).send(`Webhook Error: ${errorMessage}`)
    return
  }
}
