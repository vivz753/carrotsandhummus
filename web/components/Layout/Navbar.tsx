// import { Searchbar } from "@components/core"
import { CartIcon } from "@components/icons"
import Link from "next/link"
import { FC } from "react"

const navLabels = ["Home", "About", "Shoppe"]
const navLinks = ["/", "/about", "/shoppe"]

export const Navbar: FC = () => {
  return (
    <div className="absolute top-0 z-20 flex h-20 max-h-20 w-full flex-row items-center justify-start gap-5 bg-p5 px-5 sm:px-20">
      {navLabels.map((label, i) => (
        <Link href={navLinks[i]} key={i} className="text-bold font-title text-lg capitalize text-white">
          {label}
        </Link>
      ))}
      {/* <Searchbar value={value} /> */}
      <button className="ml-auto">
        <Link href="/shoppe/preview">
          <CartIcon className="h-8 w-8 stroke-white" />
        </Link>
      </button>
    </div>
  )
}
