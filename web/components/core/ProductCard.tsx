import { MissingImage, SparkleAnim } from "@components/core"
import { Product } from "@types"
import { currencyToString } from "lib/utils"
import Image from "next/image"
import { FC, useState } from "react"
import { useShoppingCart } from "use-shopping-cart"

export const ProductCard: FC<{ product: Product }> = ({ product }) => {
  const { name, price, image, artist, description } = product
  const { addItem, cartDetails } = useShoppingCart()
  const [clicked, setClicked] = useState(false)

  const addToCart = (product: Product): void => {
    addItem(product)
    console.log("cartDetails", cartDetails)

    if (!clicked) {
      setClicked(true)
      setTimeout(() => {
        setClicked(false)
      }, 3000)
    }
  }

  const userFriendlyPrice = currencyToString(price, product.currency)

  return (
    <div className="group relative flex w-96 flex-col items-center gap-2 rounded-xl py-5 px-5 ring-1 ring-p5">
      <span className="text-xl">{name}</span>

      <div className="smooth-transition relative h-72 w-72 transform rounded-lg group-hover:scale-105">
        {image ? (
          <Image fill className="rounded-lg" style={{ objectFit: "contain" }} alt={name} src={image}></Image>
        ) : (
          <MissingImage />
        )}
      </div>
      <span className="mb-5">{description}</span>
      <button
        onClick={() => addToCart(product)}
        className="smooth-transition smooth-transition-all my-5 mt-auto flex select-none rounded-lg bg-p5 text-white hover:scale-110 active:opacity-50"
      >
        {clicked ? (
          <SparkleAnim amount={10} duration={5000}>
            <span className="px-5 py-2">Added!</span>
          </SparkleAnim>
        ) : (
          <span className="px-5 py-2">+</span>
        )}
      </button>
      <div className="flex w-full flex-row justify-between">
        <span>{userFriendlyPrice}</span>

        <span>by {artist}</span>
      </div>
      <div className="flex w-full justify-center"></div>
    </div>
  )
}
