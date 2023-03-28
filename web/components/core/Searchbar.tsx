import clsx from "clsx"
import { ChangeEventHandler, FC } from "react"

export const Searchbar: FC<{
  className?: string
  value: string
  onChange: ChangeEventHandler<HTMLInputElement> | undefined
}> = ({ className, value, onChange }) => {
  return (
    <input
      onChange={onChange}
      value={value}
      className={clsx(
        className,
        "h-10 rounded-full border border-white bg-transparent p-3 text-white placeholder:text-white focus:border-2 focus:outline focus:outline-1"
      )}
      placeholder="Search for an Item..."
    />
  )
}
