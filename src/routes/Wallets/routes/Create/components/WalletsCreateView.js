// @flow

import React from 'react'
import classNames from 'classnames'
import NameStep from 'components/NameStep'
<<<<<<< HEAD
=======
import AssetsStep from 'components/AssetsStep'
>>>>>>> 41a43040... Updating components call path

import { ModalHeader, PasswordStep } from 'components'

import MnemonicStep from './MnemonicStep'
import MnemonicConfirmStep from './MnemonicConfirmStep'
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
      {(props.currentStep === STEPS.PASSWORD) && (
        <PasswordStep
          {...props}
          inputColor='white'
          labelColor='white'
          buttonColor='blue'
        />
      )}
<<<<<<< HEAD
=======
      {(props.currentStep === STEPS.ASSETS) && <AssetsStep {...props} />}
>>>>>>> 41a43040... Updating components call path
    </div>
  </div>
)

type Props = {
  setName: Function,
  goToHome: Function,
  goToWallets: Function,
  setNextStep: Function,
  setPrevStep: Function,
  setPassword: Function,
  copyMnemonic: Function,
  saveMnemonic: Function,
  setPasswordConfirm: Function,
  setMnemonicConfirm: Function,
  validFields: FormFields,
  invalidFields: FormFields,
  name: string,
  mnemonic: string,
  password: string,
  passwordConfirm: string,
  mnemonicConfirm: string,
  currentStep: Index,
}

export default WalletsCreateView
