// @flow

import React from 'react'

import JText from 'components/base/JText'
import getTxFee from 'utils/transactions/getTxFee'

type Props = {|
  +addressNames: AddressNames,
  +selectedAsset: DigitalAsset,
  +formFieldValues: DigitalAssetsSendFormFields,
  +gasValues: GasValues,
  +ownerAddress: OwnerAddress,
  +isPotentiallyFail: boolean,
|}

function DigitalAssetsSendConfirmCard({
  addressNames,
  selectedAsset,
  formFieldValues,
  gasValues,
  ownerAddress,
  isPotentiallyFail,
}: Props) {
  const {
    amount,
    recipient,
  }: DigitalAssetsSendFormFields = formFieldValues

  const {
    gasLimit,
    gasPrice,
  }: GasValues = gasValues

  const {
    symbol,
    blockchainParams: {
      decimals,
    },
  }: DigitalAsset = selectedAsset

  const toName: ?string = addressNames[recipient]
  const fromName: ?string = addressNames[ownerAddress]
  const fee: string = getTxFee(parseFloat(gasLimit), String(gasPrice), decimals)

  return (
    <div className='digital-assets-send-confirm-card'>
      <div className='content'>
        {isPotentiallyFail &&
        <div className='willfail'>
          Your transaction does not pass one or more check-ups,
          so we assume <b>it will most likely fail</b>. Please make sure you
          know what you are doing before proceeding
        </div>}
        <div className='amount'>
          <JText
            value={`${amount} ${symbol}`}
            size='header'
            color='dark'
            weight='bold'
            whiteSpace='wrap'
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
