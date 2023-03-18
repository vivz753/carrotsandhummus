// Functions using the API
import backend from "@lib/backend"
import { render } from "@react-email/render"
import axios from "axios"
import { StripeInvoiceTemplate } from "emails/StripeTemplates"
import { StripeWebhooks } from "pages/api/stripe/webhook"
import Stripe from "stripe"

const getTemplate = (type: StripeWebhooks, checkoutSession: Stripe.Checkout.Session) => {
  return StripeInvoiceTemplate(type, checkoutSession)
}

const getSubject = (type: StripeWebhooks) => {
  switch (type) {
    case StripeWebhooks.PaymentSuccess: {
      return "Carrots And Hummus Art: Payment Successful"
    }
    case StripeWebhooks.Completed: {
      return "Carrots And Hummus Art: Order Submitted"
    }
    case StripeWebhooks.PaymentFailed: {
      return "Carrots And Hummus Art: Payment Failed"
    }

    default:
      return "Carrots And Hummus"
  }
}

export const sendStripeEmail = async (type: StripeWebhooks, checkoutSession: Stripe.Checkout.Session) => {
  console.log("checkoutSession", checkoutSession)
  // const recipient = checkoutSession.customer_email ?? checkoutSession.customer_details?.email
  const recipient = "carrotsandhummusart@gmail.com"

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
