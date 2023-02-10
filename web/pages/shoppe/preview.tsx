import { useEffect } from "react"
import { useShoppingCart } from "use-shopping-cart"
import { NpcDialogue, ShoppingCartSummary } from "@components/core"
import { useRouter } from "next/router"

export default function PreviewPage() {
  const { clearCart, cartCount } = useShoppingCart()
  const router = useRouter()
  const { transaction } = router.query
  const transactionSuccess = transaction === "success"
  const transactionFailed = transaction === "failed"

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    if (transactionSuccess) {
      console.log("Order placed! You will receive an email confirmation.")
      clearCart()
    }

    // if (transactionFailed) {
    //   console.log("Order canceled -- continue to shop around and checkout when you’re ready.")
    //   // display some annoyed cashier face
    // }
  }, [transactionSuccess])

  return (
    <div className="flex h-full min-h-screen w-screen flex-col items-center justify-center pt-20">
      <div className="my-20 flex flex-col gap-5">
        {transactionSuccess ? (
          <NpcDialogue
            title={`The cashier gives you an awkward, but polite smile.`}
            subtitle={`"hehe.. thanks!"`}
            suggestion={`You take your bag of goodies from the counter.`}
            ctaHref="/shoppe"
            ctaText="Return to browsing"
          />
        ) : transactionFailed ? (
          <NpcDialogue
            subtitle={`"you're lucky I don't have a 'YOU LOOK YOU BUY' sign, or else you'd pay for everything here!"`}
            suggestion={`Oops... that transaction didn't work ):`}
            ctaHref="/shoppe"
          />
        ) : cartCount === 0 ? (
          <NpcDialogue
            title={`The cashier gives you an awkward, but polite smile.`}
            subtitle={`"ummm.... your cart is empty"`}
            suggestion={`Maybe you should go buy something...`}
            ctaHref="/shoppe"
            ctaText="Fine"
          />
        ) : (
          <NpcDialogue
            title={`The cashier gives you an awkward, but polite smile.`}
            subtitle={`"yeah, checkout's here"`}
          />
        )}
        {(cartCount || 0) > 0 && <ShoppingCartSummary />}
      </div>
    </div>
  )
}
