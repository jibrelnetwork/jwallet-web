// @flow

import React from 'react'
import classNames from 'classnames'

import { iconsAsset } from 'utils/sprite'
import { ADDRESSES_AVAILABLE } from './symbolsAvailable'

import jAssetSymbolStyle from './jAssetSymbol.m.scss'

type JAssetSymbolColor = 'blue' | 'gray' | 'white'
// remember: symbol version would be a little larger than icon version
type JAssetSymbolSize = 24 | 32

type Props = {|
  address?: ?string,
  className?: ?string,
  color?: JAssetSymbolColor,
  +symbol: string,
  +size: JAssetSymbolSize,
|}

export function JAssetSymbolInternal({
  symbol,
  address,
  color,
  className,
  size,
}: Props) {
  const sizeClassId = `size${size}`
  const symbolByAddress = address ?
    ADDRESSES_AVAILABLE[address.toLowerCase()] :
    null
  const url = symbolByAddress ?
    iconsAsset[`${symbolByAddress.toLowerCase()}-usage`] :
    null
  const hasIcon = symbolByAddress && url
  const symbolShorthand = symbol.length > 4 ?
    symbol.substr(0, 3) :
    symbol

  return (
    <div
      className={classNames(
        '__asset-symbol',
        jAssetSymbolStyle[color],
        jAssetSymbolStyle[sizeClassId],
        className,
      )}
    >
      {hasIcon
        ? (
          <svg className={jAssetSymbolStyle.icon} viewBox='0 0 24 24'>
            <use
              xlinkHref={url}
              key={address}
            />
          </svg>
        )
        : (
          <svg className={jAssetSymbolStyle.text} viewBox='0 0 36 36'>
            <text
              x='18'
              y='18'
              textAnchor='middle'
              dominantBaseline='central'
            >
              {symbolShorthand}
            </text>
          </svg>
        )
      }
    </div>
  )
}

JAssetSymbolInternal.defaultProps = {
  address: null,
  color: 'blue',
  className: null,
}

export const JAssetSymbol = React.memo/* :: <Props> */(JAssetSymbolInternal)
