// @flow

import React from 'react'
import classNames from 'classnames'

import handle from 'utils/handle'
import JIcon from 'components/base/__new__/JIcon'

const ActiveAsset = ({
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
    className={classNames('active-asset', { '-current': isCurrent })}
  >
    <JIcon size='large' name='token-ant' />
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

export default ActiveAsset
