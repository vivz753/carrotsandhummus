import { FC } from "react"
import Image from "next/image"
import { Button } from "@components/core"

export const NpcDialogue: FC<{
  title?: string
  subtitle?: string
  suggestion?: string
  ctaText?: string
  ctaHref?: string
}> = ({ title, subtitle, suggestion, ctaText, ctaHref }) => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-20">
      <div className="flex flex-col items-center justify-center gap-5">
        <span>{title}</span>
        <div className="relative h-72 w-72 bg-p1">
          <Image src="/images/awkward/politesmilecat.PNG" alt="awkward-cat" fill style={{ objectFit: "contain" }} />
        </div>
        <span>{subtitle}</span>
      </div>
      {(suggestion || ctaText) && (
        <div className="flex flex-col items-center gap-5">
          <span>{suggestion}</span>
          {ctaText && <Button href={ctaHref}>{ctaText}</Button>}
        </div>
      )}
    </div>
  )
}
