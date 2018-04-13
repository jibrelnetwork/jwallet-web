// @flow

import React from 'react'
import classNames from 'classnames'

import { ModalHeader, PasswordStep } from 'components'

import MnemonicStep from './MnemonicStep'
import NameStep from '../../../components/NameStep'
import MnemonicConfirmStep from './MnemonicConfirmStep'
import AssetsStep from '../../../components/AssetsStep'
import { STEPS } from '../modules/createWallet'

const WalletsCreateView = (props: Props) => (
  <div
    className={classNames('wallets-create-view', (props.currentStep === STEPS.ASSETS) && '-assets')}
  >
    <ModalHeader
      title='Create wallet'
      color='white'
      location='/wallets'
      currentStep={props.currentStep + 1}
      totalSteps={Object.keys(STEPS).length}
    />
    <div className='content'>
      {(props.currentStep === STEPS.NAME) && <NameStep {...props} />}
      {(props.currentStep === STEPS.MNEMONIC) && <MnemonicStep {...props} />}
      {(props.currentStep === STEPS.CONFIRM) && <MnemonicConfirmStep {...props} />}
      {(props.currentStep === STEPS.PASSWORD) && <PasswordStep {...props} color='blue' />}
      {(props.currentStep === STEPS.ASSETS) && <AssetsStep {...props} />}
    </div>
  </div>
)

type Props = {
  setMnemonicConfirm: (mnemonicConfirm: string) => Dispatch,
  setName: (name: string) => Dispatch,
  setPassword: (password: Password) => Dispatch,
  setPasswordConfirm: (passwordConfirm: Password) => Dispatch,
  setNextStep: () => Dispatch,
  setPrevStep: () => Dispatch,
  goToHome: () => Dispatch,
  goToWallets: () => Dispatch,
  validFields: FormFields,
  invalidFields: FormFields,
  name: string,
  mnemonic: string,
  mnemonicConfirm: string,
  password: Password,
  passwordConfirm: Password,
  currentStep: Index,
}

WalletsCreateView.defaultProps = {
  setMnemonicConfirm: () => {},
  setName: () => {},
  setPassword: () => {},
  setPasswordConfirm: () => {},
  setNextStep: () => {},
  setPrevStep: () => {},
  goToHome: () => {},
  goToWallets: () => {},
  validFields: {},
  invalidFields: {},
  name: '',
  mnemonic: '',
  mnemonicConfirm: '',
  password: '',
  passwordConfirm: '',
  currentStep: 0,
}

export default WalletsCreateView
