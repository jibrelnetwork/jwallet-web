// @flow strict

import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { memoize } from 'lodash-es'
import { t } from 'ttag'

import {
  JIcon,
  JInputField,
} from 'components/base'
import { selectFavorites } from 'store/selectors/favorites'
import { selectAddressWalletsNames } from 'store/selectors/wallets'
import { selectCurrentNetworkOrThrow } from 'store/selectors/networks'
import { getFormattedDateString } from 'utils/time'
import { getShortenedAddress } from 'utils/address'
import {
  getTxLink,
  getAddressLink,
} from 'utils/transactions'
import { formatTransactionAmount } from 'utils/formatters/formatTransactionAmount'

import {
  type TransactionItem,
  transactionsIndex,
} from 'components/TransactionItemNew/transactionsIndex'

import offset from 'styles/offsets.m.scss'

import {
  AssetItemPreview,
  FieldPreview,
} from './components'

import style from './transactionDetails.m.scss'

type ContainerProps = {
  className: string,
  txHash: TransactionId,
}

type Props = TransactionItem & ContainerProps & {
  blockExplorer: string,
  fromName: string,
  toName: string,
}

const memoizedIndex = memoize(transactionsIndex)

function TransactionDetailsInternal(props: Props) {
  if (!props.asset || !props.asset.blockchainParams) {
    return null
  }

  const formattedDate = getFormattedDateString(
    new Date(props.timestamp),
    'hh:mm\u2007\u2022\u2007MM.DD.YYYY',
  )

  return (
    <div className={classNames(style.core, props.className)}>
      <div className={classNames(style.card, offset.mb16)}>
        <div className={classNames(style.header)}>
          <div className={style.statusIcon}>
            <JIcon name='clock-use-fill' />
          </div>
          <div className={style.description}>
            <div className={style.status}>
              {props.status}
            </div>
            <div className={style.comment}>
              {props.status}
            </div>
            <div className={style.date}>
              {formattedDate}
            </div>
          </div>
        </div>
        <AssetItemPreview {...props.asset} />
        <FieldPreview
          label={t`Amount`}
          body={formatTransactionAmount(props)}
        />
        <FieldPreview
          label={t`Sender`}
          body={props.fromName}
          link={getAddressLink(props.from, props.blockExplorer)}
          contact={props.from}
          copy={props.from}
        />
        <FieldPreview
          label={t`Recipient`}
          body={props.toName}
          link={getAddressLink(props.to, props.blockExplorer)}
          copy={props.to}
        />
        <FieldPreview
          label={t`Blockchain transaction`}
          body={getShortenedAddress(props.txHash)}
          link={getTxLink(props.txHash, props.blockExplorer)}
          copy={props.txHash}
        />
        <FieldPreview
          label={t`Estimated blockchain fee`}
          body={`${props.fee} ETH`}
        />
      </div>
      <JInputField
        label={t`Note`}
        infoMessage={t`This note is only visible to you.`}
        value={props.note}
      />
      {/* Buttons */}
    </div>
  )
}

TransactionDetailsInternal.defaultProps = {
  blockExplorer: '',
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

  return {
    ...transactionRecord,
    fromName: getPrimaryName(state, transactionRecord.from),
    toName: getPrimaryName(state, transactionRecord.to),
    blockExplorer: blockExplorerUISubdomain,
  }
}

export const TransactionDetails = (
  connect/* :: < AppState, any, ContainerProps, _, _> */(mapStateToProps)(
    React.memo/* :: <Props> */(TransactionDetailsInternal),
  )
)
