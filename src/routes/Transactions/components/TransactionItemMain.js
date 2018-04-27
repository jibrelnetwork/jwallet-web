// @flow

import React from 'react'
import classNames from 'classnames'
import { assoc } from 'ramda'

import { JIcon, JRaisedButton, JText } from 'components/base'
import { handle, ignoreEvent } from 'utils/eventHandlers'

const getJNTEventType = ({ type, isJNT }: Transaction): '—' | 'mint' | 'burn' => {
  if (!isJNT) {
    return '—'
  }

  return (type === 'send') ? 'burn' : 'mint'
}

const TransactionItemMain = ({ repeat, setActive, data, assetSymbol, isActive }: Props) => (
  <div
    onClick={handle(setActive)(data.transactionHash)}
    className={classNames('transaction-item-main', isActive && '-active')}
  >
    <div className='icon'>
      <JIcon name={`transaction-${data.type}`} size='large' />
    </div>
    <div className='item -date'>
      <div className='label'>
        <JText value='Date' color='gray' />
      </div>
      <div className='value'>
        <JText value={data.date} color='gray' size='large' />
      </div>
    </div>
    <div className='item -address'>
      <div className='label'>
        <JText value='Address' color='gray' />
      </div>
      <div className='value'>
        <JText value={data.address || getJNTEventType(data)} color='gray' size='large' />
      </div>
    </div>
    <div className='item -amount'>
      <div className='value'>
        <JText
          value={` + ${data.amount.toFixed(3)} ${assetSymbol || ''}`}
          color={(data.type === 'receive') ? 'blue' : 'gray'}
          size='large'
          weight='bolder'
        />
      </div>
      <div className='repeat'>
        <JRaisedButton
          onClick={ignoreEvent(repeat)(assoc('symbol', assetSymbol)(data))}
          color='white'
          label='Repeat'
          iconColor='blue'
          iconName='repeat'
          labelColor='blue'
        />
      </div>
    </div>
  </div>
)

type Props = {
  repeat: Function,
  setActive: Function,
  data: Transaction,
  assetSymbol: ?string,
  isActive: boolean,
}

export default TransactionItemMain
