// @flow

import React from 'react'

import AssetPicker from 'components/AssetPicker'
import { JInput, JRaisedButton } from 'components/base'

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
      type='text'
      color='gray'
      name='send-funds-sender'
      placeholder='routes.sendFunds.placeholder.sender'
      isDisabled
    />
    <AssetPicker onSelect={setAsset} currentAsset={assetAddress} />
    <JInput
      onChange={setAmount}
      value={amount}
      errorMessage={invalidFields.amount}
      type='text'
      color='gray'
      name='send-funds-amount'
      placeholder='routes.sendFunds.placeholder.amount'
    />
    <JInput
      onChange={setRecipient}
      value={recipient}
      errorMessage={invalidFields.recipient}
      type='text'
      color='gray'
      name='send-funds-recipient'
      placeholder='routes.sendFunds.placeholder.recipient'
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
        label='routes.sendFunds.buttonTitleForm'
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
