// @flow

import React from 'react'

import getTransactionsEmptyEvent from 'utils/transactions/getTransactionsEmptyEvent'
import { TransactionsByPeriod, TransactionsEmpty } from 'components'

const TransactionsAllView = ({
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
    return <div className='all-transactions-view'>{'Loading'}</div>
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
    <div className='transactions-all-view'>
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

TransactionsAllView.defaultProps = {
  setActive: () => {},
  repeat: () => {},
  items: [],
  transactionsByPeriod: {},
  currentAsset: {},
  searchQuery: '',
  isLoading: false,
  isBlockExplorerError: false,
  isCustomNetwork: false,
  activeTxHash: null,
}

export default TransactionsAllView
