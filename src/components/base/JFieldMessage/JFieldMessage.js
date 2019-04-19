// @flow strict

import React from 'react'
import classNames from 'classnames'

import jFieldMessageStyle from './jFieldMessage.m.scss'

export type JFieldMessageTheme = 'info' | 'error'

type Props = StyleComponent<JFieldMessageTheme> & {
  +message: ?string,
}

function JFieldMessage({
  theme,
  message,
  className,
}: Props) {
  return (
    <span
      className={classNames(
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

export { MemoizedJFieldMessage as JFieldMessage }
