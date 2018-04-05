import React from 'react'
import PropTypes from 'prop-types'

import ModalLayout from 'layouts/ModalLayout'
import { ModalHeader, PasswordStep } from 'components'

import FormStep from './FormStep'
import { STEPS } from '../modules/sendFunds'

const SendFunds = props => (
  <ModalLayout>
    <div className='modal-header-wrapper'>
      <ModalHeader title='Send Funds' color='gray' withMenu />
    </div>
    <div className='content'>
      {(props.currentStep === STEPS.FORM) && <FormStep {...props} />}
      {(props.currentStep === STEPS.PASSWORD) && <PasswordStep {...props} />}
    </div>
  </ModalLayout>
)

SendFunds.propTypes = {
  setAsset: PropTypes.func.isRequired,
  setAmount: PropTypes.func.isRequired,
  setRecipient: PropTypes.func.isRequired,
  setGas: PropTypes.func.isRequired,
  setGasPrice: PropTypes.func.isRequired,
  setNonce: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
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
