import { FC, useState } from "react"
import { TrashIcon, PlusCircleIcon, MinusCircleIcon } from "@components/icons"
import { MissingImage } from "@components/core"
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart"
import Image from "next/image"

export const SideCartItem: FC<{
  name: string
  category: string
  quantity: number
  image: string
  price: number
  cartItemId: string
}> = ({ name, category, quantity, image, price, cartItemId }) => {
  const { decrementItem, incrementItem, removeItem } = useShoppingCart()

  const userFriendlyPrice = formatCurrencyString({
    value: price,
    currency: "USD",
    language: "en-US",
  })

  // const [cartQuantity, setCartQuantity] = useState(quantity.toString()) // max should be 3 digits

  return (
    <div className="h-32 w-full shrink-0 p-2">
      <div className="flex h-full w-full flex-row items-center gap-5 rounded-2xl bg-white px-4 shadow-md">
        <div className="relative flex h-16 w-16 shrink-0 grow-0 rounded-xl">
          {image ? (
            <Image src={image} layout="fill" alt={name}></Image>
          ) : (
            <span className="h-full w-full bg-red-200">
              <MissingImage />
            </span>
          )}
        </div>
        <div className="flex w-full flex-col">
          <span>
            {name} ({category})
          </span>
          <span>{userFriendlyPrice} ea.</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="relative w-12 text-center text-xl">
            <input
              value={quantity}
              // onChange={(e) => setCartQuantity(e.target.value)}
              className="w-full rounded-md border py-1 text-center"
            />
            <div className="absolute bottom-0 flex w-12 translate-y-full flex-row justify-center pt-1">
              <button
                onClick={() => {
                  // setCartQuantity((val) => {
                  //   const value = Number(val)
                  //   if (value > 0) return (value - 1).toString()
                  //   else return val
                  // })
                  decrementItem(cartItemId)
                }}
              >
                <MinusCircleIcon className="h-5 w-5 shrink-0 fill-red-500" />
              </button>
              <button
                onClick={() => {
                  // setCartQuantity((val) => {
                  //   const value = Number(val)
                  //   if (value < 999) return (value + 1).toString()
                  //   else return val
                  // })
                  incrementItem(cartItemId)
                }}
              >
                <PlusCircleIcon className="h-5 w-5 shrink-0 fill-green-500" />
              </button>
            </div>
          </span>
        </div>
        {/* TODO: Delete Item Button */}
        <button onClick={() => removeItem(cartItemId)} className="h-6 w-6 shrink-0">
          <TrashIcon className="h-full w-full stroke-p4" />
        </button>
      </div>
    </div>
  )
}
