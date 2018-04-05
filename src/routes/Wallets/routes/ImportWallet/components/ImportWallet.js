// @flow

import React from 'react'
import classNames from 'classnames'

import { ModalHeader, PasswordStep } from 'components'

import DataStep from './DataStep'
import NameStep from '../../../components/NameStep'
import AssetsStep from '../../../containers/AssetsStepContainer'
import { STEPS } from '../modules/importWallet'

const ImportWallet = (props: Props) => (
  <div className={classNames('content', { '-assets': (props.currentStep === STEPS.ASSETS) })}>
    <div className='modal-header-wrapper'>
      <ModalHeader
        title='Import wallet'
        color='white'
        currentStep={props.currentStep + 1}
        totalSteps={Object.keys(STEPS).length}
      />
    </div>
    {(props.currentStep === STEPS.NAME) && <NameStep {...props} />}
    {(props.currentStep === STEPS.DATA) && <DataStep {...props} />}
    {(props.currentStep === STEPS.PASSWORD) && <PasswordStep {...props} color='blue' />}
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
  goToHome: () => Dispatch,
  goToWallets: () => Dispatch,
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
  selectedDerivationPathType: 'known' | 'custom',
}

ImportWallet.defaultProps = {
  walletType: undefined,
}

export default ImportWallet
