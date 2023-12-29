import clsx from "clsx"
import Image from "next/image"
import { FC, useEffect, useState } from "react"
interface ImageMagnifierProps {
  src: string
  width?: string
  height?: string
  magnifierHeight?: number
  magnifierWidth?: number
  zoomLevel?: number
}

export const ImageMagnifier: FC<React.PropsWithChildren<ImageMagnifierProps>> = ({
  src,
  // width = 100,
  // height = 100,
  magnifierHeight = 175,
  magnifierWidth = 175,
  zoomLevel = 1.75,
}) => {
  const [[x, y], setXY] = useState([0, 0])
  const [[imgWidth, imgHeight], setSize] = useState([0, 0])
  const [[naturalImgWidth, naturalImgHeight], setNaturalSize] = useState([0, 0])
  const [showMagnifier, setShowMagnifier] = useState(false)

  useEffect(() => {
    console.log("imgWidth", imgWidth)
    console.log("imgHeight", imgHeight)
    console.log("x, y", x, y)
  }, [x, y, imgHeight, imgWidth])
  return (
    <div className="flex">
      <Image
        onMouseEnter={(e) => {
          // update image size and turn-on magnifier
          const elem = e.currentTarget
          const { width, height } = elem.getBoundingClientRect()
          const naturalWidth = elem.naturalWidth
          const naturalHeight = elem.naturalHeight
          setNaturalSize([naturalWidth, naturalHeight])
          setSize([width, height])
          setShowMagnifier(true)
        }}
        onMouseMove={(e) => {
          // update cursor position
          const elem = e.currentTarget
          const { top, left } = elem.getBoundingClientRect()

          // calculate cursor position on the image
          const x = e.pageX - left - window.scrollX
          const y = e.pageY - top - window.scrollY
          setXY([x, y])
        }}
        onMouseLeave={() => {
          // close magnifier
          setShowMagnifier(false)
        }}
        fill
        style={{ objectFit: "contain" }}
        src={src}
        // style={{ height: height, width: width }}

        alt={"productImage"}
      />

      <div
        className={clsx(
          !showMagnifier && "hidden",
          "pointer-events-none absolute h-48 w-48 border border-gray-100 bg-white bg-no-repeat"
        )}
        style={{
          // set size of magnifier
          // height: `${magnifierHeight}px`,
          // width: `${magnifierWidth}px`,
          // move element center to cursor pos
          top: `${y - magnifierHeight}px`,
          left: `${x - magnifierWidth}px`,
          // opacity: "1", // reduce opacity so you can verify position
          // border: "1px solid lightgray",
          // backgroundColor: "white",
          backgroundImage: `url('${src}')`,
          // backgroundRepeat: "no-repeat",

          //calculate zoomed image size
          backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px`,

          //calculate position of zoomed image.
          backgroundPositionX: `${-x * zoomLevel + magnifierWidth}px`,
          backgroundPositionY: `${-y * zoomLevel + magnifierHeight}px`,
        }}
      ></div>
      {/* <span>{imgWidth}</span> */}
      {/* <span>{imgHeight}</span> */}
    </div>
  )
}
