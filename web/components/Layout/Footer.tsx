import { FC } from "react"
import Link from "next/link"

export const Footer: FC = () => (
  <div className="flex h-36 w-full items-center justify-center bg-p5 text-white">
    <div className="flex flex-col items-center gap-5">
      <Link href="https://instagram.com/carrotsandhummusart">Instagram: @carrotsandhummusart</Link>
      <Link href="https://instagram.com/carrotsandhummusart">Founded in 2022</Link>
    </div>
  </div>
)
