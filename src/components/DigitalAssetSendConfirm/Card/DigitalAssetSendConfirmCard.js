// @flow

import React from 'react'
import { JText } from 'components/base'

export type Props = {|
  +amount: string,
  +amountCurrency: string,
  +feeETH: string,
  +fromName: ?string,
  +fromAddress: string,
  +toName: ?string,
  +toAddress: string,
  // networkId: string, <- need for ETH address field in future
|}

const DigitalAssetSendConfirmCard = ({
  amount,
  amountCurrency,
  feeETH,
  fromName,
  fromAddress,
  toName,
  toAddress,
}: Props) => (
  <div className='digital-asset-send-confirm-card'>
    <div className='content'>
      <div className='amount'>
        <JText
          value={`${amount} ${amountCurrency}`}
          size='header'
          color='dark'
          weight='bold'
        />
      </div>
      <div className='fee'>
        <JText
          value={`Fee — ${feeETH}ETH`}
          color='gray'
        />
      </div>
      <div className='field'>
        <div className='direction'>
          <JText
            value={`From${fromName ? ` — ${fromName}` : ''}`}
            color='dark'
          />
        </div>
        <div className='address'>
          <JText
            value={`${fromAddress}`}
            color='blue'
          />
        </div>
      </div>
      <div className='field'>
        <div className='direction'>
          <JText
            value={`To${toName ? ` — ${toName}` : ''}`}
            color='dark'
          />
        </div>
        <div className='address'>
          <JText
            value={`${toAddress}`}
            color='blue'
          />
        </div>
      </div>
    </div>
  </div>
)

export default DigitalAssetSendConfirmCard
