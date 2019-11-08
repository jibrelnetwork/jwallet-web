// @flow strict

import React from 'react'
import classNames from 'classnames'

import styles from './jFieldMessage.m.scss'

export type JFieldMessageTheme = 'info' | 'error'

type Props = {|
  +message: ?string,
  +className: ?string,
  +theme: JFieldMessageTheme,
|}

export default function JFieldMessage({
  theme,
  message,
  className,
}: Props) {
  return (
    <span
      className={classNames(
        className,
        styles.core,
        styles[theme],
      )}
    >
      {message}
    </span>
  )
}

JFieldMessage.defaultProps = {
  theme: 'info',
  message: null,
  className: null,
}

export const JFieldMessageEnhanced = React.memo/* :: <Props> */(JFieldMessage)
