// This API is used to retrieve the payment intent data from a checkout session -- see ConfirmationSummary component
import getStripe from "@lib/stripe/getStripe"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const stripe = getStripe()
  const session_id = req.query.session_id as string
	console.log('session_id req query', req.query.session_id)
  try {
    if (!session_id.startsWith("cs_")) {
      throw Error("Incorrect CheckoutSession ID.")
    }
    const checkout_session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["payment_intent"],
    })

    res.status(200).json(checkout_session)
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err instanceof Error ? err.message : "Internal server error: Unable to fetch the Stripe checkout session_id info" })
  }
}
