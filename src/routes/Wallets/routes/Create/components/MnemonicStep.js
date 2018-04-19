// @flow

import React from 'react'

import { JButton, JFlatButton, JInput } from 'components/base'

const MnemonicStep = ({
  setPrevStep,
  setNextStep,
  mnemonic,
}: Props) => (
  <div className='form'>
    <JInput
      value={mnemonic}
      color='blue'
      name='create-wallet-mnemonic'
      placeholder='routes.createWallet.placeholder.mnemonic'
      disabled
    />
    <div className='actions'>
      <JFlatButton
        onClick={setPrevStep}
        iconName='arrow'
        text='routes.createWallet.buttonTitle.prevStep'
        transparent
      />
      <div className='next'>
        <JButton
          onClick={setNextStep}
          color='blue'
          text='routes.createWallet.buttonTitle.save'
          wide
        />
      </div>
    </div>
  </div>
)

type Props = {
  setNextStep: () => Dispatch,
  setPrevStep: () => Dispatch,
  mnemonic: string,
}

export default MnemonicStep
