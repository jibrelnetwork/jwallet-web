// @flow

import React from 'react'

import handle from 'utils/eventHandlers/handle'
import isMnemonicType from 'utils/keystore/isMnemonicType'
import { JButton, JInput } from 'components/base'
import { DerivationPath, Expandable } from 'components'

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
      <Expandable title='Advanced' color='white'>
        <DerivationPath
          setKnownDerivationPath={handle(setKnownDerivationPath)}
          setCustomDerivationPath={setCustomDerivationPath}
          knownDerivationPath={knownDerivationPath}
          customDerivationPath={customDerivationPath}
          errorMessage={invalidFields.customDerivationPath}
          selectedDerivationPathType={selectedDerivationPathType}
        />
      </Expandable>
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
  walletType: ?WalletType,
  selectedDerivationPathType: 'custom' | 'known'
}

FormStep.defaultProps = {
  setName: () => {},
  setKnownDerivationPath: () => {},
  setCustomDerivationPath: () => {},
  setNextStep: () => {},
  validFields: {},
  invalidFields: {},
  name: '',
  knownDerivationPath: '',
  customDerivationPath: '',
  walletType: undefined,
  selectedDerivationPathType: 'custom',
}

export default FormStep
