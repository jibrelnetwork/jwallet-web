// @flow strict

import * as React from 'react'

import { JAssetSymbol } from 'components/base'

import assetItemStyles from './assetItem.m.scss'

type Props = {
  +name: string,
  +symbol: string,
  +isCustom: boolean,
}

function AssetItem({
  name,
  symbol,
  isCustom,
}: Props) {
  return (
    <div className={assetItemStyles.core}>
      <span className={assetItemStyles.icon}>
        <JAssetSymbol
          symbol={symbol}
          isCustom={isCustom}
          color='blue'
          className={assetItemStyles.icon}
        />
      </span>
      <div className={assetItemStyles.wrap}>
        <span className={assetItemStyles.title}>{name}</span>
        <span className={assetItemStyles.description}>{symbol}</span>
      </div>
    </div>
  )
}

export { AssetItem }
