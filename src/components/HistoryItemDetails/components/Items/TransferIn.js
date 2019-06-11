// @flow strict

import React, { PureComponent } from 'react'
import classNames from 'classnames'
import { t } from 'ttag'

import {
  JIcon,
  JInput,
} from 'components/base'
import { getShortenedAddress } from 'utils/address'
import {
  getTxLink,
  getAddressLink,
} from 'utils/transactions'
import { formatTransactionAmount } from 'utils/formatters'
import { getFormattedDateString } from 'utils/time'

import {
  TRANSFER_IN_TYPE,
  type TransactionState,
  type TransferIn as TransferInRecord,
} from 'store/utils/HistoryItem/types'

import offset from 'styles/offsets.m.scss'

import {
  AssetItemPreview,
  FieldPreview,
} from 'components/HistoryItemDetails/components/index'

import { type Props as MasterProps } from 'components/HistoryItemDetails/HistoryItemDetailsInternal'

import style from 'components/HistoryItemDetails/historyItemDetails.m.scss'

const ADDRESS_COPIED = t`Address copied.`
const TX_COPIED = t`Blockchain transaction copied.`
const TRANSACTION_DESCRIPTION: {
  [TransactionState]: { statusDescription: string, iconName: string },
} = {
  success: {
    statusDescription: t`Transfer processed.`,
    iconName: 'trx-in-use-fill',
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
}

type Props = {|
  ...TransferInRecord,
  ...MasterProps,
  +type: typeof TRANSFER_IN_TYPE,
|}

type State = {
  note: string,
}

export class TransferIn extends PureComponent<Props, State> {
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
      asset,
      blockExplorer,
      from,
      status,
    } = this.props

    const formattedDate = getFormattedDateString(
      new Date(this.props.timestamp),
      'hh:mm\u2007\u2022\u2007MM.DD.YYYY',
    )

    return (
      <div className={classNames(style.core, className)}>
        <div className={classNames(style.card, offset.mb16)}>
          <div className={classNames(style.header, style[this.props.status])}>
            <div className={style.statusIcon}>
              <JIcon name={TRANSACTION_DESCRIPTION[status].iconName} />
            </div>
            <div className={style.description}>
              <div className={style.status}>
                {this.props.status}
              </div>
              <div className={style.comment}>
                {TRANSACTION_DESCRIPTION[status].statusDescription}
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
            body={getShortenedAddress(this.props.hash)}
            link={getTxLink(this.props.hash, this.props.blockExplorer)}
            copy={this.props.hash}
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
      </div>
    )
  }
}
