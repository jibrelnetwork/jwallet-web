// @flow strict

import classNames from 'classnames'
import React, { PureComponent } from 'react'
import { t } from 'ttag'

import { clipboard } from 'services'
import { JIcon } from 'components/base'

import copyableFieldStyles from './copyableField.m.scss'

type Props = {|
  +value: string,
  +label: string,
|}

export class CopyableField extends PureComponent<Props> {
  handleCopy = () => {
    clipboard.copyText(this.props.value)
  }

  render() {
    const {
      value,
      label,
    }: Props = this.props

    return (
      <div
        className={classNames(
          '__copyable-field',
          copyableFieldStyles.core,
        )}
      >
        <div className={copyableFieldStyles.content}>
          <div className={copyableFieldStyles.label}>
            {label}
          </div>
          <div className={copyableFieldStyles.value}>
            {value}
          </div>
        </div>
        <button
          type='button'
          title={t`Copy${label ? ' ' : ''}${label || ''}`}
          onClick={this.handleCopy}
          className={copyableFieldStyles.button}
        >
          <JIcon name='copy-use-fill' />
        </button>
      </div>
    )
  }
}
