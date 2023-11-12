import { Dropdown, ProductCard, Searchbar } from "@components/core"
import { client } from "@lib/sanity/client"
import { merchQuery } from "@lib/sanity/merchQuery"
import { Product } from "@types"
import clsx from "clsx"
import { GetStaticProps, NextPage } from "next"
import Image from "next/image"
import { useState } from "react"

const filterByName = (products: Product[], input: string) => {
  if (!input) return products

  return products.filter((product) => {
    return (
      (product.name
        .toLowerCase()
        .split(" ")
        .findIndex((token) => token.startsWith(input.toLowerCase()) || input.toLowerCase().includes(token)) !== -1 || // second condition for inputs w 1 token + a space
        product.name.toLowerCase().includes(input.toLowerCase()) || // for inputs w/ multiple tokens + spaces
        (product.tags &&
          product.tags?.findIndex(
            (tag) => tag.toLowerCase().startsWith(input.toLowerCase()) || input.toLowerCase().includes(tag)
          ) !== -1) ||
        input.toLowerCase().includes(product.artist.toLowerCase()) ||
        product.artist.toLowerCase().startsWith(input.toLowerCase()) ||
        input.toLowerCase().includes(product.category?.toLowerCase() || "") ||
        product.category?.toLowerCase().startsWith(input.toLowerCase())) &&
      !product.hidden // don't show hidden items
    )
  })
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
  const categories = ["sticker", "print", "card", "bracelet", "all"]
  const [category, setCategory] = useState("all")
  const artists = ["Ray", "@carrotjuicelol", "@natd0ge", "@vivs_petals", "all"]
  const [artist, setArtist] = useState("all")
  const [searchValue, setSearchValue] = useState("")

  const filteredProducts = filterByCategory(filterByArtist(filterByName(products, searchValue), artist), category)

  return (
    <main>
      <div className="flex h-full w-screen flex-col pt-20">
        <div className="flex flex-col items-center justify-center gap-5 px-4 text-center">
          <span className="mt-20 mb-12 text-3xl">Ye Olde Shoppe</span>
          <span>{`The storekeeper doesn't look too happy, but at least they're not hostile.`}</span>
          <span>{`"I GUESS you can look around.."`}</span>
          <div className="relative h-48 w-48">
            <Image src="/images/angry/doomsdaycat.JPG" alt="doomsdaycat" fill style={{ objectFit: "contain" }} />
          </div>
          <span>{`"HMPH...."`}</span>
          {/* Search/Filter tools */}
          <div className="group relative flex w-full justify-center lg:w-3/4">
            {/* Pop-up GIF */}
            <div
              className={clsx(
                "absolute left-20 top-0 z-0 h-20 w-20 translate-y-0 transform opacity-0 transition-all group-focus-within:z-[2] group-focus-within:-translate-y-[70%] group-focus-within:opacity-100 group-hover:z-[2] group-hover:-translate-y-[70%] group-hover:opacity-100"
              )}
            >
              <Image
                alt="typing cat"
                src="https://media4.giphy.com/media/UQ1EI1ML2ABQdbebup/200w.webp?cid=ecf05e474pw209zhbrob0zej2huygxqrkatwltps7d75n1bu&rid=200w.webp&ct=s"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className="z-[1] flex w-full flex-col items-center justify-center gap-2 rounded-md bg-p2 p-4 py-5 text-white lg:flex-row lg:gap-10 lg:px-14">
              <div className="flex w-full flex-col items-start gap-1">
                <span>Item Name</span>
                <Searchbar
                  className="flex w-full"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
              <div className="flex w-full flex-row justify-between lg:w-auto lg:gap-5">
                <div className="flex flex-col items-start gap-1">
                  <span>Artist</span>
                  <Dropdown
                    className="h-10 w-36"
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
              </div>
              {/* TODO: price ascending/descending */}
            </div>
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
