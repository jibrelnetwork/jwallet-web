// @flow

import React from 'react'

import JText from 'components/base/JText'
import getTxFee from 'utils/transactions/getTxFee'

type Props = {|
  +addressNames: AddressNames,
  +selectedAsset: DigitalAsset,
  +formFieldValues: DigitalAssetsSendFormFields,
  +ownerAddress: OwnerAddress,
|}

function DigitalAssetsSendConfirmCard({
  addressNames,
  selectedAsset,
  formFieldValues,
  ownerAddress,
}: Props) {
  const {
    amount,
    gasLimit,
    gasPrice,
    recipient,
  }: DigitalAssetsSendFormFields = formFieldValues

  const {
    symbol,
    decimals,
  }: DigitalAsset = selectedAsset

  const toName: ?string = addressNames[recipient]
  const fromName: ?string = addressNames[ownerAddress]
  const fee: string = getTxFee(parseFloat(gasLimit), gasPrice, decimals)

  return (
    <div className='digital-assets-send-confirm-card'>
      <div className='content'>
        <div className='amount'>
          <JText
            value={`${amount} ${symbol}`}
            size='header'
            color='dark'
            weight='bold'
          />
        </div>
        <div className='fee'>
          <JText value={`Fee — ${fee} ETH`} color='gray' />
        </div>
        <div className='field'>
          <div className='direction'>
            <JText value={`From${fromName ? ` — ${fromName}` : ''}`} color='dark' />
          </div>
          <div className='address'>
            <JText value={ownerAddress} color='blue' />
          </div>
        </div>
        <div className='field'>
          <div className='direction'>
            <JText value={`To${toName ? ` — ${toName}` : ''}`} color='dark' />
          </div>
          <div className='address'>
            <JText value={recipient} color='blue' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DigitalAssetsSendConfirmCard
