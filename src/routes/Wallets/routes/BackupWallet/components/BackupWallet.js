// @flow

import React from 'react'

import ModalHeader from 'components/__new__/ModalHeader'

import FormStep from './FormStep'
import PasswordStep from './PasswordStep'
import { STEPS } from '../modules/backupWallet'

const BackupWallet = (props: Props) => (
  <div className='content'>
    <ModalHeader title='Backup wallet' color='white' />
    {(props.currentStep === STEPS.FORM) && <FormStep {...props} />}
    {(props.currentStep === STEPS.PASSWORD) && <PasswordStep {...props} />}
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
