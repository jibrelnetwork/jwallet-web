// @flow

import React, { PureComponent } from 'react'
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

class JAssetSymbol extends PureComponent<Props> {
  static defaultProps = {
    isCustom: false,
    color: 'blue',
  }

  constructor(props: Props) {
    super(props)

    this.reRenderKey = 0
  }

  reRenderKey: number

  render() {
    const {
      symbol,
      color,
      isCustom,
    } = this.props

    const assetIcon = iconsAsset[`${symbol.toLowerCase()}-usage`]
    const hasIcon = !isCustom && assetIcon

    // We need this hack to fix react bug:
    // React does not re-render icon in DOM, when xlinkHref changed
    this.reRenderKey = this.reRenderKey + 1

    return (
      <div
        className={classNames(`j-asset-symbol ${getSymbolClassName(symbol, isCustom)} -${color}`)}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          xmlnsXlink='http://www.w3.org/1999/xlink'
          className='icon'
          viewBox='0 0 36 36'
        >
          {hasIcon
            ? (
              <use
                key={this.reRenderKey}
                className='image'
                xlinkHref={assetIcon.url}
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
}

export default JAssetSymbol
