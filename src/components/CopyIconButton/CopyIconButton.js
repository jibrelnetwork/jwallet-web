// @flow strict

import React, { PureComponent } from 'react'
import { t } from 'ttag'

import { clipboard } from 'services'
import { JIcon } from 'components/base'
import { toastsPlugin } from 'store/plugins'

import copyIconButtonStyle from './copyIconButton.m.scss'

type Props = {|
  +title: string,
  +content: string,
  +toastMessage: string,
|}

export class CopyIconButton extends PureComponent<Props> {
  static defaultProps = {
    title: '',
    toastMessage: '',
  }

  handleCopy = (address: Address) => () => {
    clipboard.copyText(address)

    const { toastMessage }: Props = this.props

    if (toastMessage) {
      toastsPlugin.showToast({
        type: 'base',
        message: toastMessage,
      })
    }
  }

  render() {
    const {
      title,
      content,
    }: Props = this.props

    return (
      <button
        onClick={this.handleCopy(this.props.content)}
        title={title || t`Copy ${content}`}
        className={`__copy-icon-button ${copyIconButtonStyle.core}`}
        type='button'
      >
        <JIcon name='copy-use-fill' />
      </button>
    )
  }
}
