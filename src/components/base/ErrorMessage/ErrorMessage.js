// @flow

import React from 'react'
import classNames from 'classnames'

import ErrorMessageStyle from './ErrorMessage.m.scss'

type Theme = 'error' | 'info'
type Props = StyleComponent<Theme> & {
  message: string,
}

function ErrorMessage(
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

const MemorizedErrorMessage = React.memo/* :: <Props> */(ErrorMessage)

export {
  MemorizedErrorMessage as ErrorMessage,
}
