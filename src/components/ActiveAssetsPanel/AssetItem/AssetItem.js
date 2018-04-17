// @flow

import React from 'react'
import classNames from 'classnames'

import ethereum from 'data/assets/ethereum'
import handle from 'utils/eventHandlers/handle'
import { JAssetSymbol, JText } from 'components/base'

const AssetItem = ({
  hover,
  setCurrent,
  address,
  name,
  symbol,
  balance,
  isLoading,
  isCurrent,
  isHovered,
}: Props) => (
  <div
    onClick={handle(setCurrent)(address)}
    onMouseEnter={handle(hover)(address)}
    onMouseLeave={handle(hover)(null)}
    className={classNames('asset-item', isCurrent && '-current', isHovered && '-hovered')}
  >
    <div className='icon'>
      <JAssetSymbol symbol={symbol} color={(isCurrent || isHovered) ? 'blue' : 'gray'} />
    </div>
    <div className='name'>
      <JText value={name} color={isCurrent ? 'blue' : 'gray'} />
    </div>
    {isLoading ? <div className='balance'>{'Loading'}</div> : (
      <div className='balance'>
        <div className='integer'>
          <JText
            value={Math.floor(balance).toFixed()}
            size='large'
            weight='bolder'
            color={isCurrent ? 'blue' : 'gray'}
          />
        </div>
        <div className='decimals'>
          <JText
            value={`${(balance - Math.floor(balance)).toFixed(2).substr(1)} ${symbol}`}
            size='large'
            weight='bolder'
            color={isCurrent ? 'blue' : 'gray'}
          />
        </div>
      </div>
    )}
  </div>
)

type Props = {
  hover: Function,
  setCurrent: Function,
  address: Address,
  name: string,
  symbol: string,
  balance: number,
  isLoading: boolean,
  isCurrent: boolean,
  isHovered: boolean,
}

AssetItem.defaultProps = {
  hover: () => {},
  setCurrent: () => {},
  address: ethereum.address,
  name: ethereum.name,
  symbol: ethereum.symbol,
  balance: 0,
  isLoading: false,
  isCurrent: false,
  isHovered: false,
}

export default AssetItem
