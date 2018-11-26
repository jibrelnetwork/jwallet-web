// @flow

import React from 'react'
import classNames from 'classnames'
import { assoc } from 'ramda'

import config from 'config'
import handle from 'utils/eventHandlers/handle'
import { JRaisedButton, JText } from 'components/base'

type Props = {|
  repeat: Function,
  data: Transaction,
  assetSymbol: ?string,
  isActive: boolean,
|}

const getTxLink = (txHash: Hash) => `${config.blockExplorerLink}/tx/${txHash}`

function TransactionItemDetails({ repeat, data, assetSymbol, isActive }: Props) {
  return (
    <div className={classNames('transaction-item-details', isActive && '-active')}>
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
}

export default TransactionItemDetails
