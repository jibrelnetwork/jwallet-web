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
      {(props.currentStep === STEPS.PASSWORD) && <PasswordStep {...props} color='blue' />}
    </div>
  </div>
)

type Props = {
  setName: (name: string) => Dispatch,
  setKnownDerivationPath: (knownDerivationPath: string) => Dispatch,
  setCustomDerivationPath: (customDerivationPath: string) => Dispatch,
  setPassword: (password: Password) => Dispatch,
  setNextStep: () => Dispatch,
  validFields: FormFields,
  invalidFields: FormFields,
  name: string,
  knownDerivationPath: string,
  customDerivationPath: string,
  password: Password,
  currentStep: Index,
  walletType: ?WalletType,
  selectedDerivationPathType: 'custom' | 'known'
}

WalletsEditView.defaultProps = {
  setName: () => {},
  setKnownDerivationPath: () => {},
  setCustomDerivationPath: () => {},
  setPassword: () => {},
  setNextStep: () => {},
  validFields: {},
  invalidFields: {},
  name: '',
  knownDerivationPath: '',
  customDerivationPath: '',
  password: '',
  currentStep: 0,
  walletType: undefined,
  selectedDerivationPathType: 'custom',
}

export default WalletsEditView
