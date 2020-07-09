import React from 'react'
import { Stage, Layer, Image } from 'react-konva'
import { width, height } from './config'
import Konva from 'konva'

export const StageWithImage = React.forwardRef(ActualStageWithImage)
function ActualStageWithImage({ children, image, imageIsBlurred }, ref) {
  const imageRef = React.useRef()

  React.useEffect(() => {
    if (image && imageRef.current) {
      imageRef.current.crop(getCropArgs(image))
      imageRef.current.cache()
      imageRef.current.getLayer().batchDraw()
    }
  }, [image])

  return (
    <Stage {...{ width, height, ref }} className='Item-stage'>
      <Layer>
        <Image
          filters={imageIsBlurred && [Konva.Filters.Blur]}
          blurRadius={imageIsBlurred ? 30 : 0}
          ref={imageRef}
          {...{ width, height, image }}
        />
        {children}
      </Layer>
    </Stage>
  )
}

function getCropArgs(image) {
  const { naturalWidth, naturalHeight } = image
  return naturalWidth > naturalHeight
    ? {
      width: naturalWidth * (naturalHeight / naturalWidth),
      height: naturalHeight,
      x: (naturalWidth - naturalHeight) / 2,
      y: 0
    }
    : {
      width: naturalWidth,
      height: naturalHeight * (naturalWidth / naturalHeight),
      x: 0,
      y: (naturalHeight - naturalWidth) / 2
    }
}