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
      name='send-funds-sender'
      placeholder={i18n('routes.sendFunds.placeholder.sender')}
      value={sender}
      color='gray'
      disabled
    />
    <AssetPicker onSelect={setAsset} currentAsset={assetAddress} />
    <JInput
      onChange={setAmount}
      value={amount}
      errorMessage={invalidFields.amount}
      placeholder={i18n('routes.sendFunds.placeholder.amount')}
      color='gray'
      name='send-funds-amount'
    />
    <JInput
      onChange={setRecipient}
      value={recipient}
      placeholder={i18n('routes.sendFunds.placeholder.recipient')}
      errorMessage={invalidFields.recipient}
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
