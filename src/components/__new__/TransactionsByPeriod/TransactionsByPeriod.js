// @flow

import React from 'react'

import Transaction from 'components/__new__/Transaction'
import JCard from 'components/base/__new__/JCard'

const TransactionsByPeriod = ({
  setActive,
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
  transactionsByPeriod: Object,
  assetSymbol: string,
  activeTxHash: ?Hash,
}

export default TransactionsByPeriod
