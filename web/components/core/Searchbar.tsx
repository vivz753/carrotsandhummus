import { ChangeEventHandler, FC } from "react"

export const Searchbar: FC<{ value: string; onChange: ChangeEventHandler<HTMLInputElement> | undefined }> = ({
  value,
  onChange,
}) => {
  return (
    <input
      onChange={onChange}
      value={value}
      className="h-10 rounded-full border border-white bg-transparent p-3 text-white placeholder:text-white focus:border-2 focus:outline-none"
      placeholder="Search for an Item..."
    />
  )
}
