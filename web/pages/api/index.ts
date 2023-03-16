// Functions using the API
import backend from "@lib/backend"
import axios from "axios"
import { StripeWebhooks } from "pages/api/stripe/webhook"
import Stripe from "stripe"
import { render } from "@react-email/render"
import {
  StripeInvoiceTemplate
} from "emails/StripeTemplates"

const getTemplate = (type: StripeWebhooks, checkoutSession: Stripe.Checkout.Session) => {
	return StripeInvoiceTemplate(type, checkoutSession)
}

const getSubject = (type: StripeWebhooks) => {
  switch (type) {
    case StripeWebhooks.AsyncPaymentSuccess: {
      return "Carrots And Hummus: Payment Successful"
    }
    case StripeWebhooks.Completed: {
      return "Carrots And Hummus: Order Submitted"
    }
    case StripeWebhooks.PaymentFailed: {
      return "Carrots And Hummus: Payment Failed"
    }

    default:
      return "Carrots And Hummus"
  }
}

export const sendStripeEmail = async (
  type: StripeWebhooks,
  checkoutSession: Stripe.Checkout.Session
) => {
	console.log('checkoutSession', checkoutSession)
	const recipient = checkoutSession.customer_email ?? checkoutSession.customer_details?.email


  try {
    const email = await backend.post(`http://localhost:3000/api/send-email`, {
      to: recipient,
      subject: getSubject(type),
      html: render(getTemplate(type, checkoutSession)),
    })
    console.log("email response", email)
  } catch (error) {
    let errorMsg = error
    if (axios.isAxiosError(error)) {
      errorMsg = error.response?.data.message
    }
    console.log("error:", errorMsg)
  }
}
