// @flow strict

import React from 'react'
import classNames from 'classnames'

import jFieldMessageStyle from './jFieldMessage.m.scss'

type Theme = 'info' | 'error'
type Props = StyleComponent<Theme> & {
  message: string,
}

function JFieldMessage({
  theme = 'error',
  message = '',
  className,
}: Props) {
  return (
    <span className={classNames(
      className,
      jFieldMessageStyle.core,
      jFieldMessageStyle[theme],
    )}
    >
      {message}
    </span>
  )
}

const MemoizedJFieldMessage = React.memo/* :: <Props> */(JFieldMessage)

export {
  MemoizedJFieldMessage as JFieldMessage,
}
