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
          inputColor='blue'
          buttonColor='blue'
          labelColor='white'
        />
      )}
    </div>
  </div>
)

type Props = {
  setPassword: (password: Password) => Dispatch,
  setNextStep: () => Dispatch,
  invalidFields: FormFields,
  password: Password,
  currentStep: Index,
}

WalletsBackupView.defaultProps = {
  setPassword: () => {},
  setNextStep: () => {},
  invalidFields: {},
  password: '',
  currentStep: 0,
}

export default WalletsBackupView
