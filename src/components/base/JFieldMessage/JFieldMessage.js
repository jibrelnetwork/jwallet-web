// @flow strict

import React from 'react'
import classNames from 'classnames'

import JFieldMessageStyle from './jFieldMessage.m.scss'

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
      JFieldMessageStyle.core,
      JFieldMessageStyle[theme],
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
