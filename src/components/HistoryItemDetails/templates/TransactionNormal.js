// @flow strict

import React, { useState } from 'react'
import classNames from 'classnames'
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

import offset from 'styles/offsets.m.scss'

import {
  AssetItemPreview,
  FieldPreview,
} from '../components'

import { type Props } from '../HistoryItemDetailsInternal'

import style from '../historyItemDetails.m.scss'

const ADDRESS_COPIED = t`Address copied.`
const TX_COPIED = t`Blockchain transaction copied.`
const TRANSACTION_DESCRIPTION = {
  in: {
    statusDescription: t`Transfer processed.`,
    iconName: 'trx-in-use-fill',
  },
  out: {
    statusDescription: t`Transfer processed.`,
    iconName: 'trx-out-use-fill',
  },
  fail: {
    statusDescription: t`Transfer declined.`,
    iconName: 'trx-error-declined-use-fill',
  },
  stuck: {
    statusDescription: t`Transfer stuck.`,
    iconName: 'trx-error-stuck-use-fill',
  },
  pending: {
    statusDescription: t`Transfer is being processed. This may take some time.`,
    iconName: 'trx-pending-use-fill',
  },
  cancel: {},
  success: {},
}

export function TransactionNormalTemplate(props: Props) {
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
  const status = props.status === 'success'
    ? props.type
    : props.status

  return (
    <div className={classNames(style.core, props.className)}>
      <div className={classNames(style.card, offset.mb16)}>
        <div className={classNames(style.header, style[props.status])}>
          <div className={style.statusIcon}>
            <JIcon name={TRANSACTION_DESCRIPTION[status].iconName} />
          </div>
          <div className={style.description}>
            <div className={style.status}>
              {props.status}
            </div>
            <div className={style.comment}>
              {TRANSACTION_DESCRIPTION[status].statusDescription}
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
          copyMessage={ADDRESS_COPIED}
        />
        <FieldPreview
          label={t`Recipient`}
          body={props.toName}
          link={getAddressLink(props.to, props.blockExplorer)}
          copy={props.to}
          copyMessage={ADDRESS_COPIED}
        />
        <FieldPreview
          label={t`Blockchain transaction`}
          body={getShortenedAddress(props.id)}
          link={getTxLink(props.id, props.blockExplorer)}
          copy={props.id}
          copyMessage={TX_COPIED}
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
          onChange={props.editNote(setNote, props.id)}
        />
      </div>
      {props.status === 'success' && props.type === 'out' && (
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
            href={`/history/${props.id}/restart`}
          >
            {t`Restart`}
          </JLink>
          <JLink
            theme='button-secondary'
            href={`/history/${props.id}/cancel`}
          >
            {t`Cancel`}
          </JLink>
        </>
      )}
    </div>
  )
}
