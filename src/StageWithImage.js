import React from 'react'
import { Stage, Layer, Image } from 'react-konva'
import { width, height } from './config'
import Konva from 'konva'

export const StageWithImage = React.forwardRef(ActualStageWithImage)
function ActualStageWithImage({ children, image, imageIsBlurred }, ref) {
  const imageRef = React.useRef()

  React.useEffect(() => {
    if (image && imageRef.current) {
      imageRef.current.cache()
      imageRef.current.getLayer().batchDraw()
    }
  }, [image])

  return (
    <Stage {...{ width, height, ref }} className='Item-stage'>
      <Layer>
        <Image
          filters={[Konva.Filters.Blur]}
          blurRadius={imageIsBlurred ? 30 : 0}
          ref={imageRef}
          {...{ width, height, image }}
        />
        {children}
      </Layer>
    </Stage>
  )
}