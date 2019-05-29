// @flow strict

import { connect } from 'react-redux'

import { edit } from 'store/modules/comments'
import { selectFavorites } from 'store/selectors/favorites'
import { selectAddressWalletsNames } from 'store/selectors/wallets'
import { selectCurrentNetworkOrThrow } from 'store/selectors/networks'
import { getShortenedAddress } from 'utils/address'

import { PageNotFoundError } from 'errors'
import { MEMO } from 'store/transactionsIndex'

import {
  type Props,
  HistoryItemDetailsInternal,
} from 'components/HistoryItemDetails/HistoryItemDetailsInternal'

export type ContainerProps = {
  txHash: TransactionId,
  className: ?string,
}

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
  const transactionRecord = MEMO.transactionsIndex[txHash]

  if (!transactionRecord) {
    throw new PageNotFoundError()
  }

  return {
    ...transactionRecord,
    fromName: getPrimaryName(state, transactionRecord.from),
    toName: getPrimaryName(state, transactionRecord.to),
    blockExplorer: blockExplorerUISubdomain,
  }
}

export const HistoryItemDetails = (
  connect< Props, ContainerProps, _, _, _, _ >(mapStateToProps, mapDispatchToProps)(
    (HistoryItemDetailsInternal),
  )
)
