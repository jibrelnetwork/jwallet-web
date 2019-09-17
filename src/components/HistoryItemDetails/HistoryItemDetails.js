// @flow strict

import classNames from 'classnames'
import React, { Component } from 'react'
import { debounce } from 'lodash-es'
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
  checkStuck,
} from 'utils/transactions'

import styles from './historyItemDetails.m.scss'
import { Burn } from './components/Burn/Burn'
import { Mint } from './components/Mint/Mint'
// import { Stuck } from './components/Stuck/Stuck'
import { Cancel } from './components/Cancel/Cancel'
import { Failed } from './components/Failed/Failed'
import { Pending } from './components/Pending/Pending'
import { Incoming } from './components/Incoming/Incoming'
import { Outgoing } from './components/Outgoing/Outgoing'
import { ContractCall } from './components/ContractCall/ContractCall'
import { ContractCreation } from './components/ContractCreation/ContractCreation'

type OwnProps = {|
  +id: TransactionId,
  +asset?: AssetAddress,
  +blockNumber?: BlockNumber,
  +isPage?: boolean,
|}

type Props = {|
  ...OwnProps,
  +editNote: (id: TransactionId, note: string) => any,
  +fee: string,
  +to: ?Address,
  +hash: string,
  +note: ?string,
  +from: ?Address,
  +amount: ?string,
  +toName: ?string,
  +fromName: ?string,
  +amountStr: string,
  +assetName: ?string,
  +assetSymbol: ?string,
  +assetAddress: AssetAddress,
  +contractAddress: ?OwnerAddress,
  +eventType: TransactionEventType,
  +blockExplorerUISubdomain: BlockExplorerUISubdomain,
  +timestamp: number,
  +assetDecimals: number,
  +isSent: boolean,
  +isCancel: boolean,
  +hasInput: boolean,
  +isFailed: boolean,
  +isPending: boolean,
|}

export type CardProps = {|
  ...Props,
  onEditFinish: (note: string) => any,
|}

type StateProps = {|
  +note: ?string,
|}

const EDIT_NOTE_DELAY: number = 500

class HistoryItemDetails extends Component<Props, StateProps> {
  cardRef = React.createRef<HTMLDivElement>()

  constructor(props: Props) {
    super(props)

    this.state = {
      note: this.props.note,
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.id !== this.props.id) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ note: this.props.note })

      if (this.cardRef && this.cardRef.current) {
        this.cardRef.current.scrollIntoView({
          block: 'start',
          behavior: 'smooth',
        })
      }
    }
  }

  editNote = debounce(this.props.editNote, EDIT_NOTE_DELAY, {
    leading: false,
    trailing: true,
  })

  handleEditNote = (note: string) => {
    this.setState({ note })
    this.editNote(this.props.id, note)
  }

  getCardComponent = () => {
    const {
      to,
      from,
      eventType,
      assetSymbol,
      contractAddress,
      timestamp,
      isSent,
      hasInput,
      isCancel,
      isFailed,
      isPending,
    }: Props = this.props

    const isUnknownAsset: boolean = !assetSymbol
    const isMintable: boolean = (eventType === 2)
    const isEventBurn: boolean = (isMintable && !to)
    const isEventMint: boolean = (isMintable && !from)

    if (isFailed) {
      return Failed
    }

    if (isPending && checkStuck(timestamp)) {
      // return Stuck
    }

    if (isPending) {
      return Pending
    }

    if (isEventBurn) {
      return Burn
    }

    if (isEventMint) {
      return Mint
    }

    if (hasInput || isUnknownAsset) {
      return ContractCall
    }

    if (contractAddress) {
      return ContractCreation
    }

    if (isCancel) {
      return Cancel
    }

    return isSent ? Outgoing : Incoming
  }

  render() {
    const CardComponent = this.getCardComponent()

    return (
      <div
        ref={this.cardRef}
        className={classNames(styles.wrap, this.props.isPage && styles.page)}
      >
        <CardComponent
          {...this.props}
          onEditFinish={this.handleEditNote}
          note={this.state.note}
        />
      </div>
    )
  }
}

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

const HistoryItemDetailsEnhanced = connect<Props, OwnProps, _, _, _, _>(
  mapStateToProps,
  mapDispatchToProps,
)(HistoryItemDetails)

export { HistoryItemDetailsEnhanced as HistoryItemDetails }
