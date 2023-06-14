import { InstagramIcon, MailIcon } from "@components/icons"
import Link from "next/link"
import { FC } from "react"

export const Footer: FC = () => (
  <div className="flex h-36 w-full flex-col items-center justify-between bg-p5 p-5 text-white">
    <Link href="/faq" className="underline">
      FAQ
    </Link>
    <div className="flex flex-col items-center lg:flex-row lg:gap-5">
      <Link href="https://instagram.com/carrotsandhummusart" className="flex flex-row gap-1">
        <InstagramIcon className="h-6 w-6 fill-white stroke-white" />
        @carrotsandhummusart
      </Link>
      <Link href="mailto:carrotsandhummusart@gmail.com" className="flex flex-row gap-1">
        <MailIcon className="h-6 w-6 stroke-white" />
        carrotsandhummusart@gmail.com
      </Link>
    </div>
    <span className="text-xs">Founded in 2022</span>
  </div>
)
