import { FC, useState } from "react"
import { TrashIcon, PlusCircleIcon, MinusCircleIcon } from "@components/icons"

export const SideCartItem: FC<{ name: string; category: string; quantity: number; image: string; price: number }> = ({
  name,
  category,
  // quantity,
  image,
  price,
}) => {
	// TODO: store the quantity of the items in a local storage
	const [quantity, setQuantity] = useState("") // max should be 3 digits
	
  return (
    <div className="h-32 w-full shrink-0 p-2">
      <div className="flex h-full w-full flex-row items-center gap-5 rounded-2xl bg-white px-4 shadow-md">
        <img src={image} className="flex h-14 w-14 shrink-0 rounded-xl"></img>
        <div className="flex w-full flex-col">
          <span>
            {name} ({category})
          </span>
          <span>${price} ea.</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="relative w-12 text-center text-xl">
            <input
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full rounded-md border py-1 text-center"
            />
            <div className="absolute bottom-0 flex w-12 translate-y-full flex-row justify-center pt-1">
              <button
                onClick={() => {
                  setQuantity((val) => {
                    const value = Number(val)
                    if (value > 0) return (value - 1).toString()
                    else return val
                  })
                }}
              >
                <MinusCircleIcon className="h-5 w-5 shrink-0 fill-red-500" />
              </button>
              <button
                onClick={() => {
                  setQuantity((val) => {
                    const value = Number(val)
                    if (value < 999) return (value + 1).toString()
                    else return val
                  })
                }}
              >
                <PlusCircleIcon className="h-5 w-5 shrink-0 fill-green-500" />
              </button>
            </div>
          </span>
        </div>
        {/* TODO: Delete Item Button */}
				<button onClick={() => 0} className="h-6 w-6 shrink-0">
          <TrashIcon className="h-full w-full stroke-p4" />
        </button>
      </div>
    </div>
  )
}

