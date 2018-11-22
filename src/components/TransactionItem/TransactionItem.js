// @flow

import React from 'react'

// import TransactionItemMain from './Main'
// import TransactionItemDetails from './Details'

type Props = {|
  // +setActive: () => void,
  +data: TransactionWithAssetAddress,
  +asset: ?DigitalAsset,
  // +isActive: boolean,
|}

function TransactionItem({
  // setActive,
  data,
  asset,
  // isActive,
}: Props) {
  if (!asset) {
    return null
  }

  return (
    <div>
      {data.hash}
    </div>
  )

  /*
  return (
    <div className='transaction-item'>
      <TransactionItemMain
        setActive={setActive}
        data={data}
        assetSymbol={asset.symbol}
        isActive={isActive}
      />
      <TransactionItemDetails
        repeat={console.log}
        addComment={console.log}
        addFavorite={console.log}
        data={data}
        isActive={isActive}
      />
    </div>
  )
  */
}

export default TransactionItem
