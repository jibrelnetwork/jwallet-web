// @flow strict

import React from 'react'
import { memoize } from 'lodash-es'
import { type TransactionItem } from 'components/TransactionItemNew/transactionsIndex'

import {
  TransactionCancelTemplate,
  TransactionNormalTemplate,
} from './templates'

import { handleEditNote } from './utils'

import { type ContainerProps } from './TransactionDetails'

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

const memoizedEditNote = memoize(handleEditNote)

function TransactionDetailsView(props: Props) {
  if (!props.asset || !props.asset.blockchainParams) {
    return null
  }

  const newProps: Props = {
    ...props,
    // eslint-disable-next-line fp/no-rest-parameters
    editNote: (...args) => memoizedEditNote(props.editNote, ...args),
  }

  return props.type !== 'cancel'
    ? <TransactionNormalTemplate {...newProps} />
    : <TransactionCancelTemplate {...newProps} />
}

TransactionDetailsView.defaultProps = {
  blockExplorer: '',
}

export const TransactionDetailsInternal =
  React.memo<Props>(TransactionDetailsView)
