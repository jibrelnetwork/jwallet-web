// @flow

import React from 'react'
import { Field } from 'react-final-form'

import { ErrorMessage } from 'components/base/ErrorMessage/ErrorMessage'

import { JTextArea } from './JTextArea'

type FieldRenderProps = ExtractReturn<typeof Field>
type Props = FieldRenderProps & {
  ...HTMLTextAreaElement,
}

export function JTextAreaField(props: Props) {
  const message = props.meta.visited ? String(props.meta.error) : ''

  return (
    <div>
      <JTextArea
        {...props}
        {...props.input}
      />
      <ErrorMessage message={message} theme='error' />
    </div>
  )
}
