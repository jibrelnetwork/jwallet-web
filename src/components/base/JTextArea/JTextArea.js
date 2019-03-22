// @flow

import React, { PureComponent } from 'react'
import { omit } from 'lodash-es'
import classNames from 'classnames'

import jTextAreaStyle from './jTextArea.m.scss'

type Theme = 'blue'

type Props = StyleComponent<Theme> & {
  ...HTMLTextAreaElement,
  onChange: Function,
  onBlur?: Function,
  onFocus?: Function,
}

const MAX_ROWS = 12

function heightCalc(event: SyntheticEvent<HTMLTextAreaElement>): void {
  if (event.currentTarget) {
    const target = event.currentTarget

    while (target.clientHeight < target.scrollHeight && target.rows <= MAX_ROWS) {
      // mutating the DOM
      // eslint-disable-next-line fp/no-mutation
      target.rows += 1
    }
  }
}

function handleChange(finalFormHandler: Function): SyntheticEvent<HTMLTextAreaElement> => void {
  return function textAreaChangeHandler(fieldEvent) {
    heightCalc(fieldEvent)
    finalFormHandler(fieldEvent)
  }
}

export class JTextArea extends PureComponent<Props, void> {
  static defaultProps = {
    onBlur: undefined,
    onFocus: undefined,
    theme: 'blue',
    className: undefined,
  }

  render() {
    const omitedProps = omit(this.props, [
      'children',
      'onChange',
      'theme',
      'className',
    ])

    return (
      <textarea
        {...omitedProps}
        className={classNames(
          this.props.className,
          jTextAreaStyle.core,
          jTextAreaStyle[this.props.theme],
        )}
        onChange={handleChange(this.props.onChange)}
      />
    )
  }
}
