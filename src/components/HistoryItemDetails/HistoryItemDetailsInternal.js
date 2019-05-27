// @flow strict

import React, { PureComponent } from 'react'
import { debounce } from 'lodash-es'
import { type TransactionItem } from 'components/TransactionItemNew/transactionsIndex'

import {
  TransactionCancelTemplate,
  TransactionNormalTemplate,
} from './templates'

import { type ContainerProps } from './HistoryItemDetails'

export type Props = {
  ...ContainerProps,
  ...TransactionItem,
  editNote: Function,
  blockExplorer: string,
  fromName: string,
  toName: string,
  statusDescription: string,
  iconName: string,
}

export class HistoryItemDetailsInternal extends PureComponent<Props> {
  static defaultProps = {
    blockExplorer: '',
  }

  debouncedHandlerOnEditNote = debounce(this.props.editNote, 1000, {
    leading: false,
    trailing: true,
  })

  render() {
    if (!this.props.asset || !this.props.asset.blockchainParams) {
      return null
    }

    return this.props.type !== 'cancel'
      ? <TransactionNormalTemplate {...this.props} editNote={this.debouncedHandlerOnEditNote} />
      : <TransactionCancelTemplate {...this.props} editNote={this.debouncedHandlerOnEditNote} />
  }
}
