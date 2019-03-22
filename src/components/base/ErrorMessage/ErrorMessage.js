// @flow

import React from 'react'
import classNames from 'classnames'

import ErrorMessageStyle from './ErrorMessage.m.scss'

type Theme = 'error' | 'info'
type Props = {
  theme: Theme,
  message: string,
  // eslint-disable-next-line react/require-default-props
  className?: ?string,
}

export function Message(
  {
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

const MemorizedErrorMessage = React.memo/* :: <Props> */(Message)

export {
  MemorizedErrorMessage as ErrorMessage,
}
