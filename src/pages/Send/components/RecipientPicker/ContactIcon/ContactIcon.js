// @flow strict

import * as React from 'react'

import { JIcon } from 'components/base'

import contactIconStyles from './contactIcon.m.scss'

function createSymbol(text: string) {
  const letters = text
    .trim()
    .split(/\s+/)
    .reduce((memo, part, idx) => {
      /* eslint-disable no-param-reassign, prefer-destructuring, fp/no-mutation */
      // reduce is designed to mutate memo
      // destructuring is not applicable, because those are strings, not arrays
      if (idx === 0) {
        memo.first = part[0]

        if (part.length > 1) {
          memo.last = part[1]
        }
      } else {
        memo.last = part[0]
      }
      /* eslint-enable no-param-reassign, prefer-destructuring, fp/no-mutation */

      return memo
    }, {
      first: '',
      last: '',
    })

  return (letters.first + letters.last).toUpperCase()
}

type Props = {|
  +name: string,
  +forceAddressIcon: boolean,
|}

export function ContactIcon({
  name,
  forceAddressIcon,
}: Props) {
  if (forceAddressIcon || !name) {
    return (
      <JIcon
        name='contact-2-use-fill'
        color='blue'
      />
    )
  }

  const symbol = createSymbol(name)

  return (
    <div className={contactIconStyles.core}>
      <span className={contactIconStyles.symbol}>{symbol}</span>
    </div>
  )
}

ContactIcon.defaultProps = {
  forceAddressIcon: false,
  name: '',
}
