import { NextPage } from "next"

const About: NextPage = () => {
  return (
    <div className="flex h-full w-screen flex-col items-center justify-center pt-20">
      <div className="my-20 flex flex-col gap-5 items-center">
        <span className="text-2xl">Meet the Artists</span>
        <span>natalie</span>
        <span>vivian</span>
        <span>ray</span>
      </div>
    </div>
  )
}

export default About
