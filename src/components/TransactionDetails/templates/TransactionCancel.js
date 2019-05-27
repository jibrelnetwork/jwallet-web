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
import { getFormattedDateString } from 'utils/time'

import offset from 'styles/offsets.m.scss'

import { FieldPreview } from '../components'

import { type Props } from '../TransactionDetailsInternal'

import style from '../transactionDetails.m.scss'

const TRANSACTION_DESCRIPTION = {
  success: {
    statusDescription: t`Transfer canceled.`,
    iconName: 'trx-success-use-fill',
  },
  fail: {
    statusDescription: t`Transfer not canceled.`,
    iconName: 'trx-error-declined-use-fill',
  },
  stuck: {
    statusDescription: t`Cancel transfer stuck.`,
    iconName: 'trx-error-stuck-use-fill',
  },
  pending: {
    statusDescription: t`Cancel transfer. This may take some time.`,
    iconName: 'trx-pending-use-fill',
  },
}

export function TransactionCancelTemplate(props: Props) {
  if (!props.asset || !props.asset.blockchainParams) {
    return null
  }

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
            <JIcon name={TRANSACTION_DESCRIPTION[props.status].iconName} />
          </div>
          <div className={style.description}>
            <div className={style.status}>
              {props.status}
            </div>
            <div className={style.comment}>
              {TRANSACTION_DESCRIPTION[props.status].statusDescription}
            </div>
            <div className={style.date}>
              {formattedDate}
            </div>
          </div>
        </div>
        <FieldPreview
          label={t`Sender`}
          body={props.fromName}
        />
        <FieldPreview
          label={t`Blockchain transaction`}
          body={getShortenedAddress(props.txHash)}
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
          onChange={props.editNote(setNote, props.txHash)}
        />
      </div>
      {(props.status === 'stuck' || props.status === 'fail') && (
        <JLink
          theme='button-secondary'
          href={`/history/${props.txHash}/cancel`}
        >
          {t`Cancel`}
        </JLink>
      )}
    </div>
  )
}
