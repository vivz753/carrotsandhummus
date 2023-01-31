import { FC, Dispatch, SetStateAction } from "react"
import Link from "next/link"
import { CartIcon } from "@components/icons"

const navLabels = ["Home", "About", "Contact Us"]
const navLinks = ["/", "/about", "/contact"]

export const Navbar: FC<{ setSideCart: Dispatch<SetStateAction<boolean>> }> = ({ setSideCart }) => {
  return (
    <div className="absolute top-0 z-10 flex h-20 max-h-20 w-full flex-row items-center justify-start gap-5 bg-p5 px-20">
      {navLabels.map((label, i) => (
        <Link href={navLinks[i]} key={i} className="text-bold font-title text-lg capitalize text-white">
          {label}
        </Link>
      ))}
      <button className="ml-auto" onClick={() => setSideCart((view) => !view)}>
        <CartIcon className="h-8 w-8 stroke-white" />
      </button>
    </div>
  )
}
