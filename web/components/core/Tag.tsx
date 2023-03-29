import clsx from "clsx"
import { FC } from "react"

export const Tag: FC<React.PropsWithChildren<{ className?: string }>> = ({ className, children }) => (
  <div
    className={clsx(className ? className : "bg-p2 text-white", "text-md h-min rounded-md px-3 font-light uppercase")}
  >
    {children}
  </div>
)
