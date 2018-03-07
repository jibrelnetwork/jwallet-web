import React from 'react'
import PropTypes from 'prop-types'

import Form from './Form'
import Password from './Password'

import { STEPS } from '../modules/sendFunds'

const SendFunds = props => (
  <div className='send-funds-view'>
    {(props.currentStep === STEPS.FORM) && <Form {...props} />}
    {(props.currentStep === STEPS.PASSWORD) && <Password {...props} />}
  </div>
)

SendFunds.propTypes = {
  setAsset: PropTypes.func.isRequired,
  setAmount: PropTypes.func.isRequired,
  setRecipient: PropTypes.func.isRequired,
  setGas: PropTypes.func.isRequired,
  setGasPrice: PropTypes.func.isRequired,
  setNonce: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  send: PropTypes.func.isRequired,
  setNextStep: PropTypes.func.isRequired,
  digitalAssets: PropTypes.arrayOf(PropTypes.object).isRequired,
  invalidFields: PropTypes.shape({}).isRequired,
  alert: PropTypes.string.isRequired,
  assetAddress: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  recipient: PropTypes.string.isRequired,
  gas: PropTypes.string.isRequired,
  gasPrice: PropTypes.string.isRequired,
  nonce: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  currentStep: PropTypes.number.isRequired,
}

export default SendFunds
