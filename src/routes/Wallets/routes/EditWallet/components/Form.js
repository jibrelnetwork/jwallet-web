// @flow

import React from 'react'

import isMnemonicType from 'utils/isMnemonicType'
import { JButton, JTextInput } from 'components/base'

import FormDerivationPath from './DerivationPath'

const FormStep = ({
  setName,
  setKnownDerivationPath,
  setCustomDerivationPath,
  setNextStep,
  validFields,
  invalidFields,
  name,
  knownDerivationPath,
  customDerivationPath,
  walletType,
}: Props) => (
  <div className='edit-wallet-step-form'>
    <JTextInput
      onValueChange={setName}
      name='edit-wallet-name'
      placeholder={i18n('routes.editWallet.placeholder.name')}
      value={name}
      errorMessage={invalidFields.name}
      successMessage={validFields.name}
      editable
    />
    {isMnemonicType(walletType) && (
      <FormDerivationPath
        setKnownDerivationPath={setKnownDerivationPath}
        setCustomDerivationPath={setCustomDerivationPath}
        validFields={validFields}
        invalidFields={invalidFields}
        knownDerivationPath={knownDerivationPath}
        customDerivationPath={customDerivationPath}
      />
    )}
    <JButton onClick={setNextStep} label={i18n('routes.editWallet.buttonTitle.save')} blue />
  </div>
)

type Props = {
  setName: (name: string) => Dispatch,
  setKnownDerivationPath: (knownDerivationPath: string) => Dispatch,
  setCustomDerivationPath: (customDerivationPath: string) => Dispatch,
  setNextStep: () => Dispatch,
  validFields: Object,
  invalidFields: Object,
  name: string,
  knownDerivationPath: string,
  customDerivationPath: string,
  walletType?: WalletType,
}

FormStep.defaultProps = {
  walletType: undefined,
}

export default FormStep
