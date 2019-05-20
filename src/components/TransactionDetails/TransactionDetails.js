// @flow strict

import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { memoize } from 'lodash-es'
import { t } from 'ttag'

import { FieldPreview } from 'components'
import {
  JIcon,
  JInputField,
} from 'components/base'
import { selectCurrentNetwork } from 'store/selectors/networks'
import { formatTransactionAmount } from 'utils/formatters/formatTransactionAmount'
import {
  getTxLink,
  getAddressLink,
} from 'utils/transactions'

import {
  type TransactionItem,
  transactionsIndex,
} from 'components/TransactionItemNew/transactionsIndex'

import offset from 'styles/offsets.m.scss'

import { AssetItemPreview } from './AssetItemPreview/AssetItemPreview'

import style from './transactionDetails.m.scss'

type ContainerProps = {
  className: string,
  txHash: TransactionId,
}

type Props = TransactionItem & ContainerProps & {
  blockExplorer: string,
}

const memoizedIndex = memoize(transactionsIndex)

function TransactionDetailsInternal(props: Props) {
  const formattedDate = new Date(props.timestamp)

  if (!props.asset || !props.asset.blockchainParams) {
    return null
  }

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
              {formattedDate.getTime()}
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
          body={props.from}
          link={getAddressLink(props.from, props.blockExplorer)}
          contact={props.from}
          copy={props.from}
        />
        <FieldPreview
          label={t`Recipient`}
          body={props.to}
          link={getAddressLink(props.to, props.blockExplorer)}
          copy={props.to}
        />
        <FieldPreview
          label={t`Blockchain transaction`}
          body={props.txHash}
          link={getTxLink(props.txHash, props.blockExplorer)}
          copy={props.txHash}
        />
        <FieldPreview
          label={t`Estimated blockchain fee`}
          body='-0.004 ETH'
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

function mapStateToProps(state: AppState, { txHash }: ContainerProps) {
  const { blockExplorerUISubdomain } = selectCurrentNetwork(state)

  return {
    ...memoizedIndex(state)[txHash],
    blockExplorer: blockExplorerUISubdomain,
  }
}

export const TransactionDetails = (
  connect/* :: < AppState, any, ContainerProps, _, _> */(mapStateToProps)(
    React.memo/* :: <Props> */(TransactionDetailsInternal),
  )
)
