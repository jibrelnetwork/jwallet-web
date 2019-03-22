// @flow

import React, { PureComponent } from 'react'
import classNames from 'classnames'

import jTextAreaStyle from './jTextArea.m.scss'

type Theme = 'blue'

type Props = HTMLTextAreaElement & {|
  +onChange: Function,
  +onBlur: Function,
  +onFocus: Function,
  +theme: Theme,
  +className?: ?string,
|}

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
    className: null,
    theme: 'blue',
  }

  render() {
    const {
      onChange,
      theme,
      children,
      className,
      ...rest
    } = this.props

    return (
      <textarea
        {...rest}
        className={classNames(
          className,
          jTextAreaStyle.core,
          jTextAreaStyle[theme],
        )}
        onChange={handleChange(onChange)}
      />
    )
  }
}
