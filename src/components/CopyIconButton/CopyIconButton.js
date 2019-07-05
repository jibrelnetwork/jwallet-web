// @flow strict

import React, { PureComponent } from 'react'
import { t } from 'ttag'
import { connect } from 'react-redux'

import { clipboard } from 'services'
import { JIcon } from 'components/base'
import { showToast } from 'store/modules/toasts'

import copyIconButtonStyle from './copyIconButton.m.scss'

type OwnProps = {|
  +title: string,
  +content: string,
  +toastMessage?: string,
|}

type Props = {|
  ...OwnProps,
  +showToast: (payload: ToastPayload) => any,
|}

class CopyIconButton extends PureComponent<Props> {
  static defaultProps = {
    title: '',
    toastMessage: '',
  }

  handleCopy = (address: Address) => () => {
    clipboard.copyText(address)

    const { toastMessage }: Props = this.props

    if (toastMessage) {
      this.props.showToast({
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

const mapDispatchToProps = {
  showToast,
}

const CopyIconButtonEnhanced = connect<Props, OwnProps, _, _, _, _>(
  null,
  mapDispatchToProps,
)(CopyIconButton)

export { CopyIconButtonEnhanced as CopyIconButton }
