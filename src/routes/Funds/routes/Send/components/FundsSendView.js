// @flow

import React from 'react'

import ModalLayout from 'layouts/ModalLayout'
import { ModalHeader, PasswordStep } from 'components'

import FormStep from './FormStep'
import { STEPS } from '../modules/sendFunds'

const FundsSendView = (props: Props) => (
  <ModalLayout>
    <div className='funds-send-view'>
      <ModalHeader title='Send Funds' color='gray' withMenu />
      <div className='content'>
        {(props.currentStep === STEPS.FORM) && <FormStep {...props} />}
        {(props.currentStep === STEPS.PASSWORD) && (
          <PasswordStep
            {...props}
            inputColor='gray'
            labelColor='blue'
            loaderColor='blue'
            buttonColor='white'
            isLoading={props.isSending}
          />
        )}
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
  invalidFields: FormFields,
  assetAddress: Address,
  sender: string,
  amount: string,
  recipient: string,
  gas: string,
  gasPrice: string,
  nonce: string,
  password: string,
  currentStep: Index,
  isSending: boolean,
}

export default FundsSendView
