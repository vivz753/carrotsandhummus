// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
import { useEffect, useState } from "react"
import axios from "axios"
import { useShoppingCart, formatCurrencyString } from "use-shopping-cart"
import Image from "next/image"
import { MissingImage, Button } from "@components/core"

export default function PreviewPage() {
  const { cartDetails, redirectToCheckout, totalPrice } = useShoppingCart()
  const cartItems = Object.entries(cartDetails ?? {})

  // useEffect(() => {
  //   // Check to see if this is a redirect back from Checkout
  //   const query = new URLSearchParams(window.location.search)
  //   if (query.get("success")) {
  //     console.log("Order placed! You will receive an email confirmation.")
  //   }

  //   if (query.get("canceled")) {
  //     console.log("Order canceled -- continue to shop around and checkout when you’re ready.")
  //   }
  // }, [])

  return (
    <div className="flex h-full min-h-screen w-screen flex-col items-center justify-center gap-5 pt-20">
      {cartItems.length > 0 ? (
        <ShoppingCart />
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-20">
          <div className="flex flex-col items-center justify-center gap-5">
            <span>{`The cashier gives you an awkward, but polite smile.`}</span>
            <div className="relative h-72 w-72 bg-p1">
              <Image src="/images/awkward/politesmilecat.PNG" alt="awkward-cat" fill style={{ objectFit: "contain" }} />
            </div>
            <span>{`"ummm.... your cart is empty"`}</span>
          </div>
          <div className="flex flex-col items-center gap-5">
            <span>{`Maybe you should go buy something...`}</span>
            <Button href="/shoppe">Fine</Button>
          </div>
        </div>
      )}
    </div>
  )
}

const ShoppingCart = () => {
  const [loading, setLoading] = useState(false)
  const { cartDetails, redirectToCheckout, totalPrice } = useShoppingCart()

  const checkout = async () => {
    setLoading(true)
    try {
      const checkoutSession = await axios.post(`/api/checkout_sessions`, cartDetails, {
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3000",
        },
      })
      console.log("checkoutSession.data", checkoutSession.data)
      checkoutSession.data.status
      redirectToCheckout(checkoutSession.data.id)
    } catch (error) {
      alert(`Error:${error}`)
    }
    setLoading(false)
  }

  return (
    <div className="m-20 flex flex-col gap-10  rounded-xl p-20 ring-4 ring-p5">
      <span className="text-3xl">Shopping Cart</span>
      <div className="flex flex-col gap-5">
        {/* Cart Items */}
        {cartDetails &&
          Object.values(cartDetails).map((item) => (
            <div key={item.id} className="flex h-full w-full flex-row items-center gap-5">
              <div className="relative flex h-48 w-48 shrink-0 grow-0 rounded-xl border">
                {item.image ? (
                  <Image
                    style={{ objectFit: "contain" }}
                    className="rounded-xl"
                    src={item.image}
                    fill
                    alt={item.name}
                  ></Image>
                ) : (
                  <span className="h-full w-full rounded-xl bg-red-200">
                    <MissingImage />
                  </span>
                )}
              </div>
              <div className="p-5">{item.quantity}</div>x<div className="p-5">{item.name}</div>
              <div className="p-5">{item.artist}</div>
              <div className="bg-green-500 p-5 text-white">{item.currency}</div>
              <div className="p-5">
                {formatCurrencyString({
                  value: item.price,
                  currency: "USD",
                  language: "en-US",
                })}
              </div>
            </div>
          ))}
      </div>
      <span className="text-2xl">
        {`Total: `}
        {formatCurrencyString({
          value: totalPrice ?? 0,
          currency: "USD",
          language: "en-US",
        })}
      </span>
      <Button wide onClick={checkout} disabled={loading} variant="solid3" size="lg">
        Checkout
      </Button>
    </div>
  )
}
