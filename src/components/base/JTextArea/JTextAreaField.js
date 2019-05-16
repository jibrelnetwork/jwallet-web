// @flow

import React from 'react'
import { type FieldRenderProps } from 'react-final-form/dist'
import {
  omit,
  merge,
} from 'lodash-es'

import { JFieldMessage } from 'components/base'

import offsetStyle from 'styles/offsets.m.scss'

import jTextAreaStyle from './jTextArea.m.scss'
import { JTextArea } from './JTextArea'

type Props = FieldRenderProps & { offset?: OffsetVariant }

export function JTextAreaField(props: Props) {
  const resultProps = merge(omit(props, [
    'meta',
    'input',
  ]), props.input)

  const {
    error: errorText,
    touched,
  } = props.meta

  const hasError = Boolean(errorText && touched)

  return (
    <div className={offsetStyle[props.offset]}>
      <JTextArea
        {...resultProps}
        error={hasError}
        className={hasError && offsetStyle.mb8}
      />
      {hasError && (
        <JFieldMessage
          message={String(errorText)}
          className={jTextAreaStyle.message}
          theme='error'
        />
      )}
    </div>
  )
}

JTextAreaField.defaultProps = {
  offset: 'mb16',
}
