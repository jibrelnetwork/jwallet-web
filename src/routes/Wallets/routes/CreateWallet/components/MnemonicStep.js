// @flow

import React from 'react'

import { JButton, JInput } from 'components/base/__new__'

const MnemonicStep = ({
  setName,
  setNextStep,
  goToWallets,
  invalidFields,
  mnemonic,
  name,
}: Props) => (
  <div className='form'>
    <JInput
      onChange={setName}
      name='create-wallet-name'
      placeholder={i18n('routes.createWallet.placeholder.name')}
      value={name}
      errorMessage={invalidFields.name}
    />
    <JInput
      name='create-wallet-mnemonic'
      placeholder={i18n('routes.createWallet.placeholder.mnemonic')}
      value={mnemonic}
      disabled
    />
    <div className='actions'>
      <JButton
        onClick={goToWallets}
        text={i18n('routes.createWallet.buttonTitle.prevStep')}
        color='white'
        iconSize='small'
        iconName='arrow-back'
        minimal
        transparent
      />
      <JButton
        onClick={setNextStep}
        text={i18n('routes.createWallet.buttonTitle.save')}
        color='blue'
        large
        right
      />
    </div>
  </div>
)

type Props = {
  setName: (name: string) => Dispatch,
  setNextStep: () => Dispatch,
  goToWallets: () => Dispatch,
  invalidFields: Object,
  name: string,
  mnemonic: string,
}

export default MnemonicStep
