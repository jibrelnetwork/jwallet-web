// @flow strict

import React from 'react'
import classNames from 'classnames'

import { useI18n } from 'app/hooks'
import { JIcon } from 'components/base'
import { DateTimeFormat } from 'app/components'

import styles from '../../historyItemDetails.m.scss'
import { FeeField } from '../FeeField/FeeField'
import { NoteField } from '../NoteField/NoteField'
import { type CardProps } from '../../HistoryItemDetails'
import { AddressField } from '../AddressField/AddressField'
import { TransactionHashField } from '../TransactionHashField/TransactionHashField'

export function ContractCall(props: CardProps) {
  const {
    onEditFinish: handleEditNote,
    to,
    fee,
    from,
    hash,
    note,
    toName,
    fromName,
    blockExplorerUISubdomain,
    timestamp,
  }: CardProps = props

  const i18n = useI18n()

  return (
    <div className={styles.core}>
      <div className={styles.card}>
        <div className={classNames(styles.header, styles.success)}>
          <div className={styles.status}>
            <JIcon name='ic_trx_success_24-use-fill' />
          </div>
          <div className={styles.description}>
            <div className={styles.title}>
              {i18n._(
                'HistoryItemDetails.ContractCall.title',
                null,
                { defaults: 'Success' },
              )}
            </div>
            <div className={styles.subtitle}>
              {i18n._(
                'HistoryItemDetails.ContractCall.subtitle',
                null,
                { defaults: 'Contract Call processed.' },
              )}
            </div>
            <div className={styles.date}>
              <DateTimeFormat value={timestamp * 1000} />
            </div>
          </div>
        </div>
        {from && (
          <AddressField
            value={from}
            name={fromName}
            blockExplorerUISubdomain={blockExplorerUISubdomain}
            type='sender'
          />
        )}
        {to && (
          <AddressField
            value={to}
            name={toName}
            blockExplorerUISubdomain={blockExplorerUISubdomain}
            type='recipient'
          />
        )}
        <TransactionHashField
          value={hash}
          blockExplorerUISubdomain={blockExplorerUISubdomain}
        />
        <FeeField value={fee} />
      </div>
      <NoteField
        onChange={handleEditNote}
        value={note}
      />
    </div>
  )
}
