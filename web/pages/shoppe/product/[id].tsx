import { Button, LoadingOverlay, MissingImage } from "@components/core"
import { client } from "@lib/sanity/client"
import { merchQuery } from "@lib/sanity/merchQuery"
import { Product } from "@types"
import { currencyToString } from "lib/utils"
import { GetStaticProps, NextPage } from "next"
import Image from "next/image"
import { useRouter } from "next/router"
import { useState } from "react"
import { useShoppingCart } from "use-shopping-cart"

const ProductPage: NextPage<{ products: Array<Product> }> = ({ products }) => {
  const router = useRouter()
  const { id } = router.query

  const product = products?.find((product) => id === product.id) ?? ({} as Product)
  const { name, price, image, artist, description, category } = product

  const userFriendlyPrice = currencyToString(price, product.currency)

  const [productQuantity, setProductQuantity] = useState("1")
  const { addItem } = useShoppingCart()

  return (
    <main>
      {!products ? (
        <LoadingOverlay />
      ) : (
        <div className="flex h-full w-screen flex-col items-center justify-center pt-20">
          {/* <span>{id}</span> */}
          <div className="my-20 flex flex-col gap-10 rounded-xl border border-p5 p-20 lg:w-1/2">
            <div className="flex w-full flex-col items-start gap-2">
              <span className="text-3xl">{name}</span>
              {/* TODO make link for artist shop/filter w/ artist name */}
              <span className="">by {artist}</span>
            </div>
            <div className="flex flex-col items-center lg:flex-row lg:gap-20">
              {/* COL 1 */}
              <div className="flex flex-col">
                <div className="smooth-transition relative h-96 w-96 transform rounded-lg group-hover:scale-105">
                  {image ? (
                    <Image
                      fill
                      className="rounded-lg"
                      style={{ objectFit: "contain" }}
                      alt={name ?? "image_not_found"}
                      src={image}
                    ></Image>
                  ) : (
                    <MissingImage />
                  )}
                </div>
              </div>
              {/* COL 2 */}
              <div className="flex flex-col items-center gap-10 ">
                <span className="uppercase">{category}</span>
                <span className="text-3xl">{userFriendlyPrice}</span>
                <div className="flex flex-col gap-2">
                  <span className="text-xl">Quantity</span>
                  <input
                    className="w-20 rounded-md border py-1 text-center"
                    value={productQuantity}
                    pattern="^-?[1-9]\d*$"
                    onChange={(e) => {
                      e.preventDefault()
                      if (e.target.validity.valid) {
                        setProductQuantity(e.target.value)
                      }
                    }}
                    type="tel"
                  ></input>
                </div>
                <Button variant="solid1" onClick={() => addItem(product, { count: Number(productQuantity) })}>
                  Add To Cart
                </Button>
              </div>
            </div>
            {description && (
              <div className="flex flex-col gap-2">
                <span className="text-xl">Description</span>
                <span>{description}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  )
}

export default ProductPage

// ? Does this cache?
export const getStaticProps: GetStaticProps<{ products: Array<Product> }> = async () => {
  const products = await client.fetch(merchQuery)

  return {
    props: {
      products,
    },
  }
}

// TODO: can add static paths for faster loading
export async function getStaticPaths() {
  return {
    paths: [
      // String variant:
      // '/shoppe/product/1f7212e2-a59d-4cdd-830e-9dfdd008c357',
      // Object variant:
      // { params: { id: '1f7212e2-a59d-4cdd-830e-9dfdd008c357' } },
    ],
    fallback: true,
  }
}
