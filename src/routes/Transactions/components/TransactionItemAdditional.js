// @flow

import React from 'react'
import classNames from 'classnames'
import { assoc } from 'ramda'
import { JRaisedButton, JText } from 'react-components'

import config from 'config'
import handle from 'utils/eventHandlers/handle'

const getTxLink = (txHash: Hash) => `${config.blockExplorerLink}/tx/${txHash}`

const TransactionItemAdditional = ({ repeat, data, assetSymbol, isActive }: Props) => (
  <div className={classNames('transaction-item-additional', isActive && '-active')}>
    <div className='item'>
      <div className='label'>
        <JText value='Tx hash' color='gray' />
      </div>
      <div className='value'>
        <a
          href={getTxLink(data.transactionHash)}
          target='_blank'
          className='link'
          rel='noopener noreferrer'
        >
          {data.transactionHash}
        </a>
      </div>
    </div>
    <div className='item'>
      <div className='label'>
        <JText value='Fee' color='gray' />
      </div>
      <div className='value'>
        <JText value={`${data.fee} ETH`} color='gray' />
      </div>
    </div>
    <div className='actions'>
      <div className='repeat'>
        <JRaisedButton
          onClick={handle(repeat)(assoc('symbol', assetSymbol)(data))}
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
  data: Transaction,
  assetSymbol: ?string,
  isActive: boolean,
}

export default TransactionItemAdditional
