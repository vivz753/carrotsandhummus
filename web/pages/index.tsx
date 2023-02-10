import { NextPage } from "next"
import { FC } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@components/core"

const Home: NextPage = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center border pt-20">
      <div className="my-auto flex flex-col items-center gap-5 pt-20">
        <span>{`* "moew"`}</span>
        <div className="relative h-72 w-72">
          <Image
            className="rounded-xl"
            src="/images/angry/highnesscat.PNG"
            alt="highness-cat"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
        <Button href="/shoppe">ok 好</Button>
      </div>
      <div className="mt-auto flex w-full flex-col p-10">
        <span>{`* (English): "WHO DARE ENTERS MY SHOP???????"`}</span>
        <span>{`* (中文): "誰要進來我的店？！！！"`}</span>
      </div>
      {/* <Map /> */}
    </div>
  )
}

export default Home

const Map: FC = () => {
  return (
    <div className="relative flex h-[500px] w-[850px] bg-p2">
      <Link href="/shoppe">
        <button className="absolute left-[200px] top-[100px] h-20 w-20 border border-red-500 ">viv shoppe</button>
      </Link>
      <button className="absolute left-[300px] top-[50px] h-20 w-20 border border-red-500">nat shoppe</button>
      <button className="absolute top-[200px] left-[500px] h-20 w-20 border border-red-500">ray basement</button>
    </div>
  )
}
