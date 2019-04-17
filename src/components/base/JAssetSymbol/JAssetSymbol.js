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

  return (
    <div
      className={classNames(`j-asset-symbol ${getSymbolClassName(symbol, isCustom)} -${color}`)}
      data-symbol={symbol[0]}
    >
      {!isCustom && url
        ? (
          <svg className='icon' >
            <use xlinkHref={url} />
          </svg>
        )
        : null}
    </div>
  )
}

JAssetSymbol.defaultProps = {
  isCustom: false,
}

export default JAssetSymbol
