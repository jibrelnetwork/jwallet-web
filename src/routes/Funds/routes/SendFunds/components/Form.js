import React from 'react'
import PropTypes from 'prop-types'

import { JButton, JPicker, JTextInput } from 'components/base'

import Optional from './Optional'

const Form = ({
  setAsset,
  setAmount,
  setRecipient,
  setGas,
  setGasPrice,
  setNonce,
  setNextStep,
  digitalAssets,
  invalidFields,
  alert,
  sender,
  assetAddress,
  amount,
  recipient,
  gas,
  gasPrice,
  nonce,
}) => (
  <div className='send-funds-data-form'>
    <div>{alert}</div>
    <JTextInput
      name='send-funds-sender'
      placeholder={i18n('routes.sendFunds.placeholder.sender')}
      value={sender}
    />
    <JPicker
      onValueChange={setAsset}
      selectedValue={assetAddress}
      name='send-funds-asset'
      placeholder={i18n('routes.sendFunds.placeholder.symbol')}
      enabled
    >
      {digitalAssets.map(({ address, symbol }) => (
        <JPicker.Item key={address} label={symbol} value={address} />
      ))}
    </JPicker>
    <JTextInput
      onValueChange={setAmount}
      name='send-funds-amount'
      placeholder={i18n('routes.sendFunds.placeholder.amount')}
      value={amount}
      errorMessage={invalidFields.amount}
      editable
    />
    <JTextInput
      onValueChange={setRecipient}
      name='send-funds-recipient'
      placeholder={i18n('routes.sendFunds.placeholder.recipient')}
      value={recipient}
      errorMessage={invalidFields.recipient}
      editable
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
    <JButton onClick={setNextStep} label={i18n('routes.sendFunds.buttonTitleForm')} blue />
  </div>
)

Form.propTypes = {
  setAsset: PropTypes.func.isRequired,
  setAmount: PropTypes.func.isRequired,
  setRecipient: PropTypes.func.isRequired,
  setGas: PropTypes.func.isRequired,
  setGasPrice: PropTypes.func.isRequired,
  setNonce: PropTypes.func.isRequired,
  setNextStep: PropTypes.func.isRequired,
  digitalAssets: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  invalidFields: PropTypes.shape({}).isRequired,
  alert: PropTypes.string.isRequired,
  sender: PropTypes.string.isRequired,
  assetAddress: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  recipient: PropTypes.string.isRequired,
  gas: PropTypes.string.isRequired,
  gasPrice: PropTypes.string.isRequired,
  nonce: PropTypes.string.isRequired,
}

export default Form
