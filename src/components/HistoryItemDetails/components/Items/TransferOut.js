// @flow strict

import React, { PureComponent } from 'react'
import classNames from 'classnames'
import { withI18n } from '@lingui/react'
import { type I18n as I18nType } from '@lingui/core'

import offset from 'styles/offsets.m.scss'
import { FieldPreview } from 'components'
import { getShortenedAddress } from 'utils/address'
import { getFormattedDateString } from 'utils/time'
import { formatTransactionAmount } from 'utils/formatters'
import { AssetItemPreview } from 'components/HistoryItemDetails/components/index'
import { type Props as MasterProps } from 'components/HistoryItemDetails/HistoryItemDetailsInternal'

import {
  JIcon,
  JInput,
  JLink,
} from 'components/base'

import {
  getTxLink,
  getAddressLink,
} from 'utils/transactions'

import {
  TRANSFER_OUT_TYPE,
  type TransferOut as TransferOutRecord,
} from 'store/utils/HistoryItem/types'

import style from 'components/HistoryItemDetails/historyItemDetails.m.scss'

type Props = {|
  ...TransferOutRecord,
  ...MasterProps,
  type: typeof TRANSFER_OUT_TYPE,
  +i18n: I18nType,
|}

type State = {
  note: string,
}

class TransferOut extends PureComponent<Props, State> {
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
      amount,
      blockExplorer,
      id,
      to,
      from,
      status,
      i18n,
    } = this.props

    const ADDRESS_COPIED = i18n._(
      'HistoryItem.TransactionNormal.addressCopied',
      null,
      { defaults: 'Address copied.' },
    )
    const TX_COPIED = i18n._(
      'HistoryItem.TransactionNormal.hashCopied',
      null,
      { defaults: 'Blockchain transaction copied.' },
    )
    const TRANSACTION_DESCRIPTION = {
      in: {
        statusDescription: i18n._(
          'HistoryItem.TransactionNormal.statusInSuccess',
          null,
          { defaults: 'Transfer processed.' },
        ),
        iconName: 'trx-in-use-fill',
      },
      out: {
        statusDescription: i18n._(
          'HistoryItem.TransactionNormal.statusOutSuccess',
          null,
          { defaults: 'Transfer processed.' },
        ),
        iconName: 'trx-out-use-fill',
      },
      fail: {
        statusDescription: i18n._(
          'HistoryItem.TransactionNormal.statusFailed',
          null,
          { defaults: 'Transfer declined.' },
        ),
        iconName: 'trx-error-declined-use-fill',
      },
      stuck: {
        statusDescription: i18n._(
          'HistoryItem.TransactionNormal.statusStucke',
          null,
          { defaults: 'Transfer stuck.' },
        ),
        iconName: 'trx-error-stuck-use-fill',
      },
      pending: {
        statusDescription: i18n._(
          'HistoryItem.TransactionNormal.statusPending',
          null,
          { defaults: 'Transfer is being processed. This may take some time.' },
        ),
        iconName: 'trx-pending-use-fill',
      },
      success: {
        statusDescription: i18n._(
          'HistoryItem.TransactionOut.statusPending',
          null,
          { defaults: 'Transfer processed.' },
        ),
        iconName: 'trx-in-use-fill',
      },
      cancel: {
        statusDescription: i18n._(
          'HistoryItem.TransactionOut.statusCancel',
          null,
          { defaults: 'Transfer declined.' },
        ),
        iconName: 'trx-error-declined-use-fill',
      },
    }

    // eslint-disable-next-line max-len
    const REPEAT_PAYMENT_URI = `/send?asset=${asset.blockchainParams.address}&to=${to}&amount=${amount}`

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
            label={i18n._(
              'HistoryItem.TransactionNormal.amount',
              null,
              { defaults: 'Amount' },
            )}
            body={formatTransactionAmount(this.props)}
          />
          <FieldPreview
            label={i18n._(
              'HistoryItem.TransactionNormal.sender',
              null,
              { defaults: 'Sender' },
            )}
            body={this.props.fromName}
            link={getAddressLink(from, blockExplorer)}
            copy={from}
            copyMessage={ADDRESS_COPIED}
          />
          <FieldPreview
            label={i18n._(
              'HistoryItem.TransactionNormal.recipient',
              null,
              { defaults: 'Recipient' },
            )}
            body={this.props.toName}
            link={getAddressLink(this.props.to, this.props.blockExplorer)}
            contact={to}
            copy={this.props.to}
            copyMessage={ADDRESS_COPIED}
          />
          <FieldPreview
            label={i18n._(
              'HistoryItem.TransactionNormal.hash',
              null,
              { defaults: 'Blockchain transaction' },
            )}
            body={getShortenedAddress(this.props.hash)}
            link={getTxLink(this.props.hash, this.props.blockExplorer)}
            copy={this.props.hash}
            copyMessage={TX_COPIED}
          />
          <FieldPreview
            label={i18n._(
              'HistoryItem.TransactionNormal.fee',
              null,
              { defaults: 'Estimated blockchain fee' },
            )}
            body={`${this.props.fee} ETH`}
          />
        </div>
        <JInput
          label={i18n._(
            'HistoryItem.TransactionNormal.note',
            null,
            { defaults: 'Note' },
          )}
          infoMessage={i18n._(
            'HistoryItem.TransactionNormal.noteDescription',
            null,
            { defaults: 'This note is only visible to you.' },
          )}
          color='gray'
          value={this.state.note}
          onChange={this.handleEditNote}
        />
        {status === 'success' && (
          <JLink
            theme='button-secondary'
            href={REPEAT_PAYMENT_URI}
          >
            {i18n._(
              'HistoryItem.TransactionNormal.repeat',
              null,
              { defaults: 'Repeat Payment' },
            )}
          </JLink>
        )}
        {status === 'stuck' && (
          <>
            <JLink
              className={offset.mb8}
              theme='button-secondary'
              href={`/history/${id}/restart`}
            >
              {i18n._(
                'HistoryItem.TransactionNormal.restart',
                null,
                { defaults: 'Restart' },
              )}
            </JLink>
            <JLink
              theme='button-secondary'
              href={`/history/${id}/cancel`}
            >
              {i18n._(
                'HistoryItem.TransactionNormal.cancel',
                null,
                { defaults: 'Cancel' },
              )}
            </JLink>
          </>
        )}
      </div>
    )
  }
}

const TransferOutEnhanced = withI18n()(TransferOut)
export { TransferOutEnhanced as TransferOut }
