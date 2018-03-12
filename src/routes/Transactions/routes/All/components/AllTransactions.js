// @flow

import React from 'react'

import handle from 'utils/handle'

const AllTransactions = ({
  setActive,
  items,
  // searchQuery,
  // isLoading,
  // isBlockExplorerError,
  // activeTxHash,
}: Props) => (
  <div className='all-transactions-view'>
    <div>
      <div>
        {items.map((transaction: Transaction) => {
          return (
            <div
              onClick={handle(setActive)(transaction.transactionHash)}
              key={transaction.transactionHash}
            >
              <div>{transaction.type}</div>
              <div>{transaction.date}</div>
              <div>{transaction.fee}</div>
              <div>{transaction.amount}</div>
              <div>{transaction.address}</div>
            </div>
          )
        })}
      </div>
    </div>
  </div>
)

type Props = {
  setActive: (txHash: Hash) => Dispatch,
  items: Transactions,
  searchQuery: string,
  isLoading: boolean,
  isBlockExplorerError: boolean,
  activeTxHash: ?Hash,
}

export default AllTransactions
