// @flow

import React from 'react'

import JCard from 'components/base/JCard'

import TransactionItemMain from './Main'
import TransactionItemDetails from './Details'

type Props = {|
  +setActive: () => void,
  +data: TransactionWithPrimaryKeys,
  +asset: ?DigitalAsset,
  +blockExplorerSubdomain: string,
  +isSent: boolean,
  +isActive: boolean,
  +isAssetList: boolean,
|}

function TransactionItem({
  setActive,
  data,
  asset,
  blockExplorerSubdomain,
  isSent,
  isActive,
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
          isSent={isSent}
          isActive={isActive}
          isAssetList={isAssetList}
        />
        <TransactionItemDetails
          // eslint-disable-next-line no-console
          repeat={console.log}
          // eslint-disable-next-line no-console
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
