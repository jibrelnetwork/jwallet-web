// @flow strict

import React from 'react'
import { useI18n } from 'app/hooks'
import { HistoryItemDetails } from 'components/HistoryItemDetails/HistoryItemDetails'
import { JLink } from 'components/base'

import offset from 'styles/offsets.m.scss'

import style from './historyItem.m.scss'

export type Props = {|
  itemId: TransactionId,
|}

export function HistoryItemView(props: Props) {
  const i18n = useI18n()

  return (
    <div className={style.core}>
      <HistoryItemDetails className={offset.mb32} txHash={props.itemId} />
      <JLink
        theme='button-general'
        href='/history'
      >
        {i18n._(
          'HistoryItem.goToHistory',
          null,
          { defaults: 'Go to History' },
        )}
      </JLink>
    </div>
  )
}
