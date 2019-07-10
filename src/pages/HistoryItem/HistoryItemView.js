// @flow strict

import React from 'react'
import { i18n } from 'i18n/lingui'
import { HistoryItemDetails } from 'components/HistoryItemDetails/HistoryItemDetails'
import { JLink } from 'components/base'

import offset from 'styles/offsets.m.scss'

import style from './historyItem.m.scss'

export type Props = {|
  itemId: TransactionId,
|}

export function HistoryItemView(props: Props) {
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
