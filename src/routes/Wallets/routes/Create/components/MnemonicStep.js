// @flow

import React from 'react'

import { JButton, JInput } from 'components/base'

const MnemonicStep = ({
  setPrevStep,
  setNextStep,
  mnemonic,
}: Props) => (
  <div className='form'>
    <JInput
      name='create-wallet-mnemonic'
      placeholder={i18n('routes.createWallet.placeholder.mnemonic')}
      value={mnemonic}
      disabled
    />
    <div className='actions'>
      <JButton
        onClick={setPrevStep}
        text={i18n('routes.createWallet.buttonTitle.prevStep')}
        color='white'
        iconSize='small'
        iconName='arrow'
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
  setNextStep: () => Dispatch,
  setPrevStep: () => Dispatch,
  mnemonic: string,
}

export default MnemonicStep
