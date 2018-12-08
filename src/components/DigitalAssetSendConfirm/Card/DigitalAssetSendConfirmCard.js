// @flow

import React from 'react'
import { JCard, JText } from 'components/base'

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
    <JCard color='white' isBorderRadius>
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
          value={`Fee - ${feeETH}ETH`}
          color='dark'
        />
      </div>
      <div className='from'>
        <JText
          value={`From${fromName ? ` - ${fromName}` : ''}`}
          color='dark'
        />
        <JText
          value={`${fromAddress}`}
          color='dark'
        />
      </div>
      <div className='to'>
        <JText
          value={`From${toName ? ` - ${toName}` : ''}`}
          color='dark'
        />
        <JText
          value={`${toAddress}`}
          color='dark'
        />
      </div>
    </JCard>
  </div>
)

export default DigitalAssetSendConfirmCard
