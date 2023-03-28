import { Dropdown, ProductCard, Searchbar } from "@components/core"
import { client } from "@lib/sanity/client"
import { merchQuery } from "@lib/sanity/merchQuery"
import { Product } from "@types"
import { GetStaticProps, NextPage } from "next"
import Image from "next/image"
import { useState } from "react"

const filterByName = (products: Product[], input: string) => {
  if (!input) return products

  return products.filter(
    (product) =>
      product.name
        .toLowerCase()
        .split(" ")
        .findIndex((token) => token.startsWith(input.toLowerCase())) !== -1
  )
}

const filterByArtist = (products: Product[], input: string) => {
  if (input === "all") return products

  return products.filter((product) => product.artist.toLowerCase() === input.toLowerCase())
}

const filterByCategory = (products: Product[], input: string) => {
  if (input === "all") return products
  return products.filter((product) => product.category?.toLowerCase() === input.toLowerCase())
}

const Shoppe: NextPage<{ products: Array<Product> }> = ({ products }) => {
  const categories = ["sticker", "print", "card", "all"]
  const [category, setCategory] = useState("all")
  const artists = ["Ray", "@carrotjuicelol", "@natd0ge", "all"]
  const [artist, setArtist] = useState("all")
  const [searchValue, setSearchValue] = useState("")

  const filteredProducts = filterByCategory(filterByArtist(filterByName(products, searchValue), artist), category)

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
          {/* Search/Filter tools */}
          <div className="flex w-[80%] flex-row justify-center gap-10 rounded-full bg-p5 py-3 px-14 text-white">
            <div className="flex w-full flex-col items-start gap-1">
              <span>Item Name</span>
              <Searchbar className="flex w-full" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
            </div>
            <div className="flex flex-col items-start gap-1">
              <span>Artist</span>
              <Dropdown
                className="w-28"
                setOption={(artist) => setArtist(artist)}
                options={artists}
                currentOption={artist}
              />
            </div>
            <div className="flex flex-col items-start gap-1">
              <span>Category</span>
              <Dropdown
                className="w-28"
                setOption={(category) => setCategory(category)}
                options={categories}
                currentOption={category}
              />
            </div>
            {/* TODO: price ascending/descending */}
          </div>
          <div className="flex w-full flex-wrap justify-center gap-10 p-20">
            {filteredProducts.map((product: Product) => (
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
