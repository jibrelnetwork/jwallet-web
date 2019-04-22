// @flow

import React from 'react'
import classNames from 'classnames'

import { iconsAsset } from 'utils/sprite'
import { SYMBOLS_AVAILABLE_CLASS_INDEX } from './symbolsAvailable'

type JAssetSymbolColor = 'blue' | 'gray' | 'white'

type Props = {
  symbol: string,
  color: JAssetSymbolColor,
  isCustom?: boolean,
}

const getSymbolClassName = (symbol, isCustom) =>
  !isCustom && SYMBOLS_AVAILABLE_CLASS_INDEX[symbol.toLowerCase()] ? '' : '-symbol-not-listed'

function JAssetSymbol({
  symbol, color, isCustom,
}: Props) {
  const url = iconsAsset[`${symbol.toLowerCase()}-usage`]
  const hasIcon = !isCustom && url

  return (
    <div
      className={classNames(`j-asset-symbol ${getSymbolClassName(symbol, isCustom)} -${color}`)}
    >
      <svg className='icon' viewBox='0 0 36 36'>
        {hasIcon
          ? (
            <use
              className='image'
              xlinkHref={url}
              key={symbol}
            />
          )
          : (
            <text
              x='18'
              y='18'
              textAnchor='middle'
              dominantBaseline='central'
              className='text'
            >
              {symbol.length > 4 ? symbol.substr(0, 3) : symbol }
            </text>
          )
        }
      </svg>
    </div>
  )
}

JAssetSymbol.defaultProps = {
  isCustom: false,
  color: 'blue',
}

export default React.memo/* :: <Props> */(JAssetSymbol)
