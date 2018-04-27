// @flow

import React from 'react'

import { JFlatButton, JInput, JRaisedButton } from 'components/base'

const MnemonicStep = ({ setPrevStep, setNextStep, mnemonic }: Props) => (
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
        <JRaisedButton
          onClick={setNextStep}
          color='blue'
          label='routes.createWallet.buttonTitle.save'
          isWide
        />
      </div>
    </div>
  </div>
)

type Props = {
  setNextStep: Function,
  setPrevStep: Function,
  mnemonic: string,
}

export default MnemonicStep
