import { InstagramIcon, MailIcon } from "@components/icons"
import Image from "next/image"
import Link from "next/link"
import { FC } from "react"

export const Footer: FC = () => (
  <div className="flex h-56 flex-col-reverse items-center justify-between bg-p5 p-8 text-white sm:flex-row sm:px-20 lg:h-36 lg:items-start lg:justify-start lg:gap-10">
    <Link href="/" className=" flex h-20 w-72 flex-row justify-center lg:h-full">
      <div className="relative h-20 w-32 lg:h-full lg:w-48">
        <Image
          fill
          style={{ objectFit: "cover" }}
          alt="carrots and hummus logo"
          src="/images/carrotsandhummustitlelogo.png"
        ></Image>
      </div>
      <div className="relative h-20 w-20 lg:h-full lg:w-20">
        <Image
          fill
          style={{ objectFit: "cover" }}
          alt="carrots and hummus logo"
          src="/images/carrotsandhummuslogo.png"
        ></Image>
      </div>
    </Link>
    <div className="flex w-full flex-col items-center justify-center lg:items-start">
      <Link href="/faq" className="underline">
        FAQ
      </Link>
      <Link href="https://instagram.com/carrotsandhummusart" className="flex flex-row gap-1">
        <InstagramIcon className="h-6 w-6 fill-white stroke-white" />
        @carrotsandhummusart
      </Link>
      <Link href="mailto:carrotsandhummusart@gmail.com" className="flex flex-row gap-1">
        <MailIcon className="h-6 w-6 stroke-white" />
        carrotsandhummusart@gmail.com
      </Link>
    </div>
  </div>
)
