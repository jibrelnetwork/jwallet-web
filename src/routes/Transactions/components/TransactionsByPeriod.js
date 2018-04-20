// @flow

import React from 'react'

import { JCard, JLoader } from 'components/base'

import TransactionItem from './TransactionItem'
import TransactionsEmpty from './TransactionsEmpty'

const TransactionsByPeriod = ({
  repeat,
  setActive,
  transactionsByPeriod,
  assetSymbol,
  activeTxHash,
  isEmpty,
  isLoading,
}: Props) => {
  if (isLoading) {
    return (
      <div className='transactions-by-period -loading'>
        <JLoader color='blue' />
      </div>
    )
  }

  if (isEmpty) {
    return <TransactionsEmpty event='empty-list' />
  }

  return (
    <div className='transactions-by-period'>
      {Object.keys(transactionsByPeriod).map((period: string) => (
        <div key={period} className='card'>
          <JCard title={period} withShadow>
            {transactionsByPeriod[period].map((transaction: Transaction) => (
              <TransactionItem
                key={transaction.transactionHash}
                setActive={setActive}
                repeat={repeat}
                data={transaction}
                assetSymbol={assetSymbol}
                activeTxHash={activeTxHash}
              />
            ))}
          </JCard>
        </div>
      ))}
    </div>
  )
}

type Props = {
  repeat: Function,
  setActive: (txHash: Hash) => Dispatch,
  transactionsByPeriod: Object,
  assetSymbol: string,
  activeTxHash: ?Hash,
  isEmpty: boolean,
  isLoading: boolean,
}

TransactionsByPeriod.defaultProps = {
  repeat: () => {},
  setActive: () => {},
  transactionsByPeriod: {},
  assetSymbol: 'ETH',
  activeTxHash: null,
  isEmpty: false,
  isLoading: false,
}

export default TransactionsByPeriod
