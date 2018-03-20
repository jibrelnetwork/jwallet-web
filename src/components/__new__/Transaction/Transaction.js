// @flow

import React from 'react'
import classNames from 'classnames'

import config from 'config'
import { handle, ignoreEvent } from 'utils'
import { JButton, JIcon } from 'components/base/__new__'

const TransactionItem = ({
  setActive,
  data,
  assetSymbol,
  activeTxHash,
}: Props) => {
  return (
    <div
      onClick={handle(setActive)(data.transactionHash)}
      className={classNames(
        'transaction',
        `-${data.type}`,
        { '-active': (data.transactionHash === activeTxHash) },
      )}
    >
      <div className='main-info'>
        <JIcon size='extra-large' name={`transaction-${data.type}`} />
        <div className='date'>
          <div className='label'>{'Date'}</div>
          <div className='value'>{data.date}</div>
        </div>
        <div className='address'>
          <div className='label'>{'Address'}</div>
          <div className='value'>{data.address}</div>
        </div>
        <div className='amount'>
          <div className='value'>{` + ${data.amount.toFixed(3)} ${assetSymbol}`}</div>
          <JButton onClick={ignoreEvent(console.log, data)} text='Repeat' iconName='repeat' />
        </div>
      </div>
      <div className='additional-info' onClick={ignoreEvent()}>
        <div className='item'>
          <div className='label'>{'Tx hash'}</div>
          <div className='value'>
            <a
              href={getTxLink(data.transactionHash)}
              target='_blank'
              rel='noopener noreferrer'
            >
              {data.transactionHash}
            </a>
          </div>
        </div>
        <div className='item'>
          <div className='label'>{'Comment'}</div>
          <div className='value'>{'Some comment'}</div>
        </div>
        <div className='item'>
          <div className='label'>{'Fee'}</div>
          <div className='value'>{`${data.fee} ETH`}</div>
        </div>
        <div className='actions'>
          <JButton onClick={console.log} text='Save as template' iconName='star' />
          <JButton onClick={console.log} text='Repeat' iconName='repeat' />
        </div>
      </div>
    </div>
  )
}

const getTxLink = (txHash: Hash) => `${config.blockExplorerLink}/tx/${txHash}`

type Props = {
  setActive: (txHash: Hash) => Dispatch,
  data: Transaction,
  assetSymbol: string,
  activeTxHash: ?Hash,
}

export default TransactionItem
