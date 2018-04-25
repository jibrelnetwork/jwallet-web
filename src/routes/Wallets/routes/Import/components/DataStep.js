// @flow

import React from 'react'

import handle from 'utils/eventHandlers/handle'
import isMnemonicType from 'utils/keystore/isMnemonicType'
import { DerivationPath, Expandable } from 'components'
import { JFlatButton, JInput, JRaisedButton } from 'components/base'

const DataStep = ({
  setData,
  setPrevStep,
  setNextStep,
  setKnownDerivationPath,
  setCustomDerivationPath,
  validFields,
  invalidFields,
  data,
  walletType,
  knownDerivationPath,
  customDerivationPath,
  selectedDerivationPathType,
}: Props) => (
  <div className='form'>
    <JInput
      onChange={setData}
      value={data}
      errorMessage={invalidFields.data}
      successMessage={validFields.data}
      type='text'
      color='white'
      name='import-wallet-data'
      placeholder='routes.importWallet.placeholder.data'
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
      <JFlatButton
        onClick={setPrevStep}
        iconName='arrow'
        iconSize='small'
        iconColor='white'
        label='routes.createWallet.buttonTitle.prevStep'
        isTransparent
      />
      <div className='next'>
        <JRaisedButton
          onClick={setNextStep}
          color='blue'
          label='routes.importWallet.buttonTitle.nextStep'
          isWide
        />
      </div>
    </div>
  </div>
)

type Props = {
  setData: Function,
  setPrevStep: Function,
  setNextStep: Function,
  setKnownDerivationPath: Function,
  setCustomDerivationPath: Function,
  validFields: FormFields,
  invalidFields: FormFields,
  data: string,
  walletType: ?WalletType,
  knownDerivationPath: string,
  customDerivationPath: string,
  selectedDerivationPathType: 'known' | 'custom'
}

export default DataStep
