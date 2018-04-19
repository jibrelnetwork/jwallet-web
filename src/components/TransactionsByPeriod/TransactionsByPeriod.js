// @flow

import React from 'react'

import JCard from 'components/base/JCard'

import TransactionItem from './TransactionItem'

const TransactionsByPeriod = ({
  setActive,
  repeat,
  transactionsByPeriod,
  assetSymbol,
  activeTxHash,
}: Props) => (
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

type Props = {
  setActive: (txHash: Hash) => Dispatch,
  repeat: Function,
  transactionsByPeriod: Object,
  assetSymbol: string,
  activeTxHash: ?Hash,
}

TransactionsByPeriod.defaultProps = {
  setActive: () => {},
  repeat: () => {},
  transactionsByPeriod: {},
  assetSymbol: 'ETH',
  activeTxHash: null,
}

export default TransactionsByPeriod
