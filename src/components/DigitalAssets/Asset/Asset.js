// @flow

import React from 'react'
import classNames from 'classnames'
import { JAssetSymbol, JFlatButton, JIcon, JText } from 'react-components'

import AssetBalance from 'components/AssetBalance'
import { handle, ignoreEvent } from 'utils/eventHandlers'

const AssetCard = ({
  edit,
  hover,
  setActive,
  name,
  symbol,
  address,
  color,
  balance,
  isCustom,
  isActive,
  isLoading,
  isHovered,
  isPopular,
}: Props) => {
  const hoveredColor = (isHovered || isActive) ? 'blue' : 'gray'
  const assetColor = (color === 'white') ? hoveredColor : 'white'

  return (
    <div
      onClick={handle(setActive)(address)}
      onMouseEnter={handle(hover)(address)}
      onMouseLeave={handle(hover)(null)}
      className={classNames('asset-card', color && `-${color}`, isActive && '-active')}
    >
      <div className='tick'>
        <JIcon name='checkbox' color={(color === 'white') ? 'blue' : 'white'} />
      </div>
      <div className='symbol'>
        <JAssetSymbol symbol={symbol} color={assetColor} />
      </div>
      <div className='name'>
        <JText value={name} color={assetColor} weight='bold' />
      </div>
      {!isPopular && (
        <div className='balance'>
          <AssetBalance
            symbol={symbol}
            color={assetColor}
            balance={balance}
            isLoading={isLoading}
          />
        </div>
      )}
      {isCustom && (
        <div className='edit'>
          <JFlatButton
            onClick={ignoreEvent(edit)(address)}
            iconSize='small'
            iconColor='gray'
            iconName='settings'
            isTransparent
          />
        </div>
      )}
    </div>
  )
}

type Props = {
  edit: Function,
  hover: Function,
  setActive: Function,
  name: string,
  symbol: string,
  address: Address,
  color: 'blue' | 'white',
  balance: number,
  isCustom: boolean,
  isActive: boolean,
  isLoading: boolean,
  isHovered: boolean,
  isPopular: boolean,
}

AssetCard.defaultProps = {
  isLoading: false,
}

export default AssetCard
