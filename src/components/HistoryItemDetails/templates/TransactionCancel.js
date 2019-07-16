// @flow strict

import React, { PureComponent } from 'react'
import classNames from 'classnames'
import { withI18n } from '@lingui/react'

import {
  JIcon,
  JInput,
  JLink,
} from 'components/base'
import { FieldPreview } from 'components'
import { getShortenedAddress } from 'utils/address'
import { getFormattedDateString } from 'utils/time'

import offset from 'styles/offsets.m.scss'

import { type Props } from '../HistoryItemDetailsInternal'

import style from '../historyItemDetails.m.scss'

type State = {
  note: string,
}

class TransactionCancelTemplateComponent extends PureComponent<Props, State> {
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
      hash,
      fee,
      fromName,
      id,
      timestamp,
      status,
      i18n,
    } = this.props

    const TRANSACTION_DESCRIPTION = {
      success: {
        statusDescription: i18n._(
          'HistoryItem.TransactionCancel.statusSuccess',
          null,
          { defaults: 'Transfer canceled.' },
        ),
        iconName: 'trx-success-use-fill',
      },
      fail: {
        statusDescription: i18n._(
          'HistoryItem.TransactionCancel.statusFailed',
          null,
          { defaults: 'Transfer not canceled.' },
        ),
        iconName: 'trx-error-declined-use-fill',
      },
      stuck: {
        statusDescription: i18n._(
          'HistoryItem.TransactionCancel.statusStuck',
          null,
          { defaults: 'Cancel transfer stuck.' },
        ),
        iconName: 'trx-error-stuck-use-fill',
      },
      pending: {
        statusDescription: i18n._(
          'HistoryItem.TransactionCancel.statusPending',
          null,
          { defaults: 'Cancel transfer. This may take some time.' },
        ),
        iconName: 'trx-pending-use-fill',
      },
    }

    const formattedDate = getFormattedDateString(
      new Date(timestamp),
      'hh:mm\u2007\u2022\u2007MM.DD.YYYY',
    )

    return (
      <div className={style.core}>
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
            label={i18n._(
              'HistoryItem.TransactionCancel.sender',
              null,
              { defaults: 'Sender' },
            )}
            body={fromName}
          />
          <FieldPreview
            label={i18n._(
              'HistoryItem.TransactionCancel.hash',
              null,
              { defaults: 'Blockchain transaction' },
            )}
            body={getShortenedAddress(hash)}
          />
          <FieldPreview
            label={i18n._(
              'HistoryItem.TransactionCancel.fee',
              null,
              { defaults: 'Estimated blockchain fee' },
            )}
            body={`${fee} ETH`}
          />
        </div>
        <div
          className={`${offset.mb16} ${style.noteWrapper}`}
        >
          <JInput
            label={i18n._(
              'HistoryItem.TransactionCancel.note',
              null,
              { defaults: 'Note' },
            )}
            infoMessage={i18n._(
              'HistoryItem.TransactionCancel.noteDescription',
              null,
              { defaults: 'This note is only visible to you.' },
            )}
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
            {i18n._(
              'HistoryItem.TransactionCancel.cancel',
              null,
              { defaults: 'Cancel' },
            )}
          </JLink>
        )}
      </div>
    )
  }
}

export const TransactionCancelTemplate = withI18n()(
  TransactionCancelTemplateComponent,
)
