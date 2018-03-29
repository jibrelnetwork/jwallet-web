// @flow

import React from 'react'

import isMnemonicType from 'utils/isMnemonicType'
import { JButton, JInput } from 'components/base/__new__'

import ExpandableDerivationPath from './ExpandableDerivationPath'

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
  selectedDerivationPathType,
  walletType,
}: Props) => (
  <div className='form'>
    <JInput
      onChange={setName}
      value={name}
      name='edit-wallet-name'
      errorMessage={invalidFields.name}
      successMessage={validFields.name}
      placeholder={i18n('routes.editWallet.placeholder.name')}
    />
    {isMnemonicType(walletType) && (
      <ExpandableDerivationPath
        setKnownDerivationPath={setKnownDerivationPath}
        setCustomDerivationPath={setCustomDerivationPath}
        validFields={validFields}
        invalidFields={invalidFields}
        knownDerivationPath={knownDerivationPath}
        customDerivationPath={customDerivationPath}
        selectedDerivationPathType={selectedDerivationPathType}
      />
    )}
    <div className='actions'>
      <JButton
        onClick={setNextStep}
        text={'routes.editWallet.buttonTitle.save'}
        color='blue'
        large
      />
    </div>
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
  selectedDerivationPathType: 'custom' | 'known'
}

FormStep.defaultProps = {
  walletType: undefined,
}

export default FormStep
