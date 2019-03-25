// @flow

import React from 'react'
import classNames from 'classnames'

import ErrorMessageStyle from './ErrorMessage.m.scss'

type Theme = 'info' | 'warning' | 'error'
type Props = StyleComponent<Theme> & {
  message: string,
}

function ErrorMessage({
  theme = 'error',
  message = '',
  className,
}: Props) {
  return (
    <span className={classNames(
      className,
      ErrorMessageStyle.core,
      ErrorMessageStyle[theme])}
    >
      {message}
    </span>
  )
}

const MemoizedErrorMessage = React.memo/* :: <Props> */(ErrorMessage)

export {
  MemoizedErrorMessage as ErrorMessage,
}
