// @flow strict

import * as React from 'react'

import { JAssetSymbol } from 'components/base'

import styles from './assetItem.m.scss'
import { AssetBalance } from '../AssetBalance/AssetBalance'

type Props = {
  +name: string,
  +symbol: string,
  +fiatBalance: ?string,
  +assetBalance: ?string,
  +address: AssetAddress,
}

function AssetItem({
  name,
  symbol,
  address,
  fiatBalance,
  assetBalance,
}: Props) {
  return (
    <div className={styles.core}>
      <span className={styles.icon}>
        <JAssetSymbol
          symbol={symbol}
          address={address}
          size={24}
        />
      </span>
      <div className={styles.wrap}>
        <span className={styles.title}>{name}</span>
        <span className={styles.description}>{symbol}</span>
      </div>
      <AssetBalance
        assetBalance={assetBalance}
        fiatBalance={fiatBalance}
      />
    </div>
  )
}

export { AssetItem }
