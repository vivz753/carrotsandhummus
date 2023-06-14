import { Error404 } from "@components/core"
import { NextPage } from "next"

const Custom404: NextPage = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center border pt-20">
      <Error404 />
    </div>
  )
}

export default Custom404
