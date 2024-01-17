import { LoadingOverlay } from "@components/core"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { FC } from "react"
import useSWR from "swr"

export const ConfirmationSummary: FC = () => {
  const router = useRouter()
  const { session_id } = router.query

  // Fetch CheckoutSession from static page via
  // https://nextjs.org/docs/basic-features/data-fetching#static-generation
  const { data, isLoading, error } = useSWR(session_id ? `/api/stripe/checkout/${session_id}` : null, async (url) => {
    try {
      const data = await fetch(url).then((res) => res.json())
      console.log("session", data)
      return data
    } catch (err) {
      throw new Error(
        err instanceof Error
          ? err.message
          : "Internal server error: Unable to fetch checkout session data for Confirmation Summary"
      )
    }
  })

  // const formattedContent = JSON.stringify(data, null, 2)

  return isLoading ? (
    <LoadingOverlay />
  ) : (
    <div className="my-20 flex flex-col gap-10 rounded-xl p-10 outline outline-2 outline-p5 sm:p-20">
      <div className="flex w-full flex-col items-center justify-center gap-5 text-center">
        <span className="flex justify-center text-3xl">Thank you for shopping with us!</span>
        <Link href="/" className="flex h-20 w-72 flex-row justify-center lg:h-24">
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
        <span className="flex justify-center text-xl">Please check your email for a confirmation invoice.</span>
        {/* <span className="flex justify-center">A confirmation email has been sent to:</span>
        <div className="flex w-full flex-col justify-center gap-1 rounded-md text-center">
          <span className="flex justify-center text-xl">{data?.customer_details?.email}</span>
        </div> */}
      </div>
      <div className="flex w-full flex-col items-start justify-center gap-1 text-center ">
        <span className="">Order number:</span>
        <input disabled value={data?.payment_intent?.id} className="rounded-md" />
      </div>
      {/* <h2>Status: {data?.payment_intent?.status}</h2> */}
      {/* <h3>CheckoutSession response:</h3> */}
      {/* <pre>{formattedContent}</pre> */}
    </div>
  )
}
