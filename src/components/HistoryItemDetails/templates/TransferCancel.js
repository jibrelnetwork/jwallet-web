// @flow strict

import React, { PureComponent } from 'react'
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

import {
  type TransactionState,
  type TransferCancel as TransferCancelRecord,
} from 'store/utils/HistoryItem/types'

import { FieldPreview } from '../components'

import { type Props as MasterProps } from '../HistoryItemDetailsInternal'

import style from '../historyItemDetails.m.scss'

const TRANSACTION_DESCRIPTION: {
  [TransactionState]: {
    statusDescription: string,
    iconName: string,
  },
} = {
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

type Props = {|
  ...TransferCancelRecord,
  ...MasterProps,
|}

type State = {
  note: string,
}

export class TransferCancel extends PureComponent<Props, State> {
  state = {
    note: this.props.note || '',
  }

  handleEditNote = (note: string) => {
    this.setState({ note })
    this.props.editNote(this.props.id, note)
  }

  render() {
    if (!this.props.asset || !this.props.asset.blockchainParams) {
      return null
    }

    const {
      className,
      hash,
      fee,
      fromName,
      id,
      timestamp,
      status,
    } = this.props

    const formattedDate = getFormattedDateString(
      new Date(timestamp),
      'hh:mm\u2007\u2022\u2007MM.DD.YYYY',
    )

    return (
      <div className={classNames(style.core, className)}>
        <div className={classNames(style.card, offset.mb16)}>
          <div className={classNames(style.header, style[status])}>
            <div className={style.statusIcon}>
              <JIcon name={TRANSACTION_DESCRIPTION[status].iconName} />
            </div>
            <div className={style.description}>
              <div className={style.status}>
                {status}
              </div>
              <div className={style.comment}>
                {TRANSACTION_DESCRIPTION[status].statusDescription}
              </div>
              <div className={style.date}>
                {formattedDate}
              </div>
            </div>
          </div>
          <FieldPreview
            label={t`Sender`}
            body={fromName}
          />
          <FieldPreview
            label={t`Blockchain transaction`}
            body={getShortenedAddress(hash)}
          />
          <FieldPreview
            label={t`Estimated blockchain fee`}
            body={`${fee} ETH`}
          />
        </div>
        <div
          className={`${offset.mb16} ${style.noteWrapper}`}
        >
          <JInput
            label={t`Note`}
            infoMessage={t`This note is only visible to you.`}
            color='gray'
            value={this.state.note}
            onChange={this.handleEditNote}
          />
        </div>
        {(status === 'stuck' || status === 'fail') && (
          <JLink
            theme='button-secondary'
            href={`/history/${id}/cancel`}
          >
            {t`Cancel`}
          </JLink>
        )}
      </div>
    )
  }
}
