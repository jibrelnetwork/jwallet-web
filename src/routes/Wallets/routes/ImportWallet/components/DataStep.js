// @flow

import React from 'react'

import { handle, isMnemonicType } from 'utils'
import { DerivationPath, Expandable } from 'components'
import { JButton, JInput } from 'components/base/__new__'

const DataStep = ({
  setName,
  setData,
  setKnownDerivationPath,
  setCustomDerivationPath,
  setNextStep,
  goToWallets,
  validFields,
  invalidFields,
  name,
  data,
  knownDerivationPath,
  customDerivationPath,
  walletType,
}: Props) => (
  <div className='form'>
    <JInput
      onChange={setName}
      value={name}
      name='import-wallet-name'
      errorMessage={invalidFields.name}
      successMessage={validFields.name}
      placeholder={i18n('routes.importWallet.placeholder.name')}
    />
    <JInput
      onChange={setData}
      value={data}
      name='import-wallet-data'
      errorMessage={invalidFields.data}
      successMessage={validFields.data}
      placeholder={i18n('routes.importWallet.placeholder.data')}
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
    <div className='actions'>
      <JButton
        onClick={goToWallets}
        text={i18n('routes.importWallet.buttonTitle.prevStep')}
        iconName='arrow-back'
        iconSize='small'
        trasparent
      />
      <JButton
        onClick={setNextStep}
        text={i18n('routes.importWallet.buttonTitle.nextStep')}
        color='blue'
        large
        right
      />
    </div>
  </div>
)

type Props = {
  setName: (name: string) => Dispatch,
  setData: (data: string) => Dispatch,
  setKnownDerivationPath: (knownDerivationPath: string) => Dispatch,
  setCustomDerivationPath: (customDerivationPath: string) => Dispatch,
  setNextStep: () => Dispatch,
  goToWallets: () => Dispatch,
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
