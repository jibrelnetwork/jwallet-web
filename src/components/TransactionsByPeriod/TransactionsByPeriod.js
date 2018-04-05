// @flow

import React from 'react'

import Transaction from 'components/Transaction'
import JCard from 'components/base/JCard'

const TransactionsByPeriod = ({
  setActive,
  repeat,
  transactionsByPeriod,
  assetSymbol,
  activeTxHash,
}: Props) => (
  <div className='transactions-by-period'>
    {Object.keys(transactionsByPeriod).map((period: string) => {
      return (
        <JCard key={period} withShadow>
          <div className='period'>{period}</div>
          {transactionsByPeriod[period].map((transaction: Transaction) => (
            <Transaction
              key={transaction.transactionHash}
              setActive={setActive}
              repeat={repeat}
              data={transaction}
              assetSymbol={assetSymbol}
              activeTxHash={activeTxHash}
            />
          ))}
        </JCard>
      )
    })}
  </div>
)

type Props = {
  setActive: (txHash: Hash) => Dispatch,
  repeat: Function,
  transactionsByPeriod: Object,
  assetSymbol: string,
  activeTxHash: ?Hash,
}

export default TransactionsByPeriod
