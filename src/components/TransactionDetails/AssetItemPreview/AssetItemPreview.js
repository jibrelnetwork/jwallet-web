// @flow strict

import React from 'react'
import classNames from 'classnames'
import {
  JAssetSymbol,
  JIcon,
  JLink,
} from 'components/base'

import style from './assetItemPreview.m.scss'

export function AssetItemPreview({
  blockchainParams: { address },
  symbol,
  name,
}: DigitalAsset) {
  return (
    <JLink
      className={`__asset-item ${style.core}`}
      href={`/assets/${address}`}
    >
      <div
        className={classNames(style.item, style.assetIcon)}
      >
        <JAssetSymbol
          address={address}
          symbol={symbol}
          color='blue'
          size={24}
        />
      </div>
      <div
        className={classNames(style.item, style.mainBlock)}
      >
        <div className={style.text}>
          {name}
        </div>
        <div className={style.subtext}>
          {symbol}
        </div>
      </div>
      <div
        className={classNames(style.item, style.arrowIcon)}
      >
        <JIcon className={style.arrow} name='arrow-right-use-fill' />
      </div>
    </JLink>
  )
}
