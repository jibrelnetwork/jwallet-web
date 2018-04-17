// @flow

import React from 'react'

const JAssetSymbol = ({ symbol, color }: Props) => (
  <div className={`j-asset-symbol -symbol-${symbol.toLowerCase()} -${color}`} />
)

type Props = {
  symbol: string,
  color: 'blue' | 'gray' | 'white',
}

JAssetSymbol.defaultProps = {
  symbol: '',
  color: 'white',
}

export default JAssetSymbol
