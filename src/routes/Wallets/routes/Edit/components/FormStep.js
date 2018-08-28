// @flow

import React from 'react'

import handle from 'utils/eventHandlers/handle'
import checkMnemonicType from 'utils/keystore/checkMnemonicType'
import { JInput, JRaisedButton } from 'components/base'
import { DerivationPath, Expandable } from 'components'

const FormStep = ({
  setName,
  setNextStep,
  setKnownDerivationPath,
  setCustomDerivationPath,
  validFields,
  invalidFields,
  name,
  walletType,
  knownDerivationPath,
  customDerivationPath,
  selectedDerivationPathType,
}: Props) => (
  <div className='form'>
    <JInput
      onChange={setName}
      value={name}
      errorMessage={invalidFields.name}
      successMessage={validFields.name}
      type='text'
      color='white'
      name='edit-wallet-name'
      placeholder='routes.editWallet.placeholder.name'
    />
    {checkMnemonicType(walletType) && (
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
      <JRaisedButton
        onClick={setNextStep}
        color='blue'
        label='routes.editWallet.buttonTitle.save'
        isWide
      />
    </div>
  </div>
)

type Props = {
  setName: Function,
  setNextStep: Function,
  setKnownDerivationPath: Function,
  setCustomDerivationPath: Function,
  validFields: FormFields,
  invalidFields: FormFields,
  name: string,
  walletType: ?WalletType,
  knownDerivationPath: string,
  customDerivationPath: string,
  selectedDerivationPathType: 'custom' | 'known',
}

export default FormStep
