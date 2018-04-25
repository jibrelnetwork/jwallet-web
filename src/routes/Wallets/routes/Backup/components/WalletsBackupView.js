// @flow

import React from 'react'

import { ModalHeader, PasswordStep } from 'components'

import FormStep from './FormStep'
import { STEPS } from '../modules/backupWallet'

const WalletsBackupView = (props: Props) => (
  <div className='wallets-backup-view'>
    <ModalHeader title='Backup wallet' color='white' location='/wallets' />
    <div className='content'>
      {(props.currentStep === STEPS.FORM) && <FormStep {...props} />}
      {(props.currentStep === STEPS.PASSWORD) && (
        <PasswordStep
          {...props}
          inputColor='white'
          labelColor='white'
          buttonColor='blue'
        />
      )}
    </div>
  </div>
)

type Props = {
  setPassword: Function,
  setNextStep: Function,
  invalidFields: FormFields,
  password: string,
  currentStep: Index,
}

export default WalletsBackupView
