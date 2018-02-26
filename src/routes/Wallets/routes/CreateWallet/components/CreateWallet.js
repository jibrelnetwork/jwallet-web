// @flow

import React from 'react'

import { STEPS } from '../modules/createWallet'

import CreateWalletMnemonic from './Mnemonic'
import CreateWalletMnemonicConfirm from './MnemonicConfirm'
import CreateWalletPassword from './Password'
import CreateWalletAssets from './Assets'

const CreateWallet = (props: Props) => (
  <div className='create-wallet-view'>
    {(props.currentStep === STEPS.MNEMONIC) && <CreateWalletMnemonic {...props} />}
    {(props.currentStep === STEPS.CONFIRM) && <CreateWalletMnemonicConfirm {...props} />}
    {(props.currentStep === STEPS.PASSWORD) && <CreateWalletPassword {...props} />}
    {(props.currentStep === STEPS.ASSETS) && <CreateWalletAssets {...props} />}
  </div>
)

type Props = {
  setMnemonicConfirm: (mnemonicConfirm: string) => Dispatch,
  setName: (name: string) => Dispatch,
  setPassword: (password: Password) => Dispatch,
  setPasswordConfirm: (passwordConfirm: Password) => Dispatch,
  setNextStep: () => Dispatch,
  setPrevStep: () => Dispatch,
  validFields: Object,
  invalidFields: Object,
  name: string,
  mnemonic: string,
  mnemonicConfirm: string,
  password: Password,
  passwordConfirm: Password,
  currentStep: Index,
}

export default CreateWallet
