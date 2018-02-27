// @flow

import React from 'react'

import { STEPS } from '../modules/importWallet'

import ImportWalletData from './Data'
import ImportWalletPassword from './Password'
import ImportWalletAssets from './Assets'

const ImportWallet = (props: Props) => (
  <div className='import-wallet-view'>
    {(props.currentStep === STEPS.DATA) && <ImportWalletData {...props} />}
    {(props.currentStep === STEPS.PASSWORD) && <ImportWalletPassword {...props} />}
    {(props.currentStep === STEPS.ASSETS) && <ImportWalletAssets {...props} />}
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
