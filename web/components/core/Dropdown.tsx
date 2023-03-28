import { DownCaretIcon } from "@components/icons"
import useComponentVisible from "@hooks/useComponentVisible"
import clsx from "clsx"
import { FC, KeyboardEvent } from "react"

export interface DropdownProps {
  className?: string
  options: string[]
  setOption?: (option: string) => void | Promise<any>
  currentOption: string
  outline?: boolean
  border?: boolean
  caretStyle?: "withCircle" | "default"
}

export const Dropdown: FC<React.PropsWithChildren<DropdownProps>> = ({
  className,
  options,
  setOption,
  currentOption,
  outline = true,
  border = true,
  caretStyle = "default",
}) => {
  const [ref, showOptions, setShowOptions] = useComponentVisible(false)

  const handleOptionSelection = (option: string): void => {
    if (option !== currentOption && setOption) setOption(option)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === " " || e.key === "Enter") {
      // Prevents accidental collapsing when toggling buttons within the component
      if (e.target === e.currentTarget) {
        e.preventDefault()
        toggleOptions()
      }
    }
  }

  const toggleOptions = (): void => setShowOptions((show) => !show)

  return (
    <div
      ref={ref}
      onKeyDown={onKeyDown}
      tabIndex={0}
      role="button"
      onClick={toggleOptions}
      className={clsx(
        "relative flex h-full min-w-fit items-center rounded-3xl px-3",
        border && "border border-white",
        outline && "focus:outline focus:outline-1 focus:outline-white"
      )}
    >
      <div className={clsx(className, "flex flex-row items-center justify-center gap-2")}>
        <span className="select-none font-medium text-white">{currentOption}</span>
        {caretStyle === "withCircle" ? (
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white">
            <DownCaretIcon className={clsx(showOptions && "rotate-180", "h-2 w-2 fill-white")} />
          </span>
        ) : (
          <DownCaretIcon className={clsx(showOptions && "rotate-180", "h-4 w-4 fill-white")} />
        )}
      </div>
      {showOptions && (
        <div
          className={clsx(
            "absolute bottom-0 left-0 z-[1] w-full min-w-min translate-y-full flex-col gap-5 rounded-b-md bg-p5"
          )}
        >
          {options.map((option, i) => (
            <button
              className="w-full select-none p-2 text-white outline outline-1 outline-white last:rounded-b-md hover:bg-white hover:text-p5 hover:-outline-offset-1 hover:outline-p5"
              key={i}
              onClick={() => handleOptionSelection(option)}
            >
              <span>{option}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
