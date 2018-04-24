// @flow

import React from 'react'

import MnemonicPhrase from 'components/MnemonicPhrase'
import { JFlatButton, JInput, JRaisedButton } from 'components/base'

const MnemonicStep = ({ setPrevStep, setNextStep, mnemonic }: Props) => (
  <div className='form'>
    <MnemonicPhrase
      copy={console.log}
      download={console.log}
      mnemonic={mnemonic}
    />
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
