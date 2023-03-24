import { CartIcon } from "@components/icons"
import Link from "next/link"
import { Dispatch, FC, SetStateAction } from "react"

const navLabels = ["Home", "About"]
const navLinks = ["/", "/about"]

export const Navbar: FC<{ setSideCart: Dispatch<SetStateAction<boolean>> }> = ({ setSideCart }) => {
  return (
    <div className="absolute top-0 z-10 flex h-20 max-h-20 w-full flex-row items-center justify-start gap-5 bg-p5 px-20">
      {navLabels.map((label, i) => (
        <Link href={navLinks[i]} key={i} className="text-bold font-title text-lg capitalize text-white">
          {label}
        </Link>
      ))}
      <input
        className="h-10 rounded-full border text-white focus:outline-none focus:border-2 border-white bg-transparent p-3 placeholder:text-white"
        placeholder="Search for an Item..."
      />
      <button className="ml-auto">
        <Link href="/shoppe/preview">
          <CartIcon className="h-8 w-8 stroke-white" />
        </Link>
      </button>
    </div>
  )
}
