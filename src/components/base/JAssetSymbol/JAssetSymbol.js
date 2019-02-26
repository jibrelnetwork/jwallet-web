// @flow

import React from 'react'

import { SYMBOLS_AVAILABLE_CLASS_INDEX } from './symbolsAvailable'

type JAssetSymbolColor = 'blue' | 'gray' | 'white'

type Props = {
  symbol: string,
  color: JAssetSymbolColor,
}

const getSymbolClassName = symbol =>
  SYMBOLS_AVAILABLE_CLASS_INDEX[symbol.toLowerCase()] || '-symbol-not-listed'

const JAssetSymbol = ({
  color,
  symbol,
}: Props) => (
  <div className={`j-asset-symbol ${getSymbolClassName(symbol)} -${color}`} data-symbol={symbol} />
)

export default JAssetSymbol
