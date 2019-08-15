// @flow strict

import React from 'react'
import classNames from 'classnames'

import { useI18n } from 'app/hooks'
import { JIcon } from 'components/base'
import { DateTimeFormat } from 'app/components'

import styles from '../../historyItemDetails.m.scss'
import { NoteField } from '../NoteField/NoteField'
import { AmountField } from '../AmountField/AmountField'
import { type CardProps } from '../../HistoryItemDetails'
import { AssetItemPreview } from '../AssetItemPreview/AssetItemPreview'
import { TransactionHashField } from '../TransactionHashField/TransactionHashField'

export function Mint({
  onEditFinish: handleEditNote,
  hash,
  note,
  amount,
  amountStr,
  assetName,
  assetSymbol,
  assetAddress,
  blockExplorerUISubdomain,
  timestamp,
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
                'HistoryItemDetails.Mint.title',
                null,
                { defaults: 'Success' },
              )}
            </div>
            <div className={styles.subtitle}>
              {i18n._(
                'HistoryItemDetails.Mint.subtitle',
                null,
                { defaults: 'Tokens minted.' },
              )}
            </div>
            <div className={styles.date}>
              <DateTimeFormat value={timestamp * 1000} />
            </div>
          </div>
        </div>
        <AssetItemPreview
          name={assetName}
          symbol={assetSymbol}
          address={assetAddress}
        />
        {amount && <AmountField value={amountStr} />}
        <TransactionHashField
          value={hash}
          blockExplorerUISubdomain={blockExplorerUISubdomain}
        />
      </div>
      <NoteField
        onChange={handleEditNote}
        value={note}
      />
    </div>
  )
}
