import { Button, DeleteProductButton, EditProductQuantityButtons, LoadingOverlay, MissingImage } from "@components/core"
import axios from "axios"
import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart"

export const ShoppingCartSummary = () => {
  const [loading, setLoading] = useState(false)
  const { cartDetails, redirectToCheckout, totalPrice } = useShoppingCart()

  const checkout = async () => {
    setLoading(true)
    try {
      const checkoutSession = await axios.post(`/api/stripe/checkout`, cartDetails)
      await redirectToCheckout(checkoutSession.data.id)
    } catch (error) {
      let errorMsg = error
      if (axios.isAxiosError(error)) {
        errorMsg = error.response?.data.message
      }
    }
    setLoading(false)
  }

  return (
    <>
      {loading && <LoadingOverlay />}
      <div
        className={clsx(
          "my-10 flex w-full flex-col justify-center gap-10 rounded-xl px-5 py-10 ring-4 ring-p5 lg:w-min lg:p-20",
          loading && "pointer-events-none"
        )}
      >
        <span className="text-3xl">Shopping Cart</span>
        <div className="flex flex-col gap-5">
          <div className="grid w-full grid-flow-col text-center lg:auto-cols-auto">
            {/* COL 1 - Pic */}
            <span className="w-20 lg:w-48 "></span>
            {/* COL 2 */}
            <span className="w-32 lg:w-72">item</span>
            {/* COL 3 */}
            <span className="hidden w-auto lg:block lg:w-40">artist</span>
            {/* COL 4 */}
            <span className="hidden w-auto lg:block lg:w-24 ">unit price</span>
            {/* COL 5 */}
            <span className="w-auto lg:w-32">quantity</span>
            {/* COL 6 - Delete Button */}
            <span className="w-4"></span>
          </div>
          {/* Cart Items */}
          {cartDetails &&
            Object.values(cartDetails).map((item) => (
              <div key={item.id} className="grid max-w-full grid-flow-col items-center lg:auto-cols-auto  ">
                {/* COL 1 */}
                <Link href={`/shoppe/product/${item.id}`}>
                  <div className="relative flex h-20 w-20 shrink-0 grow-0 rounded-xl lg:h-48 lg:w-48">
                    {item.image || (item.images && item.images.length > 0) ? (
                      <Image
                        style={{ objectFit: "contain" }}
                        className="rounded-xl"
                        src={item.image || item.images[0]}
                        fill
                        alt={item.name}
                      ></Image>
                    ) : (
                      <span className="h-full w-full rounded-xl bg-red-200">
                        <MissingImage />
                      </span>
                    )}
                    <div className="absolute inset-0 h-full w-full" />
                  </div>
                </Link>
                {/* COL 2 */}
                <div className="flex w-32 flex-col items-center gap-1 lg:w-72 lg:p-8">
                  <Link href={`/shoppe/product/${item.id}`}>
                    <span className="text-center text-lg lg:text-xl">{item.name}</span>
                  </Link>
                  <span className="text-md text-center uppercase">
                    {item.size} {item.category}
                  </span>
                </div>
                {/* COL 3 */}
                <div className="hidden p-2 text-center text-lg lg:block lg:w-40">{item.artist}</div>
                {/* COL 4 */}
                <div className="hidden p-2 text-center text-xl lg:block lg:w-24 lg:text-2xl">
                  {formatCurrencyString({
                    value: item.price,
                    currency: "USD",
                    language: "en-US",
                  })}
                </div>
                {/* COL 5 */}
                <div className="flex items-center justify-center gap-5 p-2 lg:w-32">
                  <EditProductQuantityButtons quantity={item.quantity} productId={item.id} />
                </div>
                {/* COL 6 */}
                <div className="flex w-4 items-center justify-center p-2">
                  <DeleteProductButton productId={item.id} />
                </div>
              </div>
            ))}
        </div>
        <span className="text-2xl">
          {`Sub Total: `}
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
    </>
  )
}
