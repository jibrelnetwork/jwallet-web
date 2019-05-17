// @flow strict

import React from 'react'
import { TransactionDetails } from 'components/TransactionDetails/TransactionDetails'

type Props = {
  itemId: TransactionId,
}

export function HistoryItemView(props: Props) {
  return (
    <div>
      <TransactionDetails txHash={props.itemId} />
    </div>
  )
}
