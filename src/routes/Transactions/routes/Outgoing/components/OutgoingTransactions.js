// @flow

import React from 'react'

import getTransactionsEmptyEvent from 'utils/getTransactionsEmptyEvent'
import { TransactionsByPeriod, TransactionsEmpty } from 'components'

const OutgoingTransactions = ({
  setActive,
  repeat,
  items,
  transactionsByPeriod,
  currentAsset,
  isLoading,
  isBlockExplorerError,
  isCustomNetwork,
  activeTxHash,
}: Props) => {
  if (isLoading && !(items && items.length)) {
    return <div className='outgoing-transactions-view'>{'Loading'}</div>
  }

  const transactionsEmptyEvent = getTransactionsEmptyEvent(
    items,
    currentAsset,
    isBlockExplorerError,
    isCustomNetwork,
  )

  if (transactionsEmptyEvent) {
    return <TransactionsEmpty event={transactionsEmptyEvent} />
  }

  return (
    <div className='outgoing-transactions-view'>
      <TransactionsByPeriod
        setActive={setActive}
        repeat={repeat}
        transactionsByPeriod={transactionsByPeriod}
        assetSymbol={currentAsset.symbol}
        activeTxHash={activeTxHash}
      />
    </div>
  )
}

type Props = {
  setActive: (txHash: Hash) => Dispatch,
  repeat: Function,
  items: Transactions,
  transactionsByPeriod: Object,
  currentAsset: DigitalAsset,
  searchQuery: string,
  isLoading: boolean,
  isBlockExplorerError: boolean,
  isCustomNetwork: boolean,
  activeTxHash: ?Hash,
}

export default OutgoingTransactions
