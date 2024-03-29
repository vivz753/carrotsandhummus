import Head from "next/head"
import { FC, useState } from "react"
import { Footer } from "./Footer"
import { Navbar } from "./Navbar"
import { SideCart } from "./SideCart"

const Layout: FC<React.PropsWithChildren> = ({ children }) => {
  const [sideCart, setSideCart] = useState(false)

  return (
    <>
      <Head>
        <title>Carrots & Hummus | Art Shoppe</title>
        <meta name="description" content="Revolutionizing the chair" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="relative flex w-full flex-col overflow-auto">
          <Navbar />
          {/* Page w/ content */}
          <div className="flex h-full min-h-screen">
            {children}
            <SideCart view={sideCart} setView={setSideCart} />
          </div>
          <Footer />
        </div>
      </main>
    </>
  )
}

export default Layout
