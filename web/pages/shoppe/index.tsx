import Image from "next/image"
import { client } from "@lib/sanity/client"
import { merchQuery } from "@lib/sanity/merchQuery"
import { NextPage, GetStaticProps } from "next"
import { FC, useState } from "react"
import { useShoppingCart, formatCurrencyString } from "use-shopping-cart"
import { MissingImage } from "@components/core"
import { Product } from "@types"

const ProductCard: FC<{ product: Product }> = ({ product }) => {
  const { name, price, image, artist, description } = product
  // const [animation, setAnimation] = useState(false)
  const { addItem, cartDetails } = useShoppingCart()
  const addToCart = (product: Product): void => {
    addItem(product)
    console.log("cartDetails", cartDetails)
    // setAnimation(true)
  }

  const userFriendlyPrice = formatCurrencyString({
    value: price,
    currency: product.currency ?? "USD",
    language: "en-US",
  })
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
        className="smooth-transition my-5 mt-auto h-10 w-10 select-none rounded-lg bg-p5 text-white hover:scale-110"
      >
        +
      </button>
      <div className="flex w-full flex-row justify-between">
        <span>{userFriendlyPrice}</span>

        <span>by {artist}</span>
      </div>
      <div className="flex w-full justify-center"></div>
    </div>
  )
}

const Shoppe: NextPage<{ products: Array<Product> }> = ({ products }) => {
  console.log("products", products)
  return (
    <main>
      <div className="flex h-full w-screen flex-col pt-20">
        <div className="flex flex-col items-center justify-center gap-5 px-8 text-center">
          <span className="mt-20 mb-12 text-3xl">Ye Olde Shoppe</span>
          <span>{`The storekeeper doesn't look too happy, but at least they're not hostile.`}</span>
          <span>{`"I GUESS you can look around.."`}</span>
          <div className="relative h-48 w-48">
            <Image src="/images/angry/doomsdaycat.JPG" alt="doomsdaycat" fill style={{ objectFit: "contain" }} />
          </div>
          <span>{`"HMPH...."`}</span>
          <div className="flex w-full flex-wrap justify-center gap-10 p-20">
            {products.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Shoppe

export const getStaticProps: GetStaticProps<{ products: Array<Product> }> = async () => {
  const products = await client.fetch(merchQuery)

  return {
    props: {
      products,
    },
  }
}
