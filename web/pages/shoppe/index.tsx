import { ProductCard } from "@components/core"
import { client } from "@lib/sanity/client"
import { merchQuery } from "@lib/sanity/merchQuery"
import { Product } from "@types"
import { GetStaticProps, NextPage } from "next"
import Image from "next/image"

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
