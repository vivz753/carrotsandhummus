import { Carousel, MissingImage, SparkleAnim, Tag } from "@components/core"
import { Product } from "@types"
import { currencyToString } from "lib/utils"
import Image from "next/image"
import Link from "next/link"
import { FC, useState } from "react"
import { useShoppingCart } from "use-shopping-cart"

export const ProductCard: FC<{ product: Product }> = ({ product }) => {
  const { name, price, image, artist, description, size, category, images } = product
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
    <div className="group relative flex w-96 flex-col items-center gap-3 rounded-xl py-5 px-5 ring-2 ring-p5">
      <Link href={`/shoppe/product/${product.id}`}>
        <span className="smooth-transition text-xl group-hover:scale-125">{name}</span>
      </Link>
      {image ? (
        <Link href={`/shoppe/product/${product.id}`}>
          <div className="relative h-72 w-72 rounded-lg">
            <Image
              fill
              className="smooth-transition transform rounded-lg group-hover:scale-105"
              style={{ objectFit: "contain" }}
              alt={name}
              src={image}
            ></Image>
            <div className="absolute inset-0 h-full w-full" />
          </div>
        </Link>
      ) : images && images?.length > 0 ? (
        <Carousel href={`/shoppe/product/${product.id}`} images={images ?? []} />
      ) : (
        <div className="relative h-72 w-72 rounded-lg">
          <MissingImage />
        </div>
      )}
      <div className="flex flex-row gap-1">
        <Tag className="bg-p4 text-white">{size}</Tag>
        <Tag className="bg-p2 text-white">{category}</Tag>
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
