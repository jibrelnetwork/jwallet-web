// @flow

import React from 'react'
import { JInput, JRaisedButton } from 'react-components'

import AssetPicker from 'components/AssetPicker'

import Optional from './Optional'

const FormStep = ({
  setAsset,
  setAmount,
  setRecipient,
  setGas,
  setGasPrice,
  setNonce,
  setNextStep,
  invalidFields,
  sender,
  assetAddress,
  amount,
  recipient,
  gas,
  gasPrice,
  nonce,
}: Props) => (
  <div className='form'>
    <JInput
      value={sender}
      placeholder={i18n('routes.sendFunds.placeholder.sender')}
      type='text'
      color='gray'
      name='send-funds-sender'
      isDisabled
    />
    <AssetPicker onSelect={setAsset} currentAsset={assetAddress} />
    <JInput
      onChange={setAmount}
      value={amount}
      placeholder={i18n('routes.sendFunds.placeholder.amount')}
      errorMessage={invalidFields.amount ? i18n(invalidFields.amount) : null}
      type='text'
      color='gray'
      name='send-funds-amount'
    />
    <JInput
      onChange={setRecipient}
      value={recipient}
      placeholder={i18n('routes.sendFunds.placeholder.recipient')}
      errorMessage={invalidFields.recipient ? i18n(invalidFields.recipient) : null}
      type='text'
      color='gray'
      name='send-funds-recipient'
    />
    <Optional
      setGas={setGas}
      setGasPrice={setGasPrice}
      setNonce={setNonce}
      invalidFields={invalidFields}
      gas={gas}
      gasPrice={gasPrice}
      nonce={nonce}
    />
    <div className='actions'>
      <JRaisedButton
        onClick={setNextStep}
        color='white'
        labelColor='blue'
        loaderColor='blue'
        label={i18n('routes.sendFunds.buttonTitleForm')}
        isWide
      />
    </div>
  </div>
)

type Props = {
  setAsset: Function,
  setAmount: Function,
  setRecipient: Function,
  setGas: Function,
  setGasPrice: Function,
  setNonce: Function,
  setNextStep: Function,
  invalidFields: FormFields,
  sender: string,
  assetAddress: string,
  amount: string,
  recipient: string,
  gas: string,
  gasPrice: string,
  nonce: string,
}

export default FormStep
