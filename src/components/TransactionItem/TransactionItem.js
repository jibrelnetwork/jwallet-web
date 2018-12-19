// @flow

import React from 'react'

import JCard from 'components/base/JCard'

import TransactionItemMain from './Main'
import TransactionItemDetails from './Details'

type Props = {|
  +setActive: () => void,
  +data: TransactionWithPrimaryKeys,
  +asset: ?DigitalAsset,
  +toName: ?string,
  +fromName: ?string,
  +blockExplorerSubdomain: string,
  +isSent: boolean,
  +isActive: boolean,
  +isAssetList: boolean,
|}

function TransactionItem({
  setActive,
  data,
  asset,
  toName,
  fromName,
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
          txAddressName={isSent ? toName : fromName}
          blockExplorerSubdomain={blockExplorerSubdomain}
          assetDecimals={decimals}
          isSent={isSent}
          isActive={isActive}
          isAssetList={isAssetList}
        />
        <TransactionItemDetails
          data={data}
          toName={toName}
          fromName={fromName}
          blockExplorerSubdomain={blockExplorerSubdomain}
          assetDecimals={decimals}
          isSent={isSent}
          isActive={isActive}
        />
      </JCard>
    </div>
  )
}

export default TransactionItem
