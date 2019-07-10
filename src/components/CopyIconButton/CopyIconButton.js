// @flow strict

import React, { PureComponent } from 'react'
import { i18n } from 'i18n/lingui'

import { clipboard } from 'services'
import { JIcon } from 'components/base'

import copyIconButtonStyle from './copyIconButton.m.scss'

export type Props = {|
  +title: string,
  +content: string,
|}

export class CopyIconButton extends PureComponent<Props> {
  static defaultProps = {
    title: '',
  }

  handleCopy = (address: Address) => () => {
    clipboard.copyText(address)
  }

  render() {
    const {
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
