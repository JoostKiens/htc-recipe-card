import React from 'react'
import { StageWithImage } from './StageWithImage'
import './Item.css'

export function Item({ image, children, fileName, form, buttons, imageIsBlurred, isCover }) {
  const stageRef = React.useRef()

  return (
    <div className="Item">
      <StageWithImage {...{ image, imageIsBlurred, children}} ref={stageRef} />
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
    downloadURI(stageRef.current.toDataURL(), `${fileName}.png`)
  }
}

// https://stackoverflow.com/a/15832662/512042
function downloadURI(uri, name) {
  var link = document.createElement('a')
  link.download = name
  link.href = uri
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}