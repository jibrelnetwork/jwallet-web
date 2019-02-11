// @flow

import React from 'react'

import { SYMBOLS_AVAILABLE_CLASS_INDEX } from './symbolsAvailable'

const getSymbolClassName = symbol =>
  SYMBOLS_AVAILABLE_CLASS_INDEX[symbol.toLowerCase()] || '-symbol-not-listed'

const JAssetSymbol = ({ symbol, color }: Props) => (
  <div className={`j-asset-symbol ${getSymbolClassName(symbol)} -${color}`} data-symbol={symbol} />
)

type Props = {
  symbol: string,
  color: 'blue' | 'gray' | 'white',
}

export default JAssetSymbol
