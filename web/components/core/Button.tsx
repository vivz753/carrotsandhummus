import { ConditionalWrapper } from "@components/core"
import clsx from "clsx"
import Link from "next/link"
import { FC, MouseEventHandler, ReactNode } from "react"

export const Button: FC<{
  children: ReactNode
  href?: string
  size?: "xs" | "sm" | "lg"
  wide?: boolean
  className?: string
  variant?: "solid1" | "solid2" | "solid3" | "outlined1" | "outlined2"
  onClick?: MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
}> = ({ wide, children, href, size = "xs", className, variant = "solid1", onClick, disabled }) => {
  const sizeStyle =
    size === "xs" ? "p-2 lg:px-5" : size === "sm" ? "h-[49px] text-[20px] px-7" : "h-[66px] text-[24px] px-[36px]"
  const baseStyle = "select-none whitespace-nowrap rounded-md smooth-transition"
  const disabledStyle =
    "relative cursor-not-allowed after:bg-white after:w-full after:absolute after:h-full after:opacity-50 after:rounded-md"
  return (
    <ConditionalWrapper condition={!!href} wrapper={(children) => <Link href={href ?? ""}>{children}</Link>}>
      <button
        disabled={disabled}
        onClick={onClick}
        className={clsx(
          "flex shrink-0 items-center justify-center",
          wide ? "w-full" : "max-w-max",
          baseStyle,
          sizeStyle,
          disabled && disabledStyle,
          variant === "solid1" && "bg-p5 text-white ring ring-white",
          variant === "solid2" && "bg-white ring ring-p5 hover:ring-p1",
          variant === "solid3" && "bg-p2 text-white",
          variant === "outlined1" && "text-c0 outline-c0 outline outline-2",
          variant === "outlined2" && "text-white outline outline-2 outline-white",
          className
        )}
      >
        {children}
      </button>
    </ConditionalWrapper>
  )
}
