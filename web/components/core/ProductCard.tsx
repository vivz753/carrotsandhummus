import { Button, Carousel, MissingImage, SparkleAnim, Tag } from "@components/core"
import { Product } from "@types"
import { currencyToString } from "lib/utils"
import Image from "next/image"
import Link from "next/link"
import { FC, useState } from "react"
import { useShoppingCart } from "use-shopping-cart"

export const ProductCard: FC<{ product: Product }> = ({ product }) => {
  const { name, price, image, artist, description, size, category, images, tags } = product
  const userFriendlyPrice = currencyToString(price, product.currency)

  return (
    <div className="group relative flex w-96 flex-col items-center gap-3 rounded-xl py-8 px-8 ring-2 ring-p5">
      <Link href={`/shoppe/product/${product.id}`}>
        <span className="smooth-transition text-xl group-hover:scale-125">{name}</span>
      </Link>
      {images && images?.length > 0 ? (
        <Carousel href={`/shoppe/product/${product.id}`} images={images ?? []} />
      ) : image ? (
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
      ) : (
        <div className="relative h-72 w-72 rounded-lg">
          <MissingImage />
        </div>
      )}
      <div className="mb-5 flex w-full justify-center">
        <span>by {artist}</span>
      </div>
      <div className="flex h-full w-full flex-col items-center justify-between gap-8">
        <div className="flex flex-col items-center gap-1">
          <div className="flex flex-row gap-1">
            <Tag className="bg-p4 text-white">{size}</Tag>
            <Tag className="bg-p2 text-white">{category}</Tag>
          </div>
          {tags && tags.length && (
            <div className="flex flex-row gap-1">
              {tags.map((tag) => (
                <Tag className="bg-blue-400 text-white" size="sm">
                  {tag}
                </Tag>
              ))}
            </div>
          )}
        </div>
        <span className="">{description}</span>
        <div className="flex w-full flex-col gap-2">
          <span className="text-md">{userFriendlyPrice}</span>
          <AddButton product={product} />
        </div>
      </div>
    </div>
  )
}

const AddButton: FC<{ product: Product }> = ({ product }) => {
  const { addItem } = useShoppingCart()

  const [clicked, setClicked] = useState(false)
  const addToCart = (product: Product): void => {
    addItem(product)

    if (!clicked) {
      setClicked(true)
      setTimeout(() => {
        setClicked(false)
      }, 3000)
    }
  }

  return (
    <Button variant="solid1" wide onClick={() => addToCart(product)}>
      {clicked ? (
        <SparkleAnim amount={10} duration={5000}>
          <span>Added!</span>
        </SparkleAnim>
      ) : (
        <span>ADD TO CART</span>
      )}
    </Button>
  )
}
