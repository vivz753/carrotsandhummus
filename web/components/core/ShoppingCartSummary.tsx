import { useState } from "react"
import axios from "axios"
import { useShoppingCart, formatCurrencyString } from "use-shopping-cart"
import Image from "next/image"
import { MissingImage, Button } from "@components/core"

export const ShoppingCartSummary = () => {
  const [loading, setLoading] = useState(false)
  const { cartDetails, redirectToCheckout, totalPrice } = useShoppingCart()

  const checkout = async () => {
    setLoading(true)
    try {
      const checkoutSession = await axios.post(`/api/checkout_sessions`, cartDetails, {
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3000", // TODO: do I need to add the carrotsandhummus.art domain?
        },
      })
      console.log("checkoutSession.data", checkoutSession.data)
      checkoutSession.data.status
      await redirectToCheckout(checkoutSession.data.id)
    } catch (error) {
      let errorMsg = error
      if (axios.isAxiosError(error)) {
        errorMsg = error.response?.data.message
      }
      alert(errorMsg)
    }
    setLoading(false)
  }

  console.log("cartDetails", cartDetails)

  return (
    <div className="mx-20  my-10 flex flex-col gap-10 rounded-xl p-20 ring-4 ring-p5">
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
