// @flow strict

import React from 'react'
import { t } from 'ttag'
import { TransactionDetails } from 'components/TransactionDetails/TransactionDetails'
import { JLink } from 'components/base'

import offset from 'styles/offsets.m.scss'

import style from './historyItem.m.scss'

type Props = {
  itemId: TransactionId,
}

export function HistoryItemView(props: Props) {
  return (
    <div className={style.core}>
      <TransactionDetails className={offset.mb32} txHash={props.itemId} />
      <JLink href='/history'>{t`Go to History`}</JLink>
    </div>
  )
}
