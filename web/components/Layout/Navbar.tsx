import { FC } from "react"
import Link from "next/link"

const navLabels = ["Home", "About", "Contact Us"]
const navLinks = ["/", "/about", "/contact"]

export const Navbar: FC = () => {
  return (
    <div className="absolute top-0 flex flex-row px-5 justify-start items-center gap-5 bg-blue-500 h-20 max-h-20 w-full">
      {navLabels.map((label, i) => (
        <Link href={navLinks[i]} key={i} className="text-lg capitalize text-white text-bold">
          {label}
        </Link>
      ))}
    </div>
  )
}
