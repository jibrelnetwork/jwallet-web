// @flow strict

import React from 'react'

import { useI18n } from 'app/hooks'

import {
  JIcon,
  JLink,
  JAssetSymbol,
} from 'components/base'

import styles from './assetItemPreview.m.scss'

type Props = {|
  +name: ?string,
  +symbol: ?string,
  +address: string,
  +isCancel: boolean,
|}

export function AssetItemPreview({
  name,
  symbol,
  address,
  isCancel,
}: Props) {
  if (!name || !symbol || isCancel) {
    return null
  }

  const i18n = useI18n()

  return (
    <JLink
      href={`/assets/${address}`}
      className={`__asset-item-preview ${styles.core} ${styles.data}`}
    >
      <div className={`${styles.item} ${styles.symbol}`}>
        <JAssetSymbol
          symbol={symbol}
          address={address}
          color='blue'
          size={24}
        />
      </div>
      <div className={`${styles.item} ${styles.info}`}>
        <div className={styles.label}>
          {i18n._(
            'HistoryItemDetails.AssetItemPreview.label',
            null,
            { defaults: 'Asset' },
          )}
        </div>
        <div className={styles.body}>
          {name}
        </div>
      </div>
      <div className={`${styles.item} ${styles.icon}`}>
        <JIcon className={styles.arrow} name='arrow-right-use-fill' />
      </div>
    </JLink>
  )
}

AssetItemPreview.defaultProps = {
  isCancel: false,
}
