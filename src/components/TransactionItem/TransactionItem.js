// @flow

import React from 'react'

import JCard from 'components/base/JCard'

import TransactionItemMain from './Main'
import TransactionItemDetails from './Details'

type Props = {|
  +setActive: () => void,
  +data: TransactionWithAssetAddress,
  +asset: ?DigitalAsset,
  +blockExplorerSubdomain: string,
  +isActive: boolean,
  +isReceived: boolean,
  +isAssetList: boolean,
|}

function TransactionItem({
  setActive,
  data,
  asset,
  blockExplorerSubdomain,
  isActive,
  isReceived,
  isAssetList,
}: Props) {
  if (!asset) {
    return null
  }

  const {
    symbol,
    decimals,
  }: DigitalAsset = asset

  return (
    <div className='transaction-item'>
      <JCard color='white' isBorderRadius isHover>
        <TransactionItemMain
          setActive={setActive}
          data={data}
          assetSymbol={symbol}
          blockExplorerSubdomain={blockExplorerSubdomain}
          assetDecimals={decimals}
          isActive={isActive}
          isReceived={isReceived}
          isAssetList={isAssetList}
        />
        <TransactionItemDetails
          repeat={console.log}
          addFavorite={console.log}
          data={data}
          blockExplorerSubdomain={blockExplorerSubdomain}
          assetDecimals={decimals}
          isActive={isActive}
        />
      </JCard>
    </div>
  )
}

export default TransactionItem
