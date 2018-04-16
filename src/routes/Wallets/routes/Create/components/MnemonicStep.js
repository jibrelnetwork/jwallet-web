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
      name='create-wallet-mnemonic'
      placeholder={i18n('routes.createWallet.placeholder.mnemonic')}
      value={mnemonic}
      disabled
    />
    <div className='actions'>
      <JFlatButton
        onClick={setPrevStep}
        text={'routes.createWallet.buttonTitle.prevStep'}
        iconName='arrow'
        transparent
      />
      <div className='next'>
        <JButton
          onClick={setNextStep}
          text={i18n('routes.createWallet.buttonTitle.save')}
          color='blue'
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
