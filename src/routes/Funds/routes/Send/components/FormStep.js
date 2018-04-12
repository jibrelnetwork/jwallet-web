import React from 'react'
import PropTypes from 'prop-types'

import JPicker from 'components/base/JPicker'
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
  <div className='form'>
    <div>{alert}</div>
    <JInput
      name='send-funds-sender'
      placeholder={i18n('routes.sendFunds.placeholder.sender')}
      value={sender}
      color='gray'
      disabled
    />
    <JPicker
      onValueChange={setAsset}
      selectedValue={assetAddress}
      placeholder={i18n('routes.sendFunds.placeholder.symbol')}
      name='send-funds-asset'
      enabled
    >
      {digitalAssets.map(({ address, symbol }) => (
        <JPicker.Item key={address} label={symbol} value={address} />
      ))}
    </JPicker>
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
      <JButton onClick={setNextStep} text='routes.sendFunds.buttonTitleForm' color='white' />
    </div>
  </div>
)

FormStep.propTypes = {
  setAsset: PropTypes.func.isRequired,
  setAmount: PropTypes.func.isRequired,
  setRecipient: PropTypes.func.isRequired,
  setGas: PropTypes.func.isRequired,
  setGasPrice: PropTypes.func.isRequired,
  setNonce: PropTypes.func.isRequired,
  setNextStep: PropTypes.func.isRequired,
  digitalAssets: PropTypes.arrayOf(PropTypes.object).isRequired,
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

export default FormStep
