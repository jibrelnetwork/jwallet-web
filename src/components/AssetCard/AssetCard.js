// @flow

import React from 'react'
import classNames from 'classnames'

import handle from 'utils/handle'
import JIcon from 'components/base/JIcon'

const AssetCard = ({
  setActive,
  address,
  name,
  symbol,
  balance,
  isActive,
  isLoading,
  color,
}: Props) => {
  const integer = Math.floor(balance)
  const decimals = (balance - integer).toFixed(2).substr(1)

  return (
    <div
      key={address}
      onClick={handle(setActive)(address)}
      className={classNames('asset-card', color && `-${color}`, { '-active': isActive })}
    >
      <JIcon size='large' name='token-ant' />
      <div className='name'>{name}</div>
      {(balance !== undefined) && (
        <div className='balance'>
          {isLoading ? 'Loading' : `${integer.toFixed()} ${decimals} ${symbol}`}
        </div>
      )}
    </div>
  )
}

type Props = {
  setActive: Function,
  address: Address,
  name: string,
  symbol: string,
  balance: number,
  isActive: boolean,
  isLoading: boolean,
  color?: 'blue' | 'white',
}

AssetCard.defaultProps = {
  color: 'white',
}

export default AssetCard
