import React from 'react'
import { Image, Text, Group } from 'react-konva'
import useImage from 'use-image'
import { width, height, padding } from './config'
import { Item } from './Item'
import benz1 from  './images/benz1.png'
import benz2 from './images/benz2.png'
import none from './images/none.png'
import './CoverItem.css'

const benzes = [benz1, benz2]

const initialState = {
  flipped: false, // Move to CoverItem
  title: 'Enter title here',
  benz: benz1
}

export function CoverItem({ image, setAppState }) {
  const [formState, setFormState] = React.useState(initialState)
  const [benzImg] = useImage(formState.benz)
  const fileName = `front`

  return (
    <Item
      form={<FormFront {...{ formState, setFormState, setAppState }} />}
      isCover
      {...{ image, fileName }}
    >
      <Benz image={benzImg} flipped={formState.flipped} />
      <Title text={formState.title} flipped={formState.flipped} />
    </Item>
  )
}

function Benz({ image, flipped }) {
  if (!image) return null
  const { height: imageHeight, width: imageWidth } = image
  const renderHeight = height / 1.4
  const renderWidth = renderHeight * (imageWidth / imageHeight)
  const y = height - renderHeight
  const x = flipped ? width - (renderWidth / 2) : renderWidth / 2
  return (
    <Image
      width={renderWidth}
      height={renderHeight}
      scaleX={flipped ? -1 : 1}
      offset={{ x : renderWidth / 2, y: 0 }}
      draggable
      dragBoundFunc={pos => ({ x: pos.x, y })}
      {...{ image, y, x }}
    />
  )
}

function Title({ text, flipped }) {
  const titleWidth = width - padding * 4

  const textProps = {
    text,
    fontFamily: 'Bangers',
    fontSize: 60,
    align: 'center',
    lineHeight: 1.1,
    width: titleWidth,
    verticalAlign: 'middle',
    x: width / 4,
    y: padding * 2,
    rotation: flipped ? -10 : 10,
    // offset: { x: titleWidth / 2, y: 0 },
    // height: 200
  }

  return (
    <Group draggable>
      <Text
        stroke='black'
        strokeWidth={10}
        shadowColor='rgba(0, 0, 0, 0.35)'
        shadowBlur={40}
        {...textProps}
      />
      <Text fill='white' {...textProps} />
    </Group>
  )
}

function FormFront({ formState, setFormState, setAppState }) {
  const readerRef = React.useRef(new FileReader())
  React.useEffect(
    () => {
      const reader = readerRef.current
      reader.addEventListener('load', setImage, false)
      return () => { reader.removeEventListener('load', setImage) }

      function setImage() {
        // check if still mounted
        setAppState(x => ({...x, image: reader.result }))
      }
    },
    [setAppState]
  )

  return (
    <form className='Form' onSubmit={e => {e.preventDefault()}}>
      <div>
        <textarea
          name='title' id='title'
          value={formState.title}
          placeholder='Type your title'
          className='Form-title'
          onChange={(e) => {
            const { value } = e.target
            setFormState(x => ({ ...x, title: value }))
          }}
        />
      </div>
      <div className='Form-benzContainer'>
        <div className='Form-benzes'>
          <label
            className='Form-benz'
            data-checked={formState.benz === null}
            style={{ backgroundImage: `url(${none})` }}
          >
            <input
              type='radio' name='benz'
              checked={formState.benz === null}
              onChange={() => { setFormState(x => ({ ...x, benz: null })) }}
            />
          </label>

          {benzes.map(benz =>
            <label
              className='Form-benz'
              data-checked={ benz === formState.benz}
              key={benz}
              style={{ backgroundImage: `url(${benz})`}}
            >
              <input
                type='radio' name='benz'
                checked={benz === formState.benz}
                onChange={() => { setFormState(x => ({ ...x, benz }) )}}
              />
            </label>
          )}
        </div>
        <label htmlFor='flipped'>
          Flipped?
          <input
            type='checkbox'
            name='flipped' id='flipped'
            checked={formState.flipped}
            onChange={() => { setFormState(x => ({...x, flipped: !x.flipped }) ) }}
          />
        </label>
      </div>

      <label className='Form-fileInput'>
        <span>Upload a picture</span>
        <input type='file' onChange={onImageChange} />
      </label>
    </form>
  )

  function onImageChange(e) {
    const file = e.target.files[0]
    if (file) readerRef.current.readAsDataURL(file)
  }
}