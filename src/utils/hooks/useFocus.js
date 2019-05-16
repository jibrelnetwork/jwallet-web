// @flow strict

import { useState } from 'react'

export const useFocus = (): [
  boolean,
  {
    onFocus: () => void,
    onBlur: () => void,
  },
] => {
  const [isFocused, setFocused] = useState(false)

  return [isFocused, {
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
  }]
}
