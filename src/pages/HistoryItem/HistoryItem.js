// @flow strict

import React from 'react'

import { useI18n } from 'app/hooks'
import { JLink } from 'components/base'
import { HistoryItemDetails } from 'components'

import styles from './historyItem.m.scss'

type Props = {|
  +id: TransactionId,
|}

export function HistoryItem({ id }: Props) {
  const i18n = useI18n()

  return (
    <div className={styles.core}>
      <HistoryItemDetails id={id} isPage />
      <JLink
        href='/history'
        theme='button-general'
      >
        {i18n._(
          'HistoryItem.link',
          null,
          { defaults: 'Go to History' },
        )}
      </JLink>
    </div>
  )
}
