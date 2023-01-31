import Image from "next/image"
import { client } from "../../lib/sanity/client"
import { merchQuery } from "../../lib/sanity/merchQuery"
import { NextPage, GetStaticProps } from "next"
import { FC } from "react"

type Product = {
  name: string
  artist: string
  price: number
  stock?: number
  description?: string
  size?: string
  category?: string
  image?: string
  id: string
}

const addToCart = (item: string): void => {
  alert(`added ${item} to cart`) // toast
}

const ProductCard: FC<Omit<Product, "id">> = ({ name, price, image }) => {
  return (
    <div className="group flex h-full w-96 flex-col items-center gap-5 rounded-xl py-10 px-5 outline">
      <div className="smooth-hover relative h-72 w-72 rounded-lg group-hover:scale-105">
        {image ? (
          <Image fill className="rounded-lg" style={{ objectFit: "contain" }} alt={name} src={image}></Image>
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-lg bg-p4">?</div>
        )}
      </div>
      <span>{name}</span>
      <span>${price}</span>
      <div className="flex w-full justify-center">
        <button
          onClick={() => addToCart(name)}
          className="smooth-hover h-10 w-10 select-none rounded-lg bg-p5 text-white hover:scale-110"
        >
          +
        </button>
      </div>
    </div>
  )
}

const Shoppe: NextPage<{ products: Array<Product> }> = ({ products }) => {
  console.log("products", products)
  return (
    <main>
      <div className="flex h-full w-full flex-col items-center justify-center gap-5">
        <span className="text-xl">it's a carrot world</span>
        <div className="flex flex-wrap gap-5">
          {products.map((product: Product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              description={product.description}
              image={product.image}
              price={product.price}
              artist={product.artist}
            />
          ))}
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
