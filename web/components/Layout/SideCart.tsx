import { FC, Dispatch, SetStateAction, useEffect } from "react"
import clsx from "clsx"
import { SideCartItem } from "./SideCartItem"
import { useShoppingCart } from "use-shopping-cart"
import Image from "next/image"
import { Button } from "@components/core"

export const SideCart: FC<{ view: boolean; setView: Dispatch<SetStateAction<boolean>> }> = ({ view, setView }) => {
  const { cartDetails, clearCart, cartCount } = useShoppingCart()

  useEffect(() => {
    if (cartCount) console.log("cart updated")
  }, [cartCount])

  const cartItems = Object.entries(cartDetails ?? {})
  return (
    <>
      <div
        className={clsx(
          "smooth-transition fixed top-0 right-0 flex h-full max-h-screen w-96 flex-col pt-24 pb-14",
          view ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="top-0 flex w-full shrink-0 items-center justify-center rounded-tl-xl bg-p5">
          <span className="absolute text-center text-white">Ye Olde Cart</span>
          {view && (
            <>
              <Button onClick={() => setView(false)} variant="solid2" className="m-2 mr-auto">{`close >`}</Button>
            </>
          )}
        </div>
        <div className="flex h-full w-full grow-0 flex-col justify-between rounded-bl-xl border-2 border-p5 bg-blue-200">
          {/* Items container */}
          {cartItems.length > 0 ? (
            <>
              <div className=" w-full overflow-auto">
                {cartItems.map(([id, data]) => (
                  <SideCartItem
                    key={id}
                    cartItemId={id}
                    name={data.name}
                    category={data.category}
                    quantity={data.quantity}
                    image={data.image ?? ""}
                    price={data.price}
                  />
                ))}
              </div>
              <div className="flex flex-col">
                {/* TODO: add a confirmation modal */}
                <button className="ml-auto max-w-max rounded-md bg-red-500 p-1" onClick={clearCart}>
                  Clear Cart
                </button>

                <Button wide size="sm" variant="solid3" href="/shoppe/preview" onClick={() => setView(false)}>
                  Checkout
                </Button>
              </div>
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-5">
              <span>{`"hey,"`}</span>
              <div className="relative h-48 w-48">
                <Image
                  src="/images/angry/magnifiedcat.JPG"
                  fill
                  style={{ objectFit: "contain" }}
                  alt="angry-shopkeeper"
                />
              </div>
              <span>Uh oh, the shopkeeper looks angry... </span>
              <span>{`"go buy something, or... or... get out here!!"`}</span>
              <Button href="/shoppe" className="mt-24">
                Okay...
              </Button>
            </div>
          )}
        </div>
      </div>
      <Button
        variant="solid1"
        onClick={() => setView(true)}
        className={clsx(
          "smooth-transition fixed top-0 right-0 m-2 mt-24 w-24 rounded-md bg-p5 p-2 px-5",
          !view ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        )}
      >{`open <`}</Button>
    </>
  )
}
