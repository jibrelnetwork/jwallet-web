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

import {
  type TransactionItem,
  transactionsIndex,
} from 'components/TransactionItemNew/transactionsIndex'

import offset from 'styles/offsets.m.scss'

import { AssetItemPreview } from './AssetItemPreview/AssetItemPreview'

import style from './transactionDetails.m.scss'

type ContainerProps = {
  txHash: TransactionId,
}

type Props = TransactionItem & {
  className: string,
}

const memoizedIndex = memoize(transactionsIndex)

function TransactionDetailsInternal(props: Props) {
  const formattedDate = new Date(props.timestamp)

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
          body={props.amount}
        />
        <FieldPreview
          label={t`Sender`}
          body={props.from}
          link={`/contacts=${props.from}`}
          contact={props.from}
          copy={props.from}
        />
        <FieldPreview
          label={t`Recipient`}
          body={props.to}
          link={`/contacts=${props.to}`}
          copy={props.to}
        />
        <FieldPreview
          label={t`Blockchain transaction`}
          body={props.txHash}
          link={`/history/${props.txHash}`}
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
      />
    </div>
  )
}

function mapStateToProps(state: AppState, { txHash }: ContainerProps) {
  return { ...memoizedIndex(state)[txHash] }
}

export const TransactionDetails = (
  connect/* :: < AppState, any, ContainerProps, _, _> */(mapStateToProps)(
    React.memo/* :: <Props> */(TransactionDetailsInternal),
  )
)
