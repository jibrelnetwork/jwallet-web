// @flow

import React from 'react'
import classNames from 'classnames'

import JIcon from 'components/base/JIcon'
import ethereum from 'data/assets/ethereum'
import handle from 'utils/eventHandlers/handle'

const AssetItem = ({
  setCurrent,
  address,
  name,
  symbol,
  balance,
  isLoading,
  isCurrent,
}: Props) => (
  <div
    onClick={handle(setCurrent)(address)}
    className={classNames('asset-item', { '-current': isCurrent })}
  >
    <div className='icon'>
      <JIcon size='large' name='token-ant' />
    </div>
    <div className='name'>{name}</div>
    {isLoading ? <div className='balance'>{'Loading'}</div> : (
      <div className='balance'>
        <div className='integer'>{Math.floor(balance).toFixed()}</div>
        <div className='decimals'>
          {`${(balance - Math.floor(balance)).toFixed(2).substr(1)} ${symbol}`}
        </div>
      </div>
    )}
  </div>
)

type Props = {
  setCurrent: Function,
  address: Address,
  name: string,
  symbol: string,
  balance: number,
  isLoading: boolean,
  isCurrent: boolean,
}

AssetItem.defaultProps = {
  setCurrent: () => {},
  address: ethereum.address,
  name: ethereum.name,
  symbol: ethereum.symbol,
  balance: 0,
  isLoading: false,
  isCurrent: false,
}

export default AssetItem
