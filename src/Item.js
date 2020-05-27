import React from 'react'
import { Stage, Layer, Image } from 'react-konva'
import { width, height } from './config'
import Konva from 'konva'
import './Item.css'

export function Item({ image, children, fileName, form, buttons, imageIsBlurred, isCover }) {
  const stageRef = React.useRef()
  const imageRef = React.useRef()

  React.useEffect(() => {
    if (image) {
      imageRef.current.cache()
      imageRef.current.getLayer().batchDraw()
    }
  }, [image])

  return (
    <div className="Item">
      <Stage {...{ width, height }} className='Item-stage' ref={stageRef}>
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

      <div className={`Actions ${isCover && 'Actions--cover'}`}>
        {buttons}
        {form}
        <DownloadButton {...{ fileName, stageRef }}>Download</DownloadButton>
      </div>
    </div>
  )
}

function DownloadButton({ stageRef, fileName, children }) {
  return <button className='DownloadButton' {...{ onClick, children }} />

  function onClick() {
    const dataURL = stageRef.current.toDataURL({ pixelRatio: 2 })
    downloadURI(dataURL, `${fileName}.png`)
  }
}

// function from https://stackoverflow.com/a/15832662/512042
function downloadURI(uri, name) {
  var link = document.createElement('a');
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}