import { HeartIcon } from "@components/icons"
import { FC } from "react"

export const LoadingOverlay: FC = () => (
  <div className="pointer-events-none fixed inset-0 z-10 flex h-screen w-screen cursor-wait items-center justify-center">
    <div className="absolute inset-0 bg-white opacity-20" />
    <div className="flex flex-row items-center justify-center gap-2 rounded-xl bg-red-300 px-5 py-3">
      <HeartIcon className="h-8 w-8 animate-pulse fill-white" />
      <span className="flex select-none flex-row items-center gap-1 font-title text-xl text-white">
        Loading
        <div className="text- flex flex-row  gap-0.5">
          <span className="blink " style={{ animationDelay: "0ms" }}>
            .
          </span>
          <span className="blink" style={{ animationDelay: "333ms" }}>
            .
          </span>
          <span className="blink" style={{ animationDelay: "666ms" }}>
            .
          </span>
        </div>
      </span>
    </div>
  </div>
)
