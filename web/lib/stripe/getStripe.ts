// import { Stripe as StripeType, loadStripe } from "@stripe/stripe-js"
import Stripe from "stripe"

// let stripePromise: Promise<StripeType | null>
let stripePromise: Stripe
// const getStripe = () => {
//   if (!stripePromise) {
//     stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "")
//   }
//   return stripePromise
// }

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
      apiVersion: "2022-11-15",
    })
  }
  return stripePromise
}

export default getStripe
