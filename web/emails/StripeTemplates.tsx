import { Container } from "@react-email/container"
import { Html } from "@react-email/html"
import { Section } from "@react-email/section"
import { Text } from "@react-email/text"
import { FC } from "react"
import { StripeWebhooks } from "pages/api/stripe/webhook"
import Stripe from "stripe"

const EmailContainer: FC<React.PropsWithChildren> = ({ children }) => (
  <Html>
    <Section style={main}>
      <Container style={container}>{children}</Container>
    </Section>
  </Html>
)

export const StripeInvoiceTemplate = (type: StripeWebhooks, checkoutSession: Stripe.Checkout.Session) => {
  const { amount_subtotal, amount_total, customer_details, shipping_cost, shipping_details } = checkoutSession

  return (
    <EmailContainer>
      <Text>Subtotal: {amount_subtotal}</Text>
      <Text>Total: {amount_total}</Text>
      <Text>Customer Email:{customer_details?.email}</Text>
    </EmailContainer>
  )
}

// Styles for the email template
const main = {
  backgroundColor: "#ffffff",
}

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "580px",
}
