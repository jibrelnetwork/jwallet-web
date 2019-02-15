// @flow

import React from 'react'
import classNames from 'classnames'

import {
  t,
  jt,
} from 'ttag'

import JText from 'components/base/JText'
import getTxFee from 'utils/transactions/getTxFee'
import ethereum from 'data/assets/ethereum'

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
  }: DigitalAsset = selectedAsset

  const toName: ?string = addressNames[recipient]
  const fromName: ?string = addressNames[ownerAddress]
  const fee: string = getTxFee(
    parseFloat(gasLimit),
    String(gasPrice),
    // fee is calculated in Ethereum
    ethereum.blockchainParams.decimals
  )

  const hasComment: boolean = !!formFieldValues.comment
  const hasNonce: boolean = !!formFieldValues.nonce

  const boldWillFail = <b>{t`it will most likely fail`}</b>

  return (
    <div className='digital-assets-send-confirm-card'>
      <div className='content'>
        {isPotentiallyFail && (
          <div className='willfail'>
            {jt`Your transaction does not pass one or more check-ups, so we assume
              ${boldWillFail}. Please make sure you know what you are doing before proceeding`}
          </div>
        )}
        <div className='amount'>{`${amount} ${symbol}`}</div>
        <div className='fee'>
          <JText
            value={t`Fee — ${fee} ETH`}
            color='gray'
            whiteSpace='wrap'
          />
        </div>
        <div className='field'>
          <div className='title direction'>
            <JText
              value={`${t`From`}${fromName ? ` — ${fromName}` : ''}`}
              color='dark'
              whiteSpace='wrap'
            />
          </div>
          <div className='address'>
            <JText
              value={ownerAddress}
              color='blue-two'
              weight='bold'
              whiteSpace='wrap'
            />
          </div>
        </div>
        <div className={classNames('field', { '-spacer': hasComment || hasNonce })}>
          <div className='title direction'>
            <JText
              value={`${t`To`}${toName ? ` — ${toName}` : ''}`}
              color='dark'
              whiteSpace='wrap'
            />
          </div>
          <div className='address'>
            <JText
              value={recipient}
              color='blue-two'
              weight='bold'
              whiteSpace='wrap'
            />
          </div>
        </div>
        {hasComment && (
          <div className='field'>
            <div className='title'>
              <JText
                value={formFieldValues.comment}
                color='dark'
                whiteSpace='wrap'
              />
            </div>
          </div>
        )}
        {hasNonce && (
          <div className='field'>
            <div className='title'>
              <JText
                value={`${t`Nonce`}— ${formFieldValues.nonce}`}
                color='dark'
                whiteSpace='wrap'
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DigitalAssetsSendConfirmCard
