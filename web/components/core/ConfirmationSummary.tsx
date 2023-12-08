import { LoadingOverlay } from "@components/core"
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
      <div className="flex w-full flex-col justify-center gap-5 text-center ">
        <span className="flex justify-center">A confirmation email has been sent to:</span>
        <div className="flex w-full flex-col justify-center gap-1 rounded-md text-center">
          <span className="flex justify-center text-xl">{data?.customer_details?.email}</span>
        </div>
      </div>
      <div className="flex w-full flex-col justify-center gap-1 text-center ">
        <span className="">Order number (keep for your records):</span>
        <input disabled value={data?.payment_intent?.id} className="rounded-md" />
      </div>
      {/* <h2>Status: {data?.payment_intent?.status}</h2> */}
      {/* <h3>CheckoutSession response:</h3> */}
      {/* <pre>{formattedContent}</pre> */}
    </div>
  )
}
