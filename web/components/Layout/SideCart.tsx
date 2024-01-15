import { Button } from "@components/core"
import { CartIcon, LeftCaretIcon, RightCaretIcon } from "@components/icons"
import clsx from "clsx"
import Image from "next/image"
import { useRouter } from "next/router"
import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from "react"
import { useShoppingCart } from "use-shopping-cart"
import { SideCartItem } from "./SideCartItem"

export const SideCart: FC<{ view: boolean; setView: Dispatch<SetStateAction<boolean>> }> = ({ view, setView }) => {
  const { cartDetails, clearCart, cartCount } = useShoppingCart()
  const [animation, setAnimation] = useState(false)
  const cartCounter = useRef(cartCount)
  const cartCountChanged = cartCount !== cartCounter.current

  useEffect(() => {
    console.log("animation", animation)
    if (!animation && cartCountChanged) {
      cartCounter.current = cartCount
      setTimeout(() => {
        setAnimation(false)
      }, 8000)
      setAnimation(true)
    }
  }, [cartCount, cartCountChanged, animation])

  const cartItems = Object.entries(cartDetails ?? {})
  return (
    <>
      <div
        className={clsx(
          "smooth-transition fixed top-0 right-0 z-10 flex h-full max-h-screen w-full flex-col pt-24 pb-14 sm:w-96",
          view ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="top-0 flex w-full shrink-0 items-center justify-center rounded-tl-xl bg-p5">
          <span className="absolute text-center text-white">Ye Olde Cart</span>
          {view && (
            <>
              <Button onClick={() => setView(false)} variant="solid2" className="m-2 mr-auto">
                close
                <RightCaretIcon className="h-6 w-6 fill-black" />
              </Button>
            </>
          )}
        </div>
        <div className="flex h-full w-full grow-0 flex-col justify-between rounded-bl-xl border-2 border-p5 bg-p1 px-5 py-5">
          {/* Items container */}
          {cartItems.length > 0 ? (
            <>
              <div className=" w-full overflow-auto">
                {cartItems.map(([id, data]) => (
                  <SideCartItem
                    key={id}
                    productId={id}
                    name={data.name}
                    category={data.category}
                    quantity={data.quantity}
                    image={data.images[0] ?? ""}
                    price={data.price}
                  />
                ))}
              </div>
              <div className="flex flex-col">
                {/* TODO: add a confirmation modal */}
                <button className="my-1 ml-auto max-w-max rounded-md bg-red-500 px-1 text-white" onClick={clearCart}>
                  Clear Cart
                </button>

                <Button wide size="sm" variant="solid3" href="/shoppe/preview" onClick={() => setView(false)}>
                  Checkout
                </Button>
              </div>
            </>
          ) : (
            <EmptyCartContents setView={setView} />
          )}
        </div>
      </div>
      <Button
        variant="solid1"
        onClick={() => setView(true)}
        className={clsx(
          "smooth-transition fixed top-0 right-0 z-10 m-2 mt-24",
          !view ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        )}
      >
        <div className="flex flex-row items-center lg:gap-2">
          <LeftCaretIcon className="h-6 w-6 fill-white" />
          <span className="hidden lg:flex">open</span>
          <CartIcon className="h-6 w-6 stroke-white" />
        </div>
        <div
          className={clsx(
            "smooth-transition absolute left-0 -translate-x-full pr-3",
            animation ? "opacity-100" : "opacity-0"
          )}
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500 p-1">
            {cartCount}
          </span>
        </div>
      </Button>
    </>
  )
}

const EmptyCartContents: FC<{ setView: Dispatch<SetStateAction<boolean>> }> = ({ setView }) => {
  const router = useRouter()

  return (
    <div className="flex h-full flex-col items-center justify-center gap-5">
      <span>{`"hey,"`}</span>
      <div className="relative h-48 w-48">
        <Image src="/images/angry/magnifiedcat.JPG" fill style={{ objectFit: "contain" }} alt="angry-shopkeeper" />
      </div>
      <span>Uh oh, the shopkeeper looks angry... </span>
      <span>{`"go buy something, or... or... get out here!!"`}</span>
      <Button
        onClick={() => setView(false)}
        href={router.pathname.endsWith("shoppe") ? "" : "/shoppe"}
        className="mt-24"
      >
        {`Fine, I'll go browse the items...`}
      </Button>
    </div>
  )
}
