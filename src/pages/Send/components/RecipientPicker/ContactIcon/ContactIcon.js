// @flow strict

import * as React from 'react'
import classNames from 'classnames'

import { JIcon } from 'components/base'

import contactIconStyles from './contactIcon.m.scss'

function createSymbol(text: string) {
  const letters = text
    .trim()
    .split(/\s+/)
    .reduce((reduceResult, part, idx) => {
      /* eslint-disable prefer-destructuring */
      // reduce is designed to mutate reduceResult
      // destructuring is not applicable, because those are strings, not arrays
      if (idx === 0) {
        reduceResult.first = part[0]

        if (part.length > 1) {
          reduceResult.last = part[1]
        }
      } else {
        reduceResult.last = part[0]
      }
      /* eslint-enable prefer-destructuring */

      return reduceResult
    }, {
      first: '',
      last: '',
    })

  return (letters.first + letters.last).toUpperCase()
}

type Props = {|
  +name: string,
  +className: string,
|}

export function ContactIcon({
  name,
  className,
}: Props) {
  if (!name) {
    return (
      <JIcon
        name='contact-2-use-fill'
        color='blue'
        className={className}
      />
    )
  }

  const symbol = createSymbol(name)

  return (
    <div className={classNames(contactIconStyles.core, className)}>
      <span className={contactIconStyles.symbol}>{symbol}</span>
    </div>
  )
}

ContactIcon.defaultProps = {
  name: '',
  className: '',
}
