import { FC } from "react"
import Head from "next/head"
import { Navbar } from "./Navbar"

const Layout: FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Carrots & Hummus | Art Shoppe</title>
        <meta name="description" content="Revolutionizing the chair" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="relative flex flex-col  min-h-screen overflow-auto">
          <Navbar />
          {/* Page w/ content */}
          <div className="pt-20 min-h-screen h-full flex justify-center items-center">{children}</div>
        </div>
      </main>
    </>
  )
}

export default Layout
