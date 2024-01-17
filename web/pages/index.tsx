import { Button } from "@components/core"
import { NextPage } from "next"
import Image from "next/image"

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center border pt-20">
      <div className="my-auto flex flex-col items-center gap-5 py-16 sm:py-32">
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
        <span>{`* (中文): "誰敢進來我的店？！！！"`}</span>
      </div>
      {/* <Map /> */}
    </div>
  )
}

export default Home
