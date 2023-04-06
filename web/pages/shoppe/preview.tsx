import { ConfirmationSummary, NpcDialogue, ShoppingCartSummary } from "@components/core"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useShoppingCart } from "use-shopping-cart"

export default function PreviewPage() {
  const router = useRouter()
  const { cartCount, clearCart } = useShoppingCart()
  const { transaction } = router.query
  const transactionSuccess = transaction === "success"
  const transactionFailed = transaction === "failed"

  useEffect(() => {
    if (transactionSuccess) {
      console.log("transaction successful")
      clearCart()
    }
  }, [router])

  return (
    <div className="flex h-full min-h-screen w-screen flex-col items-center justify-center pt-20">
      <div className="my-20 flex w-full flex-col items-center gap-5 px-5">
        {transactionSuccess ? (
          <NpcDialogue
            title={`The cashier gives you an awkward, but polite smile.`}
            subtitle={`"hehe.. thanks!"`}
            suggestion={`You take your bag of goodies from the counter.`}
            ctaHref="/shoppe"
            ctaText="Go back to the items"
          />
        ) : transactionFailed ? (
          <NpcDialogue
            subtitle={`"you're lucky I don't have a 'YOU LOOK YOU BUY' sign, or else you'd pay for everything here!"`}
            suggestion={`Oops... that transaction didn't work ):`}
            ctaHref="/shoppe"
            ctaText="Go back to the items"
          />
        ) : cartCount === 0 ? (
          <NpcDialogue
            title={`The cashier gives you an awkward, but polite smile.`}
            subtitle={`"ummm.... your cart is empty"`}
            suggestion={`Maybe you should go buy something...`}
            ctaHref="/shoppe"
            ctaText="Go back to the items"
          />
        ) : (
          <NpcDialogue
            title={`The cashier gives you an awkward, but polite smile.`}
            subtitle={`"yeah, checkout's here"`}
            ctaHref="/shoppe"
            ctaText="Go back to the items"
          />
        )}
        {transactionSuccess && <ConfirmationSummary />}
        {(cartCount || 0) > 0 && <ShoppingCartSummary />}
      </div>
    </div>
  )
}
