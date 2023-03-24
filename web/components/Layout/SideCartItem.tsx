import { DeleteProductButton, EditProductQuantityButtons, MissingImage } from "@components/core"
import Image from "next/image"
import Link from "next/link"
import { FC } from "react"

export const SideCartItem: FC<{
  name: string
  category: string
  quantity: number
  image: string
  price: number
  productId: string
}> = ({ name, quantity, image, productId }) => {
  return (
    <div className="h-32 w-full shrink-0 p-2">
      <div className="flex h-full w-full flex-row items-center gap-5 rounded-2xl bg-white px-4 shadow-md">
        <Link className="flex flex-row items-center gap-5" href={`/shoppe/product/${productId}`}>
          <div className="relative flex h-16 w-16 shrink-0 grow-0 rounded-xl border-2">
            {image ? (
              <Image style={{ objectFit: "contain" }} src={image} fill className="rounded-xl" alt={name}></Image>
            ) : (
              <span className="h-full w-full rounded-xl bg-red-200">
                <MissingImage />
              </span>
            )}
          </div>
          <div className="flex w-full flex-col">
            <span>{name}</span>
          </div>
        </Link>
        <EditProductQuantityButtons quantity={quantity} productId={productId} />
        <DeleteProductButton productId={productId} />
      </div>
    </div>
  )
}
