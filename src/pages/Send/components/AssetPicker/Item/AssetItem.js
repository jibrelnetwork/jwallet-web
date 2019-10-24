// @flow strict

import * as React from 'react'

import { JAssetSymbol } from 'components/base'

import { AssetBalance } from '../AssetBalance/AssetBalance'

import assetItemStyles from './assetItem.m.scss'

type Props = {
  +name: string,
  +address: AssetAddress,
  +symbol: string,
  +assetBalance: ?string,
  +fiatBalance: ?string,
}

function AssetItem({
  name,
  symbol,
  address,
  assetBalance,
  fiatBalance,
}: Props) {
  return (
    <div className={assetItemStyles.core}>
      <span className={assetItemStyles.icon}>
        <JAssetSymbol
          address={address}
          symbol={symbol}
          color='blue'
          size={24}
        />
      </span>
      <div className={assetItemStyles.wrap}>
        <span className={assetItemStyles.title}>{name}</span>
        <span className={assetItemStyles.description}>{symbol}</span>
      </div>
      <AssetBalance
        assetBalance={assetBalance}
        fiatBalance={fiatBalance}
      />
    </div>
  )
}

export { AssetItem }
