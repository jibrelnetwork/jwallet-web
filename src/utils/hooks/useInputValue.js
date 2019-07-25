// @flow strict

import { useState } from 'react'

export const useInputValue = (initialValue: string = ''): [
  string,
  {
    onChange: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  },
] => {
  const [value, setValue] = useState(initialValue)

  return [value, {
    onChange: e => setValue(e.target.value),
  }]
}
