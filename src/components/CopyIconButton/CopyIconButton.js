// @flow strict

import React, { PureComponent } from 'react'
import { withI18n } from '@lingui/react'
import { type I18n as I18nType } from '@lingui/core'

import { clipboard } from 'services'
import { JIcon } from 'components/base'
import { toastsPlugin } from 'store/plugins'
import { gaSendEvent } from 'utils/analytics'

import copyIconButtonStyle from './copyIconButton.m.scss'

type Props = {|
  +i18n: I18nType,
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
        className={`__copy-icon-button ${copyIconButtonStyle.core}`}
        type='button'
      >
        <JIcon name='copy-use-fill' />
      </button>
    )
  }
}

const CopyIconButtonEnhanced = withI18n()(CopyIconButton)
export { CopyIconButtonEnhanced as CopyIconButton }
