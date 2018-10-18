// @flow

import React from 'react'
import NameStep from 'components/NameStep'

import classNames from 'classnames'

import { ModalHeader, PasswordStep } from 'components'
import DataStep from './DataStep'
import { STEPS } from '../modules/importWallet'

const WalletsImportView = (props: Props) => (
  <div
    className={classNames('wallets-import-view', (props.currentStep === STEPS.ASSETS) && '-assets')}
  >
    <ModalHeader
      title='Import wallet'
      color='white'
      location='/wallets'
      currentStep={props.currentStep + 1}
      totalSteps={Object.keys(STEPS).length}
    />
    <div className='content'>
      {(props.currentStep === STEPS.NAME) && <NameStep {...props} />}
      {(props.currentStep === STEPS.DATA) && <DataStep {...props} />}
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
  setName: (name: string) => Dispatch,
  setData: (data: string) => Dispatch,
  setKnownDerivationPath: (knownDerivationPath: string) => Dispatch,
  setCustomDerivationPath: (customDerivationPath: string) => Dispatch,
  setPassword: (password: string) => Dispatch,
  setPasswordConfirm: (passwordConfirm: string) => Dispatch,
  setNextStep: () => Dispatch,
  setPrevStep: () => Dispatch,
  goToHome: () => Dispatch,
  goToWallets: () => Dispatch,
  validFields: FormFields,
  invalidFields: FormFields,
  name: string,
  data: string,
  knownDerivationPath: string,
  customDerivationPath: string,
  password: string,
  passwordConfirm: string,
  currentStep: Index,
  totalSteps: Index,
  walletType: ?WalletType,
  selectedDerivationPathType: 'known' | 'custom',
}

WalletsImportView.defaultProps = {
  setName: () => {},
  setData: () => {},
  setKnownDerivationPath: () => {},
  setCustomDerivationPath: () => {},
  setPassword: () => {},
  setPasswordConfirm: () => {},
  setNextStep: () => {},
  setPrevStep: () => {},
  goToHome: () => {},
  goToWallets: () => {},
  validFields: {},
  invalidFields: {},
  name: '',
  data: '',
  knownDerivationPath: '',
  customDerivationPath: '',
  password: '',
  passwordConfirm: '',
  currentStep: 0,
  totalSteps: 0,
  walletType: undefined,
  selectedDerivationPathType: 'custom',
}

export default WalletsImportView
