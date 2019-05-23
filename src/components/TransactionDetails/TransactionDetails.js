// @flow strict

import { connect } from 'react-redux'
import {
  memoize,
} from 'lodash-es'

import {
  edit,
} from 'store/modules/comments'
import { selectFavorites } from 'store/selectors/favorites'
import { selectAddressWalletsNames } from 'store/selectors/wallets'
import { selectCurrentNetworkOrThrow } from 'store/selectors/networks'
import { getShortenedAddress } from 'utils/address'

import {
  transactionsIndex,
} from 'components/TransactionItemNew/transactionsIndex'

import { TransactionDetailsInternal } from './TransactionDetailsInternal'

import { getTransactionDetailsConfig } from './getTransactionDetailsConfig'

export type ContainerProps = {
  txHash: TransactionId,
  className: string,
}

const memoizedIndex = memoize(transactionsIndex)

const mapDispatchToProps = {
  editNote: edit,
}

function getPrimaryName(
  state: AppState,
  address: OwnerAddress,
): string {
  const favorites = selectFavorites(state)
  const addressNames = selectAddressWalletsNames(state)

  return favorites[address]
    || addressNames[address]
    || getShortenedAddress(address)
}

function mapStateToProps(state: AppState, { txHash }: ContainerProps) {
  const { blockExplorerUISubdomain } = selectCurrentNetworkOrThrow(state)
  const transactionRecord = memoizedIndex(state)[txHash]

  return getTransactionDetailsConfig({
    ...transactionRecord,
    fromName: getPrimaryName(state, transactionRecord.from),
    toName: getPrimaryName(state, transactionRecord.to),
    blockExplorer: blockExplorerUISubdomain,
  })
}

export const TransactionDetails = (
  connect/* :: < AppState, any, ContainerProps, _, _> */(mapStateToProps, mapDispatchToProps)(
    (TransactionDetailsInternal),
  )
)
