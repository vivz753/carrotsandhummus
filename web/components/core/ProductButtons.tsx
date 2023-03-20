import { MinusCircleIcon, PlusCircleIcon, TrashIcon } from "@components/icons"
import { FC } from "react"
import { useShoppingCart } from "use-shopping-cart"

export const DeleteProductButton: FC<{ productId: string }> = ({ productId }) => {
  const { removeItem } = useShoppingCart()

  return (
    <button onClick={() => removeItem(productId)} className="h-6 w-6 shrink-0">
      <TrashIcon className="h-full w-full stroke-p4" />
    </button>
  )
}

export const EditProductQuantityButtons: FC<{ quantity: number; productId: string }> = ({ quantity, productId }) => {
  const { decrementItem, incrementItem } = useShoppingCart()
  return (
    <div className="flex flex-col gap-2">
      <span className="relative w-12 text-center text-xl">
        <input
          disabled
          value={quantity}
          // onChange={(e) => setCartQuantity(e.target.value)}
          className="w-full rounded-md border py-1 text-center"
        />
        <div className="absolute bottom-0 flex w-12 translate-y-full flex-row justify-center pt-1">
          <button
            onClick={() => {
              decrementItem(productId)
            }}
          >
            <MinusCircleIcon className="h-5 w-5 shrink-0 fill-red-500" />
          </button>
          <button
            onClick={() => {
              incrementItem(productId)
            }}
          >
            <PlusCircleIcon className="h-5 w-5 shrink-0 fill-green-500" />
          </button>
        </div>
      </span>
    </div>
  )
}
