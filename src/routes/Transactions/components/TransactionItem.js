// @flow

import React from 'react'

import TransactionItemMain from './TransactionItemMain'
import TransactionItemAdditional from './TransactionItemAdditional'

const TransactionItem = ({ repeat, setActive, data, assetSymbol, activeTxHash }: Props) => {
  const isActive: boolean = (data.transactionHash === activeTxHash)

  return (
    <div className='transaction-item'>
      <TransactionItemMain
        repeat={repeat}
        setActive={setActive}
        data={data}
        assetSymbol={assetSymbol}
        isActive={isActive}
      />
      <TransactionItemAdditional
        repeat={repeat}
        data={data}
        assetSymbol={assetSymbol}
        isActive={isActive}
      />
    </div>
  )
}

type Props = {
  repeat: Function,
  setActive: Function,
  data: Transaction,
  activeTxHash: ?Hash,
  assetSymbol: ?string,
}

export default TransactionItem
