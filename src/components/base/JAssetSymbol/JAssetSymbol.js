// @flow strict

import React from 'react'
import classNames from 'classnames'

import { iconsAsset } from 'utils/sprite'

import styles from './jAssetSymbol.m.scss'
import { ADDRESSES_AVAILABLE } from './symbolsAvailable'

// remember: symbol version would be a little larger than icon version
type JAssetSymbolSize = 24 | 32

type Props = {|
  +symbol: string,
  +address?: ?string,
  +className?: ?string,
  +size: JAssetSymbolSize,
|}

export function JAssetSymbol({
  size,
  symbol,
  address,
  className,
}: Props) {
  const symbolByAddress = address
    ? ADDRESSES_AVAILABLE[address.toLowerCase()]
    : null

  const iconData = symbolByAddress
    ? iconsAsset[`${symbolByAddress.toUpperCase()}-usage`]
    : null

  return (
    <div
      className={classNames(
        '__asset-symbol',
        styles[`size${size}`],
        className,
      )}
    >
      {symbolByAddress && iconData ? (
        <svg
          className={styles.icon}
          viewBox={iconData.viewBox}
        >
          <use
            xlinkHref={iconData.url}
            key={address}
          />
        </svg>
      ) : (
        <svg className={styles.text} viewBox='0 0 36 36'>
          <text
            x='18'
            y='18'
            textAnchor='middle'
            dominantBaseline='central'
          >
            {(symbol.length > 4) ? symbol.substr(0, 3) : symbol}
          </text>
        </svg>
      )}
    </div>
  )
}

JAssetSymbol.defaultProps = {
  address: null,
  className: null,
}

export const JAssetSymbolEnhanced = React.memo/* :: <Props> */(JAssetSymbol)
