import { ConditionalWrapper } from "@components/core"
import { LeftCaretIcon, RightCaretIcon } from "@components/icons"
import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"
import { FC, useState } from "react"

export const Carousel: FC<{ href?: string; images: string[]; size?: "md" | "lg" }> = ({
  href,
  images,
  size = "md",
}) => {
  const [index, setIndex] = useState(0)

  const shiftLeft = () => {
    setIndex((i) => {
      if (i > 0) {
        return i - 1
      } else {
        return images.length - 1
      }
    })
  }
  const shiftRight = () => {
    setIndex((i) => {
      if (i < images.length - 1) {
        return i + 1
      } else {
        return 0
      }
    })
  }

  return (
    <div className={clsx("relative flex flex-col", size === "md" ? "w-72" : "w-72 lg:w-96")}>
      <div className="relative flex flex-row items-center">
        {images.length > 1 && (
          <div className="absolute left-0 -translate-x-full p-1 lg:p-3">
            <button onClick={shiftLeft} className="rounded-full bg-gray-400 p-1">
              <LeftCaretIcon className="h-4 w-4 fill-white" />
            </button>
          </div>
        )}
        <div
          className={clsx(
            href && "smooth-transition-all transform hover:scale-105",
            "overflow-hidden whitespace-nowrap"
          )}
        >
          <div
            className="smooth-transition-all inline-block transform whitespace-nowrap"
            style={{
              translate: `-${(100 / images.length) * index}%`,
            }}
          >
            <ConditionalWrapper condition={!!href} wrapper={(children) => <Link href={href ?? ""}>{children}</Link>}>
              <>
                {images.length > 0 &&
                  images.map((url) => (
                    <div
                      key={url}
                      className={clsx(
                        "relative inline-block",
                        size === "md" ? "h-72 w-72" : "h-72 w-72 lg:h-96 lg:w-96"
                      )}
                    >
                      {url ? (
                        <Image fill style={{ objectFit: "contain" }} src={url} alt={url} />
                      ) : (
                        <div className="h-full w-full rounded-full bg-red-500" /> // ideally shouldn't render, but sometimes will if edited items aren't published, resulting in an array containing null object so it bypasses the MissingImage cmpnt. SOLUTION: publish all edited items
                      )}
                    </div>
                  ))}
              </>
            </ConditionalWrapper>
          </div>
        </div>
        {images.length > 1 && (
          <div className="absolute right-0 translate-x-full p-1 lg:p-3">
            <button onClick={shiftRight} className="rounded-full bg-gray-400 p-1">
              <RightCaretIcon className="h-4 w-4 fill-white" />
            </button>
          </div>
        )}
      </div>
      {images.length > 1 && (
        <div className="mt-2 flex -translate-y-full flex-row justify-center gap-1">
          {Array(images.length)
            .fill(0)
            .map((x, i) => (
              <span
                key={i}
                className={clsx(
                  "h-2 w-2 rounded-full border border-gray-400",
                  i === index ? "bg-gray-400" : "bg-white"
                )}
              />
            ))}
        </div>
      )}
    </div>
  )
}
