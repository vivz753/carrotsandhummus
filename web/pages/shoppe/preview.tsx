// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
import { useEffect } from "react"
import getStripe from "@lib/stripe/getStripe"
import axios from "axios"
import { useShoppingCart } from "use-shopping-cart"

const stripePromise = getStripe()
export default function PreviewPage() {
  const {cartDetails, redirectToCheckout} = useShoppingCart()
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search)
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.")
    }

    if (query.get("canceled")) {
      console.log("Order canceled -- continue to shop around and checkout when you’re ready.")
    }
  }, [])

  return (
		<form method="POST" action="/api/checkout_sessions" 
    // onSubmit={async (event) => {
    //   event.preventDefault()
    //   const checkoutSession = await axios.post(`/api/checkout_sessions`, cartDetails, {
    //     headers: {
    //       "Access-Control-Allow-Origin": "http://localhost:3000"
    //     }
    //   })
    //   console.log('checkoutSession', checkoutSession)
    //   // redirectToCheckout({sessionId: checkoutSession.data.id})
		// }}
    >
      <section>
        <button type="submit" role="link">
          Checkout
        </button>
      </section>
    </form>
  )
}
