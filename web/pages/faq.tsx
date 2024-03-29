import { NextPage } from "next"

const FAQ: NextPage = () => {
  return (
    <div className="flex h-full w-screen flex-col items-center justify-center pt-20">
      <div className="my-20 flex w-11/12 flex-col gap-10 rounded-xl border-4 border-p5 p-8 lg:w-1/2 lg:p-20">
        <span className="text-3xl">{`FAQ (Frequently Asked Questions)`}</span>
        <div className="flex flex-col gap-5">
          <span className="text-xl">What is the difference between a Card and a Print?</span>
          <span>
            Cards are foldable so that you can write a message inside, plus they can stand up on their own! Prints use
            half the amount of paper material and are truer to a single sheet.
          </span>
        </div>
        <div className="flex flex-col gap-5">
          <span className="text-xl">When will my item(s) arrive?</span>
          <span>Delivery is estimated to take about 5-7 business days.</span>
        </div>
        <div className="flex flex-col gap-5">
          <span className="text-xl">{`Why can't I ship outside of America?`}</span>
          <span>Shipping is only supported in the US for now.</span>
        </div>
        <div className="flex flex-col gap-5">
          <span className="text-xl">{`I never got my items / My items came damaged!`}</span>
          <span>
            We are so sorry! For any issues regarding refunds or replacements, please email
            carrotsandhummusart@gmail.com
          </span>
        </div>
        <div className="flex flex-col gap-5">
          <span className="text-xl">
            I love this website so much!! It reminds me of Neopets!! How can I express my gratitude?
          </span>
          <span>
            We appreciate your acquired taste in design! Please support us by following, liking, and sharing our posts
            on our Instagram @carrotsandhummusart. You can also send fan mail at carrotsandhummusart@gmail.com
          </span>
        </div>
      </div>
    </div>
  )
}

export default FAQ
