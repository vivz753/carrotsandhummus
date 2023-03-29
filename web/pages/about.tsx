import { NextPage } from "next"
import Image from "next/image"
import { CSSProperties } from "react"

type Profile = {
  name: string
  bio: string
  quote?: string
  img: {
    src: string
    style: CSSProperties
  }
}

const profiles: Profile[] = [
  {
    name: "@natd0ge",
    bio: "@natd0ge has been vandalizing her homework with doodles and hand-drawing cards for her family and friends for as long as she can remember. This event represents the first time she is putting her work out for public perception. She hopes people cherish the little shitposts that are her prints and stickers.",
    img: {
      src: "/images/natalie.jpg",
      style: { objectFit: "cover" },
    },
  },
  {
    name: "@carrotjuicelol",
    quote: `"When I get old and shrimpy, imma regret not pursuing art!"`,
    bio: `Started as a weab who grew up with Disney Channel and Cartoon Network that lived off of Tumblr fan art, @carrotjuicelol is now the local art snob that attends museums and simps at the sight of Sergeant's work. Favorite artists include: Dana Terrace, marik_draw, Airi Pan.`,
    img: {
      src: "/images/vivian.jpg",
      style: { objectFit: "scale-down" },
    },
  },
  {
    name: "Ray",
    bio: "",
    quote: `"Ever since I moved to my own place, one of my favorite things has been receiving coupons and letters in the mail. I recommend sending my things in the mail to people you care about. Wish you have a nice day :)"`,
    img: {
      src: "/images/ray.jpg",
      style: { objectFit: "cover" },
    },
  },
]

const About: NextPage = () => {
  return (
    <div className="flex h-full w-screen flex-col items-center justify-center pt-20">
      <div className="my-20 flex flex-col items-center gap-20">
        <span className="text-2xl">Meet the Artists</span>
        <div className="flex w-full flex-col gap-24 px-[10%] lg:flex-row lg:justify-between">
          {profiles.map((profile) => (
            <div className="my-5 flex w-full flex-col items-center gap-10">
              <span>{profile.name}</span>
              <div className="relative h-64 w-64 rounded-full shadow-xl">
                <Image
                  fill
                  className="rounded-full"
                  style={profile.img.style}
                  alt={profile.name}
                  src={profile.img.src}
                ></Image>
              </div>
              {profile.quote && <p className="text-center">{profile.quote}</p>}
              <p className="w-full whitespace-normal">{profile.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default About
