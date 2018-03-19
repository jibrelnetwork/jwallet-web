// @flow

import React from 'react'

import { STEPS } from '../modules/importWallet'

import DataStep from './DataStep'
import PasswordStep from './PasswordStep'
import AssetsStep from '../containers/AssetsStepContainer'

const ImportWallet = (props: Props) => (
  <div className='import-wallet-view'>
    {(props.currentStep === STEPS.DATA) && <DataStep {...props} />}
    {(props.currentStep === STEPS.PASSWORD) && <PasswordStep {...props} />}
    {(props.currentStep === STEPS.ASSETS) && <AssetsStep {...props} />}
  </div>
)

type Props = {
  setName: (name: string) => Dispatch,
  setData: (data: string) => Dispatch,
  setKnownDerivationPath: (knownDerivationPath: string) => Dispatch,
  setCustomDerivationPath: (customDerivationPath: string) => Dispatch,
  setPassword: (password: string) => Dispatch,
  setPasswordConfirm: (passwordConfirm: string) => Dispatch,
  setNextStep: () => Dispatch,
  setPrevStep: () => Dispatch,
  validFields: Object,
  invalidFields: Object,
  name: string,
  data: string,
  knownDerivationPath: string,
  customDerivationPath: string,
  password: string,
  passwordConfirm: string,
  currentStep: Index,
  totalSteps: Index,
  walletType?: WalletType,
}

ImportWallet.defaultProps = {
  walletType: undefined,
}

export default ImportWallet
