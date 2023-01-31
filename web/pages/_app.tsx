import "../styles/globals.css"
import type { AppProps } from "next/app"
import Layout from "../components/Layout/Layout"

import { CartProvider } from "use-shopping-cart"
import { FC } from "react"

const stripe = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider shouldPersist cartMode="checkout-session" stripe={stripe} currency="USD">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartProvider>
  )
}
