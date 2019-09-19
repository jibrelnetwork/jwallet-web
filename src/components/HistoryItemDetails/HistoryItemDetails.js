// @flow strict

import { connect } from 'react-redux'

import config from 'config'
import { PageNotFoundError } from 'errors'
import { toBigNumber } from 'utils/numbers'
import { formatAssetBalance } from 'utils/formatters'
import { edit as editNote } from 'store/modules/comments'
import { selectCommentsItems } from 'store/selectors/comments'
import { selectAllAddressNames } from 'store/selectors/favorites'
import { selectDigitalAsset } from 'store/selectors/digitalAssets'
import { selectActiveWalletAddress } from 'store/selectors/wallets'
import { selectCurrentNetworkOrThrow } from 'store/selectors/networks'

import {
  selectTransactionById,
  selectTransactionByHash,
  selectPendingTransactionByHash,
} from 'store/selectors/transactions'

import {
  getNote,
  getTxFee,
} from 'utils/transactions'

import {
  HistoryItemDetailsView,
  type Props,
} from './HistoryItemDetailsView'

export type OwnProps = {|
  +id: TransactionId,
  +asset?: AssetAddress,
  +blockNumber?: BlockNumber,
  +isPage?: boolean,
|}

function mapStateToProps(
  state: AppState,
  {
    id,
    asset,
    blockNumber,
  }: OwnProps,
) {
  const item: ?TransactionWithPrimaryKeys = selectTransactionById(
    state,
    id,
    asset,
    blockNumber,
  ) || selectPendingTransactionByHash(
    state,
    id,
    asset,
  ) || selectTransactionByHash(
    state,
    id,
    asset,
  )

  if (!item) {
    throw new PageNotFoundError()
  }

  const {
    keys: {
      assetAddress,
    },
    data,
    blockData,
    receiptData,
    to,
    from,
    hash,
    amount,
    blockHash,
    eventType,
    contractAddress,
    isRemoved,
  }: TransactionWithPrimaryKeys = item

  if (!(data && blockData && receiptData)) {
    throw new PageNotFoundError()
  }

  const notes: Comments = selectCommentsItems(state)
  const network: Network = selectCurrentNetworkOrThrow(state)
  const ownerAddress: OwnerAddress = selectActiveWalletAddress(state)

  const digitalAsset: ?DigitalAsset = selectDigitalAsset(
    state,
    assetAddress,
  )

  const addressNames: AddressNames = selectAllAddressNames(
    state,
    true,
  )

  const { timestamp }: TransactionBlockData = blockData
  const isZeroAmount: boolean = toBigNumber(amount).isZero()
  const isSent: boolean = !!from && (ownerAddress.toLowerCase() === from.toLowerCase())

  const {
    blockchainParams,
    name: assetName,
    symbol: assetSymbol,
  } = digitalAsset || {}

  const assetDecimals: number = blockchainParams ? blockchainParams.decimals : 18

  const amountStr: ?string = (isZeroAmount || !assetSymbol) ? null : formatAssetBalance(
    assetAddress,
    amount,
    assetDecimals,
    assetSymbol,
  )

  return {
    to,
    from,
    hash,
    amount,
    eventType,
    assetName,
    assetSymbol,
    assetAddress,
    contractAddress,
    toName: to && addressNames[to],
    fromName: from && addressNames[from],
    blockExplorerUISubdomain: network.blockExplorerUISubdomain,
    amountStr: amountStr && `${isSent ? '−' : '+'}\u00A0${amountStr}`,
    fee: getTxFee(
      receiptData.gasUsed,
      data.gasPrice,
    ),
    note: getNote(
      notes,
      id,
      hash,
    ),
    timestamp,
    assetDecimals,
    isPending: !blockHash,
    hasInput: data.hasInput,
    isCancel: (to === config.cancelAddress),
    isFailed: !receiptData.status || isRemoved,
    isSent: !!from && (ownerAddress.toLowerCase() === from.toLowerCase()),
  }
}

const mapDispatchToProps = {
  editNote,
}

export const HistoryItemDetails = connect<Props, OwnProps, _, _, _, _>(
  mapStateToProps,
  mapDispatchToProps,
)(HistoryItemDetailsView)
