// @flow

import React from 'react'
import classNames from 'classnames'
import { identity } from 'ramda'

import ethereum from 'data/assets/ethereum'
import { JButton, JIcon } from 'components/base'
import { handle, ignoreEvent } from 'utils/eventHandlers'

const AssetCard = ({
  edit,
  setActive,
  address,
  name,
  symbol,
  balance,
  isCustom,
  isActive,
  isLoading,
  color,
}: Props) => {
  const integer = balance ? Math.floor(balance) : 0
  const decimals = balance ? (balance - integer).toFixed(2).substr(1) : 0

  return (
    <div
      onClick={handle(setActive)(address)}
      className={classNames('asset-card', color && `-${color}`, { '-active': isActive })}
    >
      <div className='icon'>
        <JIcon size='large' name='token-ant' color={color} />
      </div>
      <div className='name'>{name}</div>
      {(balance !== undefined) && (
        <div className='balance'>
          {isLoading ? 'Loading' : `${integer.toFixed()} ${decimals} ${symbol}`}
        </div>
      )}
      {isCustom && (
        <div className='edit'>
          <JButton
            onClick={ignoreEvent(edit)(address)}
            iconName='settings'
            iconSize='small'
            color='gray'
            minimal
            transparent
          />
        </div>
      )}
    </div>
  )
}

type Props = {
  edit: Function,
  setActive: Function,
  address: Address,
  name: string,
  symbol: string,
  color: 'blue' | 'white',
  balance: ?number,
  isCustom: boolean,
  isActive: boolean,
  isLoading: boolean,
}

AssetCard.defaultProps = {
  edit: identity,
  setActive: identity,
  address: ethereum.address,
  name: ethereum.name,
  symbol: ethereum.symbol,
  color: 'white',
  balance: undefined,
  isCustom: false,
  isActive: false,
  isLoading: false,
}

export default AssetCard
