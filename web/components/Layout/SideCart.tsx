import { FC } from "react"
import clsx from "clsx"
import { SideCartItem } from "./SideCartItem"
import Link from "next/link"
import { useShoppingCart } from "use-shopping-cart"

export const SideCart: FC<{ view: boolean }> = ({ view }) => {
  const { cartDetails, clearCart } = useShoppingCart()

  const cartItems = Object.entries(cartDetails ?? {})
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
        {cartItems.length > 0 && <button onClick={clearCart}>Clear Cart</button>}
        {/* Checkout Button */}
        <Link
          href="/shoppe/preview"
          className="flex h-16 w-full shrink-0 items-center justify-center rounded-b-xl bg-p2 text-xl"
        >
          Checkout
        </Link>
      </div>
    </div>
  )
}
