// @flow

import React, { PureComponent } from 'react'
import classNames from 'classnames'

import { SYMBOLS_AVAILABLE_CLASS_INDEX } from './symbolsAvailable'

const getSymbolClassName = symbol =>
  SYMBOLS_AVAILABLE_CLASS_INDEX[symbol.toLowerCase()] || '-symbol-not-listed'

const files = require.context('../../../public/assets/tokens/blue', true, /.*\.svg$/)
const icons = files.keys().map(x => files(x).default).reduce((result, { id, url }) => ({
  ...result,
  [id]: url,
}), {})

type Props = {
  symbol: string,
  color: 'blue' | 'gray' | 'white',
}

class JAssetSymbol extends PureComponent<Props> {
  render() {
    const { symbol, color }: Props = this.props
    const url = icons[`${symbol.toLowerCase()}-usage`]
    console.warn(icons, symbol, url)
    return (
      <div
        className={classNames(`j-asset-symbol ${getSymbolClassName(symbol)} -${color}`)}
        data-symbol={symbol}
      >
        <svg className='icon' >
          <use xlinkHref={url || symbol} />
        </svg>
      </div>
    )
  }
}

export default JAssetSymbol
