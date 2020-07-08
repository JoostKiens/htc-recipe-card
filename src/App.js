import React from 'react'
import { useStrictMode } from 'react-konva'
import './App.css'
import useImage from 'use-image'
import { CoverItem } from './CoverItem'
import { ContentItem } from './ContentItem'
import { StageWithImage } from './StageWithImage'
import times from 'lodash/times'
import src from './test.jpg'

useStrictMode(true)

const initialState = {
  ingredientItemsCount: 1,
  methodItemsCount: 1,
  image: null
}

function App() {
  const [appState, setAppState] = React.useState(initialState)
  const [uploadedImage, setUploadedImage] = React.useState(appState.image || src)
  const [image] = useImage(appState.image)

  console.log('render')

  return (
    <div className="App">
      <ImageResizer {...{ uploadedImage, setAppState }} />
      <ul className='List'>
        <li className='List-item'>
          <CoverItem {...{ image, setUploadedImage }} />
        </li>
        {times(appState.ingredientItemsCount).map((x, index) =>
          <li className='List-item' key={index}>
            <ContentItem
              title={'Ingredients'}
              stateKey='ingredientItemsCount'
              itemCount={appState.ingredientItemsCount}
              {...{ index, image, add, remove }}
            />
          </li>
        )}
        {times(appState.methodItemsCount).map((_, index) =>
          <li className='List-item' key={index}>
            <ContentItem
              title={'- How to cook -'}
              stateKey='methodItemsCount'
              itemCount={appState.methodItemsCount}
              {...{ index, image, add, remove }}
            />
          </li>
        )}
      </ul>
    </div>
  )

  function add({ stateKey }) { setAppState(x => ({ ...x, [stateKey]: x[stateKey] + 1 })) }
  function remove({ stateKey }) { setAppState(x => ({ ...x, [stateKey]: x[stateKey] - 1 })) }
}

function ImageResizer({ uploadedImage, setAppState }) {
  const [image] = useImage(uploadedImage)
  const stageRef = React.useRef()

  React.useEffect(
    () => {
      setAppState(x => ({ ...x, image: stageRef.current.toDataURL({ pixelRatio: 1 }) }))
    },
    [image, setAppState, uploadedImage]
  )

  return (
    <div style={{ display: 'none'}}>
      <StageWithImage {...{ image }} ref={stageRef} />
    </div>
  )
}

export default App
