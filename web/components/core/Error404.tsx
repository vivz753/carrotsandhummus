import { Button } from "@components/core"
import Image from "next/image"
import { FC } from "react"

export const Error404: FC = () => {
  return (
    <div className="flex h-full w-screen flex-col items-center justify-center gap-10">
      <span className="text-3xl text-red-500">404 Error: Not Found</span>
      <div className="relative h-72 w-72">
        <Image
          className="rounded-xl"
          src="/images/angry/magnifiedcat.JPG"
          alt="highness-cat"
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
      <span>{`"You're not supposed to be here!!" *growls*`}</span>
      <span>You better get out of here...</span>
      <Button href="/">Back to the Home page</Button>
    </div>
  )
}
