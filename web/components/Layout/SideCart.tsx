import { FC } from "react"
import clsx from "clsx"
import { SideCartItem } from "./SideCartItem"
import Link from "next/link"

export const SideCart: FC<{ view: boolean }> = ({ view }) => {
  return (
    <div
      className={clsx(
        "smooth-hover absolute top-0 right-0 flex h-full w-96 flex-col pt-24 pb-14",
        view ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div className="top-0 flex h-10 w-full shrink-0 items-center justify-center rounded-tl-xl bg-p5 text-white">
        Ye Olde Cart
      </div>
      <div className="flex h-full w-full grow-0 flex-col justify-between rounded-bl-xl border-2 border-p5 bg-blue-200">
        {/* Items container */}
        <div className=" w-full overflow-auto">
          <SideCartItem
            name="3d jiggly"
            category="sticker"
            quantity={1}
            image="http://localhost:3000/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F9c0nmf4k%2Fproduction%2F41fc9ea8194a997899100fc5984f2ac1232e4e27-300x300.png&w=3840&q=75"
            price={3}
          />
          <SideCartItem
            name="3d jiggly"
            category="sticker"
            quantity={1}
            image="http://localhost:3000/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F9c0nmf4k%2Fproduction%2F41fc9ea8194a997899100fc5984f2ac1232e4e27-300x300.png&w=3840&q=75"
            price={3}
          />
          <SideCartItem
            name="3d jiggly"
            category="sticker"
            quantity={1}
            image="http://localhost:3000/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F9c0nmf4k%2Fproduction%2F41fc9ea8194a997899100fc5984f2ac1232e4e27-300x300.png&w=3840&q=75"
            price={3}
          />
          <SideCartItem
            name="3d jiggly"
            category="sticker"
            quantity={1}
            image="http://localhost:3000/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F9c0nmf4k%2Fproduction%2F41fc9ea8194a997899100fc5984f2ac1232e4e27-300x300.png&w=3840&q=75"
            price={3}
          />
          <SideCartItem
            name="3d jiggly"
            category="sticker"
            quantity={1}
            image="http://localhost:3000/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F9c0nmf4k%2Fproduction%2F41fc9ea8194a997899100fc5984f2ac1232e4e27-300x300.png&w=3840&q=75"
            price={3}
          />
          <SideCartItem
            name="3d jiggly"
            category="sticker"
            quantity={1}
            image="http://localhost:3000/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F9c0nmf4k%2Fproduction%2F41fc9ea8194a997899100fc5984f2ac1232e4e27-300x300.png&w=3840&q=75"
            price={3}
          />
          <SideCartItem
            name="3d jiggly"
            category="sticker"
            quantity={1}
            image="http://localhost:3000/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F9c0nmf4k%2Fproduction%2F41fc9ea8194a997899100fc5984f2ac1232e4e27-300x300.png&w=3840&q=75"
            price={3}
          />
          <SideCartItem
            name="3d jiggly"
            category="sticker"
            quantity={1}
            image="http://localhost:3000/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F9c0nmf4k%2Fproduction%2F41fc9ea8194a997899100fc5984f2ac1232e4e27-300x300.png&w=3840&q=75"
            price={3}
          />
          <SideCartItem
            name="3d jiggly"
            category="sticker"
            quantity={1}
            image="http://localhost:3000/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F9c0nmf4k%2Fproduction%2F41fc9ea8194a997899100fc5984f2ac1232e4e27-300x300.png&w=3840&q=75"
            price={3}
          />
          <SideCartItem
            name="3d jiggly"
            category="sticker"
            quantity={1}
            image="http://localhost:3000/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F9c0nmf4k%2Fproduction%2F41fc9ea8194a997899100fc5984f2ac1232e4e27-300x300.png&w=3840&q=75"
            price={3}
          />
          <SideCartItem
            name="3d jiggly"
            category="sticker"
            quantity={1}
            image="http://localhost:3000/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F9c0nmf4k%2Fproduction%2F41fc9ea8194a997899100fc5984f2ac1232e4e27-300x300.png&w=3840&q=75"
            price={3}
          />
        </div>
        {/* Checkout Button */}
        <Link
          href="/checkout"
          className="flex h-16 w-full shrink-0 items-center justify-center rounded-b-xl bg-p2 text-xl"
        >
          Checkout
        </Link>
      </div>
    </div>
  )
}
