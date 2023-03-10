import { Button, MissingImage } from "@components/core"
import axios from "axios"
import Image from "next/image"
import { useState } from "react"
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart"

export const ShoppingCartSummary = () => {
  const [loading, setLoading] = useState(false)
  const { cartDetails, redirectToCheckout, totalPrice } = useShoppingCart()

  const checkout = async () => {
    setLoading(true)
    try {
      const checkoutSession = await axios.post(`/api/stripe/checkout`, cartDetails, {
        headers: {
          // "Access-Control-Allow-Origin": "http://localhost:3000", // TODO: do I need to add the carrotsandhummus.art domain?
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
    <div className="my-10 flex w-full flex-col justify-center gap-10 rounded-xl px-5 py-10 ring-4 ring-p5 lg:w-min lg:p-20">
      <span className="text-3xl">Shopping Cart</span>
      <div className="flex flex-col gap-5">
        <div className="grid w-full auto-cols-fr grid-flow-col text-center lg:auto-cols-auto">
          <span className="w-16 lg:w-48 ">pic</span>
          <span className="w-auto lg:w-72">item</span>
          <span className="w-auto lg:w-24 ">quantity</span>
          <span className="hidden w-auto lg:block lg:w-24">artist</span>
          <span className="w-auto lg:w-24 ">unit price</span>
        </div>
        {/* Cart Items */}
        {cartDetails &&
          Object.values(cartDetails).map((item) => (
            <div key={item.id} className="grid max-w-full auto-cols-fr grid-flow-col items-center lg:auto-cols-auto  ">
              <div className="relative flex h-16 w-16 shrink-0 grow-0 rounded-xl border lg:h-48 lg:w-48">
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
              <div className="w-min text-center lg:w-72 lg:p-8">{item.name}</div>
              <div className="p-2 text-center lg:w-24">{item.quantity}</div>
              <div className="hidden p-2 text-center lg:block lg:w-24">{item.artist}</div>
              <div className="p-2 text-center lg:w-24">
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
