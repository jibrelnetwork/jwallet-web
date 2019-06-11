// @flow strict

import React, { PureComponent } from 'react'
import {
  debounce,
  noop,
} from 'lodash-es'

import {
  TRANSFER_IN_TYPE,
  TRANSFER_OUT_TYPE,
  TRANSFER_CANCEL_TYPE,
  type HistoryItemsTypes,
  type HistoryItem,
} from 'store/utils/HistoryItem/types'

import {
  TransferIn,
  TransferOut,
  TransferCancel,
} from './templates'

import { type ContainerProps } from './HistoryItemDetails'

export type Props = {|
  ...HistoryItem,
  ...ContainerProps,
  editNote: Function,
  asset: DigitalAsset,
  blockExplorer: string,
  fromName: string,
  toName: string,
  statusDescription: string,
  iconName: string,
|}

const viewTypeMap: { [HistoryItemsTypes]: Function } = {
  [TRANSFER_IN_TYPE]: TransferIn,
  [TRANSFER_OUT_TYPE]: TransferOut,
  [TRANSFER_CANCEL_TYPE]: TransferCancel,
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
    const extendedProps = {
      ...this.props,
      editNote: this.debouncedHandlerOnEditNote,
      key: this.props.id,
    }
    const Component = viewTypeMap[extendedProps.type] || noop

    return <Component {...extendedProps} />
  }
}
