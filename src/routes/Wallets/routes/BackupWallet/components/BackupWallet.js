// @flow

import React from 'react'

import { ModalHeader, PasswordStep } from 'components/__new__'

import FormStep from './FormStep'
import { STEPS } from '../modules/backupWallet'

const BackupWallet = (props: Props) => (
  <div className='content'>
    <div className='modal-header-wrapper'>
      <ModalHeader title='Backup wallet' color='white' />
    </div>
    {(props.currentStep === STEPS.FORM) && <FormStep {...props} />}
    {(props.currentStep === STEPS.PASSWORD) && <PasswordStep {...props} color='blue' />}
  </div>
)

type Props = {
  setPassword: (password: Password) => Dispatch,
  setNextStep: () => Dispatch,
  invalidFields: Object,
  password: Password,
  currentStep: Index,
}

export default BackupWallet
