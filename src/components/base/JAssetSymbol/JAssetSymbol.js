// @flow

import React from 'react'
import classNames from 'classnames'

import { iconsAsset } from 'utils/sprite'
import { SYMBOLS_AVAILABLE_CLASS_INDEX } from './symbolsAvailable'

type JAssetSymbolColor = 'blue' | 'gray' | 'white'

type Props = {
  symbol: string,
  color: JAssetSymbolColor,
}

const getSymbolClassName = symbol =>
  SYMBOLS_AVAILABLE_CLASS_INDEX[symbol.toLowerCase()] || '-symbol-not-listed'

function JAssetSymbol({
  symbol, color,
}: Props) {
  const url = iconsAsset[`${symbol.toLowerCase()}-usage`]

  return (
    <div
      className={classNames(`j-asset-symbol ${getSymbolClassName(symbol)} -${color}`)}
      data-symbol={symbol}
    >
      <svg className='icon' >
        <use xlinkHref={url} />
      </svg>
    </div>
  )
}

export default JAssetSymbol
