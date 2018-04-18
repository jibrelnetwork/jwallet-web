// @flow

import React from 'react'
import classNames from 'classnames'

import ethereum from 'data/assets/ethereum'
import balanceToString from 'utils/digitalAssets/balanceToString'
import { handle, ignoreEvent } from 'utils/eventHandlers'
import { JAssetSymbol, JFlatButton, JIcon, JText } from 'components/base'

const AssetCard = ({
  edit,
  hover,
  setActive,
  address,
  name,
  symbol,
  color,
  balance,
  isCustom,
  isActive,
  isLoading,
  isHovered,
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
      {(balance !== undefined) && (
        <div className='balance'>
          <JText
            value={isLoading ? 'Loading' : `${balanceToString(balance)} ${symbol}`}
            weight='bold'
            color={assetColor}
          />
        </div>
      )}
      {isCustom && (
        <div className='edit'>
          <JFlatButton
            onClick={ignoreEvent(edit)(address)}
            iconName='settings'
            iconColor='gray'
            transparent
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
  address: Address,
  name: string,
  symbol: string,
  color: 'blue' | 'white',
  balance: ?number,
  isCustom: boolean,
  isActive: boolean,
  isLoading: boolean,
  isHovered: boolean,
}

AssetCard.defaultProps = {
  edit: () => {},
  hover: () => {},
  setActive: () => {},
  address: ethereum.address,
  name: ethereum.name,
  symbol: ethereum.symbol,
  color: 'white',
  balance: undefined,
  isCustom: false,
  isActive: false,
  isLoading: false,
  isHovered: false,
}

export default AssetCard
