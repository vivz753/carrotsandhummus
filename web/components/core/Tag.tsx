import clsx from "clsx"
import { FC } from "react"

export const Tag: FC<React.PropsWithChildren<{ className?: string; size?: "sm" | "lg" }>> = ({
  className,
  children,
  size = "lg",
}) => (
  <div
    className={clsx(
      className ? className : "bg-p2 text-white",
      size === "sm" ? "h-[24px] px-2 text-xs" : "text- h-[28px] px-3 uppercase",
      "flex items-center justify-center rounded-md"
    )}
  >
    {children}
  </div>
)
