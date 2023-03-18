import { Container, Heading, Html, Section, Tailwind, Text } from "@react-email/components"
// import { currencyToString } from "lib/utils"
import clsx from "clsx"
import { StripeWebhooks } from "pages/api/stripe/webhook"
import { FC } from "react"
import Stripe from "stripe"
import { formatCurrencyString } from "use-shopping-cart"

export const currencyToString = (price: number, currency?: string) =>
  formatCurrencyString({
    value: price,
    currency: currency ?? "USD",
    language: "en-US",
  })

const EmailContainer: FC<React.PropsWithChildren> = ({ children }) => (
  <Html lang="en" dir="ltr">
    <Tailwind
      config={{
        theme: {
          extend: {
            fontFamily: {
              body: ["Nunito"],
              title: ["Dunkin"],
            },
            colors: {
              p1: "#e4fde1",
              p2: "#8acb88",
              p3: "#648381",
              p4: "#575761",
              p5: "#ffbf46",
            },
          },
        },
      }}
    >
      <Section className="bg-white">
        <Container className="w-[580px] rounded-2xl p-10">{children}</Container>
      </Section>
    </Tailwind>
  </Html>
)

const getHeadingText = (type: StripeWebhooks) => {
  switch (type) {
    case StripeWebhooks.Completed:
      return "Order Submitted"
    case StripeWebhooks.PaymentSuccess:
      return "Checkout completed"
    case StripeWebhooks.PaymentFailed:
      return "Checkout completed"
  }
}

const getHeadingStyle = (type: StripeWebhooks) => {
  switch (type) {
    case StripeWebhooks.Completed:
      return "text-blue-500"
    case StripeWebhooks.PaymentSuccess:
      return "text-green-500"
    case StripeWebhooks.PaymentFailed:
      return "text-red-500 underline"
  }
}

export const StripeInvoiceTemplate = (type: StripeWebhooks, checkoutSession: Stripe.Checkout.Session) => {
  const { amount_subtotal, amount_total, customer_details, shipping_details, total_details } = checkoutSession
  const { email, name, phone, address: billingAddress } = customer_details ?? {}
  const { address: shippingAddress, name: shippingName } = shipping_details ?? {}
  const { amount_discount, amount_shipping, amount_tax } = total_details ?? {}

  return (
    <EmailContainer>
      <Heading className={clsx("text-center text-3xl font-semibold", getHeadingStyle(type))}>
        {getHeadingText(type)}
      </Heading>
      <Container>
        <Text className="px-2 py-5 text-2xl">CUSTOMER CONTACT</Text>
        <Text>{email}</Text>
        {phone && <Text>{phone}</Text>}
      </Container>
      <Container>
        <Text className="px-2 py-5 text-2xl">BILLING INFO</Text>
        <Text>{name}</Text>
        <Text>
          {billingAddress?.line1} {billingAddress?.line2 ?? ""}
        </Text>
        <Text>
          {billingAddress?.city}, {billingAddress?.state} {billingAddress?.postal_code}, {billingAddress?.country}
        </Text>
      </Container>
      <Container>
        <Text className="px-2 py-5 text-2xl">SHIP TO</Text>
        <Text>{shippingName}</Text>
        <Text>
          {shippingAddress?.line1} {shippingAddress?.line2 ?? ""}
        </Text>
        <Text>
          {shippingAddress?.city}, {shippingAddress?.state} {shippingAddress?.postal_code}, {shippingAddress?.country}
        </Text>
      </Container>
      <Container>
        <Text className="text-xl">SUBTOTAL: {currencyToString(amount_subtotal || 0)}</Text>
        <Text className="text-xl">DISCOUNT: {currencyToString(amount_discount || 0)}</Text>
        <Text className="text-xl">SHIPPING: {currencyToString(amount_shipping || 0)}</Text>
        <Text className="text-xl">SALES TAX: {currencyToString(amount_tax || 0)}</Text>
        <Text className="text-xl">TOTAL: {currencyToString(amount_total || 0)}</Text>
      </Container>
    </EmailContainer>
  )
}

export default StripeInvoiceTemplate
