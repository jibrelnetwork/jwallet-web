// @flow

import React from 'react'

import FormStep from './FormStep'
import PasswordStep from './PasswordStep'

import { STEPS } from '../modules/editWallet'

const EditWallet = (props: Props) => (
  <div className='content'>
    {(props.currentStep === STEPS.FORM) && <FormStep {...props} />}
    {(props.currentStep === STEPS.PASSWORD) && <PasswordStep {...props} />}
  </div>
)

type Props = {
  setName: (name: string) => Dispatch,
  setKnownDerivationPath: (knownDerivationPath: string) => Dispatch,
  setCustomDerivationPath: (customDerivationPath: string) => Dispatch,
  setPassword: (password: Password) => Dispatch,
  setNextStep: () => Dispatch,
  validFields: Object,
  invalidFields: Object,
  name: string,
  knownDerivationPath: string,
  customDerivationPath: string,
  password: Password,
  currentStep: Index,
  walletType?: WalletType,
}

EditWallet.defaultProps = {
  walletType: undefined,
}

export default EditWallet
