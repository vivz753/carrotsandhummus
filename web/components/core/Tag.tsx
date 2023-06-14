import clsx from "clsx"
import { FC } from "react"

export const Tag: FC<React.PropsWithChildren<{ className?: string; size?: "sm" | "lg" }>> = ({
  className,
  children,
  size = "lg",
}) => (
  <div
    className={clsx(className ? className : "bg-p2 text-white",
      size=== "sm" ? "px-1 text-sm" : "text-md px-3", "h-min rounded-md font-light uppercase")}
  >
    {children}
  </div>
)
