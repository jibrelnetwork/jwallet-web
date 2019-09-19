// @flow strict

import React from 'react'
import classNames from 'classnames'

import { useI18n } from 'app/hooks'
import { JIcon } from 'components/base'
import { DateTimeFormat } from 'app/components'

import styles from '../../historyItemDetails.m.scss'
import { FeeField } from '../FeeField/FeeField'
import { NoteField } from '../NoteField/NoteField'
import { AddressField } from '../AddressField/AddressField'
import { type CardProps } from '../../HistoryItemDetailsView'
import { TransactionHashField } from '../TransactionHashField/TransactionHashField'

export function Cancel(props: CardProps) {
  const {
    onEditFinish: handleEditNote,
    fee,
    from,
    hash,
    note,
    fromName,
    blockExplorerUISubdomain,
    timestamp,
    isPending,
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
                'HistoryItemDetails.Cancel.title',
                null,
                { defaults: 'Success' },
              )}
            </div>
            <div className={styles.subtitle}>
              {i18n._(
                'HistoryItemDetails.Cancel.subtitle.cancel',
                null,
                { defaults: 'Transfer canceled.' },
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
        <TransactionHashField
          value={hash}
          blockExplorerUISubdomain={blockExplorerUISubdomain}
        />
        <FeeField
          value={fee}
          isPending={isPending}
        />
      </div>
      <NoteField
        onChange={handleEditNote}
        value={note}
      />
    </div>
  )
}
