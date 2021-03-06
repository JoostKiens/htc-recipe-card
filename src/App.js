import React from 'react'
import { useStrictMode } from 'react-konva'
import './App.css'
import useImage from 'use-image'
import { CoverItem } from './CoverItem'
import { ContentItem } from './ContentItem'
import times from 'lodash/times'
import src from './test.jpg'

useStrictMode(true)

const initialState = {
  ingredientItemsCount: 1,
  methodItemsCount: 1,
  image: null,
  imageSrc: null
}

function App() {
  const [appState, setAppState] = React.useState(initialState)
  const [image] = useImage(appState.imageSrc || src)

  React.useEffect(() => {
    setAppState(x => ({ ...x, image }))
  }, [image])

  return (
    <div className="App">
      <ul className='List'>
        <li className='List-item'>
          <CoverItem {...{ image, setAppState }} />
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

export default App
