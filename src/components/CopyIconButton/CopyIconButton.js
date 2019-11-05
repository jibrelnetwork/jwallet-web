// @flow strict

import React, { PureComponent } from 'react'
import { withI18n } from '@lingui/react'
import { type I18n } from '@lingui/core'

import clipboard from 'services/clipboard'
import toastsPlugin from 'store/plugins/toastsPlugin'
import { JIcon } from 'components/base'
import { gaSendEvent } from 'utils/analytics'

import styles from './copyIconButton.m.scss'

type Props = {|
  +i18n: I18n,
  +title: ?string,
  +content: string,
  +toastMessage: ?string,
|}

class CopyIconButton extends PureComponent<Props> {
  static defaultProps = {
    title: null,
    toastMessage: null,
  }

  handleCopy = () => {
    const {
      title,
      content,
      toastMessage,
    }: Props = this.props

    clipboard.copyText(content)

    if (toastMessage) {
      toastsPlugin.showToast(toastMessage)
    }

    gaSendEvent(
      'ClipboardCopy',
      'ContentCopied',
      title,
    )
  }

  render() {
    const {
      i18n,
      title,
      content,
    }: Props = this.props

    return (
      <button
        onClick={this.handleCopy}
        title={title || i18n._(
          'common.CopyIconButton.title',
          { content },
          { defaults: 'Copy {content}' },
        )}
        className={`__copy-icon-button ${styles.core}`}
        type='button'
      >
        <JIcon name='copy-use-fill' />
      </button>
    )
  }
}

const CopyIconButtonEnhanced = withI18n()(CopyIconButton)
export default CopyIconButtonEnhanced
