// @flow

import React from 'react'

import ethereum from 'data/assets/ethereum'
import AssetPicker from 'components/AssetPicker'
import { JButton, JInput } from 'components/base'

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
  alert,
  sender,
  assetAddress,
  amount,
  recipient,
  gas,
  gasPrice,
  nonce,
}: Props) => (
  <div className='form'>
    <div>{alert}</div>
    <JInput
      value={sender}
      color='white'
      name='send-funds-sender'
      placeholder='routes.sendFunds.placeholder.sender'
      isDisabled
    />
    <AssetPicker onSelect={setAsset} currentAsset={assetAddress} />
    <JInput
      onChange={setAmount}
      value={amount}
      errorMessage={invalidFields.amount}
      color='white'
      name='send-funds-amount'
      placeholder='routes.sendFunds.placeholder.amount'
    />
    <JInput
      onChange={setRecipient}
      value={recipient}
      errorMessage={invalidFields.recipient}
      color='white'
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
      <JButton onClick={setNextStep} text='routes.sendFunds.buttonTitleForm' wide />
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
  alert: ?string,
  sender: string,
  assetAddress: string,
  amount: string,
  recipient: string,
  gas: string,
  gasPrice: string,
  nonce: string,
}

FormStep.defaultProps = {
  setAsset: () => {},
  setAmount: () => {},
  setRecipient: () => {},
  setGas: () => {},
  setGasPrice: () => {},
  setNonce: () => {},
  setNextStep: () => {},
  invalidFields: {},
  alert: null,
  sender: '',
  assetAddress: ethereum.address,
  amount: '',
  recipient: '',
  gas: '',
  gasPrice: '',
  nonce: '',
}

export default FormStep
