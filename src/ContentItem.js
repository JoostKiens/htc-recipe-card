import React from 'react'
import { Text, Rect, Group } from 'react-konva'
import { Item } from './Item'
import { width, height, padding } from './config'
import { useElementSize } from './useElementSize'
import './ContentItem.css'

const contentStyles = {
  fontFamily: 'roboto',
  fontSize: 24,
  lineHeight: 1.2,
  width: width - padding * 4,
  height: height - padding * 4 - 100,
  y: padding + 100,
  x: padding
}

export const ContentItem = function ContentItem({
  index, image, stateKey, itemCount, title, add, remove,
}) {
  const { size: { width: contentWidth }, ref: contentRef } = useElementSize()
  const [content, setContent] = React.useState('')
  const fileName = `${title}-${index + 1}`

  const scale = contentWidth / 640

  const buttons = (
    <AddRemoveButtons
      add={() => { add({ stateKey }) }}
      remove={() => { remove({ stateKey }) }}
      {...{ index, itemCount }}
    />
  )

  return (
    <div className='ContentItem' ref={contentRef}>
      <Item
        form={<Form {...{ setContent, content, scale }} />}
        imageIsBlurred
        {...{ image, fileName, buttons }}
      >
        <Content
          width={width - padding * 2}
          height={height - padding * 2}
          x={padding}
          y={padding}
          content={content}
          {...{ title }}
        />
      </Item>
    </div>
  )
}

function Content({ title, content, x, y, width, height }) {
  return (
    <Group {...{ x, y, width, height }}>
      <Rect
        fill='#fff'
        shadowColor='rgba(0, 0, 0, 0.35)'
        shadowBlur={20}
        {...{ width, height }}
      />

      <Text
        text={title}
        align='center'
        fontFamily='Bangers'
        fontSize={80}
        lineHeight={1.1}
        y={padding}
        {...{ width }}
      />
      <Text
        text={content}
        {...contentStyles}
      />
    </Group>
  )
}

function Form({ setContent, content, scale }) {
  function onChange(e) {
    const { value } = e.target
    setContent(value)
  }
  const { x: left, y: top, width, height, ...textAreaStyles } = contentStyles
  return (
    <form
      style={{
        top: (top + padding) * scale,
        left: (left + padding) * scale,
        width: width * scale,
        height: height * scale
      }}
      className='ContentItem-form'
      onSubmit={e => {e.preventDefault()}}
    >
      <textarea
        style={{ ...textAreaStyles, fontSize: 24 * scale }}
        className='ContentItem-textArea'
        value={content}
        {...{ onChange }}
      />
    </form>
  )
}

function AddRemoveButtons({ index, itemCount, add, remove }) {
  return (index !== itemCount - 1) ? null: (
    <div className='AddRemoveButtons'>
      {(itemCount > 1) && <button className='AddRemoveButtons-min' onClick={remove}>-</button>}
      <button className='AddRemoveButtons-plus' onClick={add}>+</button>
    </div>
  )
}
