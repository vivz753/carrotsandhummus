import { FC, Dispatch, SetStateAction } from "react"
import clsx from "clsx"
import { SideCartItem } from "./SideCartItem"
import Link from "next/link"
import { useShoppingCart } from "use-shopping-cart"

export const SideCart: FC<{ view: boolean; setView: Dispatch<SetStateAction<boolean>> }> = ({ view, setView }) => {
  const { cartDetails, clearCart } = useShoppingCart()

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
            <button
              onClick={() => setView(false)}
              className="m-2 mr-auto rounded-md bg-white p-2 px-5"
            >{`close >`}</button>
          )}
        </div>
        <div className="flex h-full w-full grow-0 flex-col justify-between rounded-bl-xl border-2 border-p5 bg-blue-200">
          {/* Items container */}
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
          {/* Clear Cart Button */}
          {cartItems.length > 0 && <button onClick={clearCart}>Clear Cart</button>}
          {/* Checkout Button */}
          {cartItems.length > 0 ? (
            <Link
              href="/shoppe/preview"
              className="flex h-16 w-full shrink-0 items-center justify-center rounded-b-xl bg-p2 text-xl"
            >
              Checkout
            </Link>
          ) : (
            <div className="flex h-full flex-col justify-center">
              <span className="flex  justify-center p-5 text-center">hey,</span>
              <span className="flex justify-center p-5 text-center">{`>:( --insert grumpy looking shopkeeper--`}</span>
              <span className="flex  justify-center p-5 text-center">go buy something, or... or... get out here!!</span>
            </div>
          )}
        </div>
      </div>
      <button
        onClick={() => setView(true)}
        className={clsx(
          "smooth-transition fixed top-0 right-0 m-2 mt-24 w-24 rounded-md bg-p5 p-2 px-5",
          !view ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        )}
      >{`open <`}</button>
    </>
  )
}
