import { FC } from "react"

export const Modal: FC<React.PropsWithChildren> = ({ children }) => (
  <div className="fixed inset-0 z-20 flex h-screen w-screen items-center justify-center bg-red-100">
    <div className="absolute inset-0 bg-black opacity-20" />
    {children}
  </div>
)
