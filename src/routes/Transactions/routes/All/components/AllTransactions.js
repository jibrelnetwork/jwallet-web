// @flow

import React from 'react'

import TransactionsByPeriod from 'components/__new__/TransactionsByPeriod'

const AllTransactions = ({
  setActive,
  // items,
  transactionsByPeriod,
  currentAsset,
  // searchQuery,
  // isLoading,
  // isBlockExplorerError,
  activeTxHash,
}: Props) => (
  <div className='all-transactions-view'>
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

export default AllTransactions
