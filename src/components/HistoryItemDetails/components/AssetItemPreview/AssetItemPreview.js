// @flow strict

import React from 'react'
import { useI18n } from 'app/hooks'

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
  const i18n = useI18n()

  return (
    <JLink
      className={`__asset-item ${style.core} ${style.data}`}
      href={`/assets/${address}`}
    >
      <div
        className={`${style.item} ${style.assetIcon}`}
      >
        <JAssetSymbol
          address={address}
          symbol={symbol}
          color='blue'
          size={24}
        />
      </div>
      <div
        className={`${style.item} ${style.mainBlock}`}
      >
        <div className={style.label}>
          {i18n._(
            'HistoryItemDetails.AssetItemPreview.label',
            null,
            { defaults: 'Asset' },
          )}
        </div>
        <div className={style.body}>
          {name}
        </div>
      </div>
      <div
        className={`${style.item} ${style.arrowIcon}`}
      >
        <JIcon className={style.arrow} name='arrow-right-use-fill' />
      </div>
    </JLink>
  )
}
