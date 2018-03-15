// @flow

import React from 'react'
import { Link } from 'react-router'

import { handle, isMnemonicType } from 'utils'
import { DerivationPath, Expandable } from 'components'
import { JButton, JTextInput } from 'components/base'
import { JCallout } from 'components/base/__new__'

const DataStep = ({
  setName,
  setData,
  setKnownDerivationPath,
  setCustomDerivationPath,
  setNextStep,
  validFields,
  invalidFields,
  name,
  data,
  knownDerivationPath,
  customDerivationPath,
  walletType,
}: Props) => (
  <div className='import-wallet-data-step'>
    <JCallout text='routes.importWallet.alert.data' />
    <JTextInput
      onValueChange={setName}
      name='import-wallet-name'
      placeholder={i18n('routes.importWallet.placeholder.name')}
      value={name}
      errorMessage={invalidFields.name}
      successMessage={validFields.name}
      editable
    />
    <JTextInput
      onValueChange={setData}
      name='import-wallet-data'
      placeholder={i18n('routes.importWallet.placeholder.data')}
      value={data}
      errorMessage={invalidFields.data}
      successMessage={validFields.data}
      editable
      multiline
    />
    {isMnemonicType(walletType) && (
      <Expandable>
        <DerivationPath
          setKnownDerivationPath={handle(setKnownDerivationPath)}
          setCustomDerivationPath={setCustomDerivationPath}
          knownDerivationPath={knownDerivationPath}
          customDerivationPath={customDerivationPath}
          errorMessage={invalidFields.customDerivationPath}
        />
      </Expandable>
    )}
    <Link to='/wallets'>{i18n('routes.importWallet.buttonTitle.prevStep')}</Link>
    <JButton onClick={setNextStep} label={i18n('routes.importWallet.buttonTitle.nextStep')} blue />
  </div>
)

type Props = {
  setName: (name: string) => Dispatch,
  setData: (data: string) => Dispatch,
  setKnownDerivationPath: (knownDerivationPath: string) => Dispatch,
  setCustomDerivationPath: (customDerivationPath: string) => Dispatch,
  setNextStep: () => Dispatch,
  validFields: Object,
  invalidFields: Object,
  name: string,
  data: string,
  knownDerivationPath: string,
  customDerivationPath: string,
  walletType?: WalletType,
}

DataStep.defaultProps = {
  walletType: undefined,
}

export default DataStep
