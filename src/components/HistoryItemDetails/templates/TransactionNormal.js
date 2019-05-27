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

type State = {
  note: string,
}

export class TransactionNormalTemplate extends PureComponent<Props, State> {
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
      asset,
      amount,
      blockExplorer,
      id,
      to,
      from,
      type,
      status,
    } = this.props

    // eslint-disable-next-line max-len
    const REPEAT_PAYMENT_URI = `/send?asset=${asset.blockchainParams.address}&to=${to}&amount=${amount}`

    const formattedDate = getFormattedDateString(
      new Date(this.props.timestamp),
      'hh:mm\u2007\u2022\u2007MM.DD.YYYY',
    )
    const extendedStatus = status === 'success'
      ? type
      : status

    return (
      <div className={classNames(style.core, this.props.className)}>
        <div className={classNames(style.card, offset.mb16)}>
          <div className={classNames(style.header, style[this.props.status])}>
            <div className={style.statusIcon}>
              <JIcon name={TRANSACTION_DESCRIPTION[extendedStatus].iconName} />
            </div>
            <div className={style.description}>
              <div className={style.status}>
                {this.props.status}
              </div>
              <div className={style.comment}>
                {TRANSACTION_DESCRIPTION[extendedStatus].statusDescription}
              </div>
              <div className={style.date}>
                {formattedDate}
              </div>
            </div>
          </div>
          <AssetItemPreview {...asset} />
          <FieldPreview
            label={t`Amount`}
            body={formatTransactionAmount(this.props)}
          />
          <FieldPreview
            label={t`Sender`}
            body={this.props.fromName}
            link={getAddressLink(from, blockExplorer)}
            contact={from}
            copy={from}
            copyMessage={ADDRESS_COPIED}
          />
          <FieldPreview
            label={t`Recipient`}
            body={this.props.toName}
            link={getAddressLink(this.props.to, this.props.blockExplorer)}
            copy={this.props.to}
            copyMessage={ADDRESS_COPIED}
          />
          <FieldPreview
            label={t`Blockchain transaction`}
            body={getShortenedAddress(this.props.id)}
            link={getTxLink(this.props.id, this.props.blockExplorer)}
            copy={this.props.id}
            copyMessage={TX_COPIED}
          />
          <FieldPreview
            label={t`Estimated blockchain fee`}
            body={`${this.props.fee} ETH`}
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
        {status === 'success' && (
          <JLink
            theme='button-secondary'
            href={REPEAT_PAYMENT_URI}
          >
            {t`Repeat Payment`}
          </JLink>
        )}
        {status === 'stuck' && (
          <>
            <JLink
              className={offset.mb8}
              theme='button-secondary'
              href={`/history/${id}/restart`}
            >
              {t`Restart`}
            </JLink>
            <JLink
              theme='button-secondary'
              href={`/history/${id}/cancel`}
            >
              {t`Cancel`}
            </JLink>
          </>
        )}
      </div>
    )
  }
}
