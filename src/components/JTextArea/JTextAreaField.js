// @flow

import React, { Fragment } from 'react'
import { type FieldRenderProps /* FieldRenderProps */ } from 'react-final-form'
import {
  omit,
  merge,
} from 'lodash-es'

import { ErrorMessage } from 'components/base/ErrorMessage/ErrorMessage'

import { JTextArea } from './JTextArea'

import JTextAreaFieldStyle from './jTextAreaField.m.scss'

type Props =
  FieldRenderProps
  & { getMeta: Function }

export function JTextAreaField(props: Props) {
  props.getMeta(props.meta)

  const resultProps = merge(omit(props, [
    'meta',
    'input',
  ]), props.input)

  const { error: errorText } = props.meta

  return (
    <Fragment>
      <JTextArea
        {...resultProps}
        className={errorText && JTextAreaFieldStyle.withError}
      />
      {errorText && <ErrorMessage message={errorText} theme='error' />}
    </Fragment>
  )
}
