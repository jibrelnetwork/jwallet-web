// @flow strict

import React from 'react'
import classNames from 'classnames'

import { useI18n } from 'app/hooks'
import { JIcon } from 'components/base'
import { DateTimeFormat } from 'app/components'

import styles from '../../historyItemDetails.m.scss'
import { FeeField } from '../FeeField/FeeField'
import { NoteField } from '../NoteField/NoteField'
import { AmountField } from '../AmountField/AmountField'
import { type CardProps } from '../../HistoryItemDetails'
import { AddressField } from '../AddressField/AddressField'
import { TransactionHashField } from '../TransactionHashField/TransactionHashField'

export function ContractCreation({
  onEditFinish: handleEditNote,
  fee,
  hash,
  note,
  amount,
  contractAddress,
  blockExplorerUISubdomain,
  timestamp,
  isPending,
}: CardProps) {
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
                'HistoryItemDetails.ContractCreation.title',
                null,
                { defaults: 'Success' },
              )}
            </div>
            <div className={styles.subtitle}>
              {i18n._(
                'HistoryItemDetails.ContractCreation.subtitle',
                null,
                { defaults: 'Contract created.' },
              )}
            </div>
            <div className={styles.date}>
              <DateTimeFormat value={timestamp * 1000} />
            </div>
          </div>
        </div>
        {amount && <AmountField value={amount} />}
        {contractAddress && (
          <AddressField
            value={contractAddress}
            blockExplorerUISubdomain={blockExplorerUISubdomain}
            type='contract'
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
