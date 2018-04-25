// @flow

import React from 'react'

import { ModalHeader, PasswordStep } from 'components'

import FormStep from './FormStep'
import { STEPS } from '../modules/editWallet'

const WalletsEditView = (props: Props) => (
  <div className='wallets-edit-view'>
    <ModalHeader title='Edit wallet' color='white' location='/wallets' />
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
  setName: Function,
  setPassword: Function,
  setNextStep: Function,
  setKnownDerivationPath: Function,
  setCustomDerivationPath: Function,
  validFields: FormFields,
  invalidFields: FormFields,
  name: string,
  password: string,
  walletType: ?WalletType,
  knownDerivationPath: string,
  customDerivationPath: string,
  selectedDerivationPathType: 'custom' | 'known',
  currentStep: Index,
}

export default WalletsEditView
