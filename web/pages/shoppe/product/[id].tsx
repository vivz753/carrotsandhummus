import { Button, Carousel, Error404, LoadingOverlay, MissingImage, Modal, SparkleAnim, Tag } from "@components/core"
import { LeftCaretIcon } from "@components/icons"
import useComponentVisible from "@hooks/useComponentVisible"
import { client } from "@lib/sanity/client"
import { merchQuery } from "@lib/sanity/merchQuery"
import { Product } from "@types"
import { currencyToString } from "lib/utils"
import { GetStaticProps, NextPage } from "next"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useShoppingCart } from "use-shopping-cart"

const ProductPage: NextPage<{ products: Array<Product> }> = ({ products }) => {
  const [addToCartClicked, setAddToCartClicked] = useState<boolean>(false)
  const router = useRouter()
  const { id } = router.query

  const product = products?.find((product) => id === product.id) ?? ({} as Product)
  const { name, price, artist, description, category, size, images, tags, hidden, soldOut } = product

  const userFriendlyPrice = currencyToString(price, product.currency)

  const [productQuantity, setProductQuantity] = useState("1")
  const [modalImg, setModalImg] = useState("")
  const [modalRef, showModal, setShowModal] = useComponentVisible(false)

  const { addItem } = useShoppingCart()

  const addToCart = () => {
    addItem(product, { count: Number(productQuantity) })

    if (!addToCartClicked) {
      setAddToCartClicked(true)
      setTimeout(() => {
        setAddToCartClicked(false)
      }, 3000)
    }
  }

  useEffect(() => {
    console.log("modal", modalImg)
  }, [modalImg])

  return (
    <main>
      {!products ? (
        <LoadingOverlay />
      ) : hidden ? (
        <Error404 />
      ) : (
        <div className="flex h-full w-screen flex-col items-center justify-center px-2 pt-20">
          {showModal && (
            <Modal setShowModal={setShowModal}>
              <div onClick={(e) => console.log(e)} className="border-3 relative h-[90%] w-[75%] bg-white p-5">
                <Image fill style={{ objectFit: "contain" }} src={modalImg} alt={modalImg} />
                {/* Prevents Right-clicking */}
                <div ref={modalRef} className="absolute inset-0 h-full w-full" />
                {/* TODO: implement working magnifier */}
                {/* <ImageMagnifier src={modalImg} /> */}
              </div>
            </Modal>
          )}
          <div className="mt-4 w-full">
            <Button href="/shoppe" variant="solid1">
              <LeftCaretIcon className="h-4 w-4 fill-white" />
              {` BACK`}
            </Button>
          </div>
          <div className="my-8 flex w-fit max-w-[1000px] flex-col items-center gap-10 rounded-xl border-4 border-p5 p-8 sm:my-20 lg:w-3/4 lg:max-w-full lg:py-16 lg:px-32">
            <div className="flex w-full flex-col gap-5">
              <div className="flex flex-col items-start gap-2">
                <span className="text-3xl">{name}</span>
                {/* TODO make link for artist shop/filter w/ artist name */}
                <span className="">by {artist}</span>
              </div>
              <div className="flex w-max flex-col items-start gap-1 lg:flex-wrap">
                <div className="flex flex-row gap-1">
                  {size && <Tag className="bg-p4 text-white">{size}</Tag>}
                  {category && <Tag className="bg-p2 text-white">{category}</Tag>}
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
            </div>
            <div className="flex flex-col items-center lg:flex-row lg:gap-20">
              {/* COL 1 */}
              <div className="flex">
                {images && images.length > 0 ? (
                  <Carousel
                    onImageClick={(url) => {
                      setShowModal((show) => !show)
                      setModalImg(url)
                    }}
                    size="lg"
                    images={images ?? []}
                  />
                ) : (
                  <div className="relative h-96 w-96 transform rounded-lg lg:h-[550px] lg:w-[550px]">
                    <MissingImage />
                  </div>
                )}
              </div>
              {/* COL 2 */}
              <div className="my-10 flex w-full flex-col items-center justify-center gap-8 xl:gap-12">
                <span className="text-3xl">{userFriendlyPrice}</span>
                <div className="flex flex-row items-end gap-5 lg:flex-col lg:items-center">
                  <div className="flex flex-col gap-2">
                    <span className="lg:text-xl">Quantity</span>
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
                    />
                  </div>
                  {soldOut ? (
                    <Button variant="solid1" disabled>
                      SOLD OUT
                    </Button>
                  ) : (
                    <Button variant="solid1" onClick={addToCart}>
                      {addToCartClicked ? (
                        <SparkleAnim amount={10} duration={5000}>
                          <span className="px-5 py-2">Added!</span>
                        </SparkleAnim>
                      ) : (
                        <span className="px-5 py-2">Add To Cart</span>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </div>
            {description && (
              <div className="flex flex-col gap-2 lg:mr-auto">
                <span className="text-xl">Description</span>
                <span>{description}</span>
              </div>
            )}
            <div className="flex flex-col gap-2 lg:mr-auto">
              <span className="text-xl">Important Shipping Info</span>
              <span>Shipping is only available in the US. Delivery is estimated to take about 5-7 business days.</span>
              <span>
                For more info, see our{" "}
                <Link href="/faq" className="underline">
                  FAQ page
                </Link>
              </span>
            </div>
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
