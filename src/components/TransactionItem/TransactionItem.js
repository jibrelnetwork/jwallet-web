// @flow

import React from 'react'

import JCard from 'components/base/JCard'

import TransactionItemMain from './Main'
import TransactionItemDetails from './Details'

type Props = {|
  +setActive: () => void,
  +data: TransactionWithAssetAddress,
  +asset: DigitalAsset,
  +networkId: NetworkId,
  +isActive: boolean,
  +isReceived: boolean,
|}

function TransactionItem({
  setActive,
  data,
  asset,
  networkId,
  isActive,
  isReceived,
}: Props) {
  return (
    <div className='transaction-item'>
      <JCard color='white' isBorderRadius isHover>
        <TransactionItemMain
          setActive={setActive}
          data={data}
          isActive={isActive}
          assetDecimals={asset.decimals}
          assetSymbol={asset.symbol}
          isCustom={asset.isCustom}
          isReceived={isReceived}
          networkId={networkId}
        />
        <TransactionItemDetails
          repeat={console.log}
          addFavorite={console.log}
          data={data}
          assetDecimals={asset.decimals}
          networkId={networkId}
          isActive={isActive}
        />
      </JCard>
    </div>
  )
}

export default TransactionItem
