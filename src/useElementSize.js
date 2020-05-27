import React from 'react'
import { useObservedRef } from './useObservedRef'

const defaultSize = { width: 0, height: 0 }

// assumes the resize-observer-polyfill is loaded, this can be done through polyfill.io
export function useElementSize() {
  const [size, setSize] = React.useState(defaultSize)
  const createObserver = React.useCallback(
    () => {
      // @ts-ignore
      return new window.ResizeObserver(([entry]) => {
        setSize({ width: entry.contentRect.width, height: entry.contentRect.height })
      })
    },
    []
  );

  const reset = React.useCallback(() => { setSize(defaultSize) }, [])
  const ref = useObservedRef({ createObserver, reset, disabled: false })

  return { size, ref }
}
