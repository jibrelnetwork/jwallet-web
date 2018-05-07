// @flow

import React from 'react'
import classNames from 'classnames'
import { JAssetSymbol, JText } from 'react-components'

import handle from 'utils/eventHandlers/handle'
import AssetBalance from 'components/AssetBalance'

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
}: Props) => {
  const assetColor: 'blue' | 'gray' = (isCurrent || isHovered) ? 'blue' : 'gray'

  return (
    <div
      onClick={handle(setCurrent)(address)}
      onMouseEnter={handle(hover)(address)}
      onMouseLeave={handle(hover)(null)}
      className={classNames('asset-item', isCurrent && '-current')}
    >
      <div className='icon'>
        <JAssetSymbol symbol={symbol} color={assetColor} />
      </div>
      <div className='name'>
        <JText value={name} color={assetColor} />
      </div>
      <AssetBalance
        symbol={symbol}
        color={assetColor}
        size='large'
        weight='bolder'
        balance={balance}
        isLoading={isLoading}
        isTransparent
      />
    </div>
  )
}

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

export default AssetItem
