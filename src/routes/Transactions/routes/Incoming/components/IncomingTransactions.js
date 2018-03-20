// @flow

import React from 'react'

import TransactionsByPeriod from 'components/__new__/TransactionsByPeriod'

const IncomingTransactions = ({
  setActive,
  items,
  transactionsByPeriod,
  currentAsset,
  // searchQuery,
  isLoading,
  // isBlockExplorerError,
  activeTxHash,
}: Props) => {
  if (isLoading && !(items && items.length)) {
    return <div className='incoming-transactions-view'>{'Loading'}</div>
  }

  return (
    <div className='incoming-transactions-view'>
      {currentAsset ? (
        <TransactionsByPeriod
          setActive={setActive}
          transactionsByPeriod={transactionsByPeriod}
          assetSymbol={currentAsset.symbol}
          activeTxHash={activeTxHash}
        />
      ) : (
        <div>{'There are no active assets'}</div>
      )}
    </div>
  )
}

type Props = {
  setActive: (txHash: Hash) => Dispatch,
  items: Transactions,
  transactionsByPeriod: Object,
  currentAsset: DigitalAsset,
  searchQuery: string,
  isLoading: boolean,
  isBlockExplorerError: boolean,
  activeTxHash: ?Hash,
}

export default IncomingTransactions
