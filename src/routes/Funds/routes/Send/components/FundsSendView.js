// @flow

import React from 'react'

import ethereum from 'data/assets/ethereum'
import ModalLayout from 'layouts/ModalLayout'
import { ModalHeader, PasswordStep } from 'components'

import FormStep from './FormStep'
import { STEPS } from '../modules/sendFunds'

const FundsSendView = (props: Props) => (
  <ModalLayout>
    <div className='funds-send-view'>
      <div className='header'>
        <ModalHeader title='Send Funds' color='gray' withMenu />
      </div>
      <div className='content'>
        {(props.currentStep === STEPS.FORM) && <FormStep {...props} />}
        {(props.currentStep === STEPS.PASSWORD) && <PasswordStep {...props} />}
      </div>
    </div>
  </ModalLayout>
)

type Props = {
  setAsset: Function,
  setAmount: Function,
  setRecipient: Function,
  setGas: Function,
  setGasPrice: Function,
  setNonce: Function,
  setPassword: Function,
  setNextStep: Function,
  digitalAssets: DigitalAssets,
  invalidFields: FormFields,
  assetAddress: Address,
  alert: ?string,
  amount: string,
  recipient: string,
  gas: string,
  gasPrice: string,
  nonce: string,
  password: string,
  currentStep: Index,
}

FundsSendView.propTypes = {
  setAsset: () => {},
  setAmount: () => {},
  setRecipient: () => {},
  setGas: () => {},
  setGasPrice: () => {},
  setNonce: () => {},
  setPassword: () => {},
  setNextStep: () => {},
  digitalAssets: [],
  invalidFields: {},
  alert: null,
  assetAddress: ethereum.address,
  amount: '',
  recipient: '',
  gas: '',
  gasPrice: '',
  nonce: '',
  password: '',
  currentStep: 0,
}

export default FundsSendView
