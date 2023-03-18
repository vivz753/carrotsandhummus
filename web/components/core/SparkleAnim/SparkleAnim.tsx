import { SparkleIcon } from "@components/icons"
import clsx from "clsx"
import { FC, useEffect, useState } from "react"

const colors = ["#ff2d00", "#00a9ff", "#1be22b"]
type Sparkle = {
  id: string
  createdAt: number
  color: string
  size: number
  top: string
  left: string
  delay: string
}

const generateSparkle = (duration: number, i: number, totalSparkles: number): Sparkle => {
  return {
    id: String(Math.floor(Math.random() * (99999 - 10000)) + 10000),
    createdAt: Date.now(),
    color: `${colors[i % colors.length]}`,
    size: Math.floor(Math.random() * (20 - 10)) + 10,
    top: `${Math.floor(Math.random() * 95) - 5}%`,
    left: `${Math.floor(Math.random() * 95) - 5}%`,
    delay: `${
      Math.floor(Math.random() * (duration / totalSparkles) - duration / totalSparkles / 2) +
      i * (duration / totalSparkles)
    }ms`,
  }
}

/**
 * This component generates sparkles in a container as large as its children
 * @param amount the amount of sparkles
 * @param duration the duration of the animation in ms  
 * @returns JSX
 */
export const SparkleAnim: FC<React.PropsWithChildren<{ amount: number; duration: number }>> = ({
  children,
  amount,
  duration,
}) => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([])

  useEffect(() => {
    const sparkles = Array(amount)
      .fill(0)
      .map((x, i) => {
        return generateSparkle(duration, i, amount)
      })
    setSparkles(sparkles)
  }, [amount, duration])

  return (
    <div className="relative flex">
      {sparkles.map((sparkle) => (
        <div
          id={sparkle.id}
          className=" pointer-events-none absolute z-[2]"
          style={{
            top: sparkle.top,
            left: sparkle.left,
            width: sparkle.size,
            height: sparkle.size,
            animation: `grow-and-shrink 850ms ease-in-out ${sparkle.delay} forwards`,
            transform: "scale(0)",
          }}
        >
          <SparkleIcon
            className={clsx(sparkle.color, "anim-spin block h-full w-full")}
            style={{ fill: sparkle.color }}
          />
        </div>
      ))}
      <div className="relative z-[1] flex">{children}</div>
    </div>
  )
}
