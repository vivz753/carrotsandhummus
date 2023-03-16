// import { Stripe as StripeType, loadStripe } from "@stripe/stripe-js"
import Stripe from "stripe"

// with Stripe JS
// let stripePromise: Promise<StripeType | null>
// const getStripe = () => {
//   if (!stripePromise) {
//     stripePromise =  loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "")
//   }
//   console.log('stripePromise', stripePromise)
//   return stripePromise
// }

// with Node Stripe library
let stripePromise: Stripe
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
      apiVersion: "2022-11-15",
    })
  }
  return stripePromise
}

export default getStripe
