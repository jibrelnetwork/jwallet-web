// @flow

import React, { Fragment } from 'react'
import { type FieldRenderProps /* FieldRenderProps */ } from 'react-final-form/dist/types'

import { ErrorMessage } from 'components/base/ErrorMessage/ErrorMessage'

import { JTextArea } from './JTextArea'

type Props =
  FieldRenderProps
  & StyleComponent<'blue'>

export function JTextAreaField(props: Props) {
  const message = props.meta.visited ? String(props.meta.error) : ''

  return (
    <Fragment>
      <JTextArea
        {...props}
        {...props.input}
      />
      <ErrorMessage message={message} theme='error' />
    </Fragment>
  )
}
