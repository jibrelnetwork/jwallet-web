// @flow strict

import React, { useState } from 'react'
import classNames from 'classnames'

import {
  debounce,
  memoize,
} from 'lodash-es'
import { t } from 'ttag'

import {
  JIcon,
  JInput,
  JLink,
} from 'components/base'
import { getShortenedAddress } from 'utils/address'
import {
  getTxLink,
  getAddressLink,
} from 'utils/transactions'
import { formatTransactionAmount } from 'utils/formatters'
import { getFormattedDateString } from 'utils/time'

import { type ContainerProps } from 'components/TransactionDetails/TransactionDetails'
import { type TransactionItem } from 'components/TransactionItemNew/transactionsIndex'

import offset from 'styles/offsets.m.scss'

import {
  AssetItemPreview,
  FieldPreview,
} from './components'

import style from './transactionDetails.m.scss'

export type Props =
  ContainerProps &
  TransactionItem & {
  editNote: () => mixed,
  blockExplorer: string,
  fromName: string,
  toName: string,
  statusDescription: string,
  iconName: string,
}

function handleEditNote(
  action: (CommentId, string) => mixed,
  hook: (string) => mixed,
  id: CommentId,
): (string) => void {
  const dispatchActionEditNote = debounce(action, 1000, {
    leading: false,
    trailing: true,
  })

  return (noteText: string) => {
    hook(noteText)
    dispatchActionEditNote(id, noteText)
  }
}

const memoizedHandler = memoize(handleEditNote)

function TransactionDetailsView(props: Props) {
  if (!props.asset || !props.asset.blockchainParams) {
    return null
  }

  // eslint-disable-next-line max-len
  const REPEAT_PAYMENT_URI = `/send?asset=${props.asset.blockchainParams.address}&to=${props.to}&amount=${props.amount}`

  const [note, setNote] = useState(props.note)

  const formattedDate = getFormattedDateString(
    new Date(props.timestamp),
    'hh:mm\u2007\u2022\u2007MM.DD.YYYY',
  )

  return (
    <div className={classNames(style.core, props.className)}>
      <div className={classNames(style.card, offset.mb16)}>
        <div className={classNames(style.header, style[props.status])}>
          <div className={style.statusIcon}>
            <JIcon name={props.iconName} />
          </div>
          <div className={style.description}>
            <div className={style.status}>
              {props.status}
            </div>
            <div className={style.comment}>
              {props.statusDescription}
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
      <div
        className={`${offset.mb16} ${style.noteWrapper}`}
      >
        <JInput
          label={t`Note`}
          infoMessage={t`This note is only visible to you.`}
          color='gray'
          value={note}
          onChange={memoizedHandler(props.editNote, setNote, props.txHash)}
        />
      </div>
      {props.status === 'success' && (
        <JLink
          theme='button-secondary'
          href={REPEAT_PAYMENT_URI}
        >
          {t`Repeat Payment`}
        </JLink>
      )}
      {props.status === 'stuck' && (
        <>
          <JLink
            className={offset.mb8}
            theme='button-secondary'
            href={`/history/${props.txHash}/restart`}
          >
            {t`Restart`}
          </JLink>
          <JLink
            theme='button-secondary'
            href={`/history/${props.txHash}/cancel`}
          >
            {t`Cancel`}
          </JLink>
        </>
      )}
    </div>
  )
}

TransactionDetailsView.defaultProps = {
  blockExplorer: '',
}

export const TransactionDetailsInternal =
  React.memo/* :: <Props> */(TransactionDetailsView)
