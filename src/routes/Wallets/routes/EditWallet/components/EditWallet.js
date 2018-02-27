// @flow

import React from 'react'

import EditWalletForm from './Form'
import EditWalletPassword from './Password'

import { STEPS } from '../modules/editWallet'

const EditWallet = (props: Props) => (
  <div className='edit-wallet-view'>
    {(props.currentStep === STEPS.FORM) && <EditWalletForm {...props} />}
    {(props.currentStep === STEPS.PASSWORD) && <EditWalletPassword {...props} />}
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
