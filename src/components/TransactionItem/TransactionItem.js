// @flow

import React from 'react'

import TransactionItemMain from './Main'
import TransactionItemDetails from './Details'

type Props = {
  repeat: Function,
  setActive: Function,
  data: Transaction,
  activeTxHash: ?Hash,
  assetSymbol: ?string,
}

function TransactionItem({ repeat, setActive, data, assetSymbol, activeTxHash }: Props) {
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
      <TransactionItemDetails
        repeat={repeat}
        data={data}
        assetSymbol={assetSymbol}
        isActive={isActive}
      />
    </div>
  )
}

export default TransactionItem
