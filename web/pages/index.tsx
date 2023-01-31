import { NextPage } from "next"
import { FC } from "react"
import Link from "next/link"

const Home: NextPage = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5">
      <span className="text-xl">it's a carrot world</span>
      <Map />
    </div>
  )
}

export default Home

const Map: FC = () => {
  return (
    <div className="relative flex h-[500px] w-[850px] bg-p2">
      <Link href="/shoppe">
        <button className="absolute left-[200px] top-[100px] h-20 w-20 border border-red-500 ">viv's shoppe</button>
      </Link>
      <button className="absolute left-[300px] top-[50px] h-20 w-20 border border-red-500">nat's shoppe</button>
      <button className="absolute top-[200px] left-[500px] h-20 w-20 border border-red-500">ray's basement</button>
    </div>
  )
}
