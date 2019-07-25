// @flow strict

import React, { PureComponent } from 'react'
import { withI18n } from '@lingui/react'
import { type I18n as I18nType } from '@lingui/core'

import { clipboard } from 'services'
import { JIcon } from 'components/base'

import copyIconButtonStyle from './copyIconButton.m.scss'

export type Props = {|
  +i18n: I18nType,
  +title: ?string,
  +content: string,
|}

class CopyIconButton extends PureComponent<Props> {
  static defaultProps = {
    title: null,
  }

  handleCopy = (address: Address) => () => {
    clipboard.copyText(address)
  }

  render() {
    const {
      i18n,
      title,
      content,
    }: Props = this.props

    return (
      <button
        onClick={this.handleCopy(this.props.content)}
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
