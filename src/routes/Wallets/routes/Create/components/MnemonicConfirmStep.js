// @flow

import React from 'react'

import { JFlatButton, JInput, JRaisedButton } from 'components/base'

const MnemonicConfirmStep = ({
  setPrevStep,
  setNextStep,
  setMnemonicConfirm,
  validFields,
  invalidFields,
  mnemonicConfirm,
}: Props) => (
  <div className='form'>
    <JInput
      onChange={setMnemonicConfirm}
      value={mnemonicConfirm}
      errorMessage={invalidFields.mnemonicConfirm}
      successMessage={validFields.mnemonicConfirm}
      color='blue'
      name='create-wallet-mnemonic-confirm'
      placeholder='routes.createWallet.placeholder.mnemonicConfirm'
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
          label='routes.createWallet.buttonTitle.confirm'
          isWide
        />
      </div>
    </div>
  </div>
)

type Props = {
  setNextStep: Function,
  setPrevStep: Function,
  setMnemonicConfirm: Function,
  validFields: FormFields,
  invalidFields: FormFields,
  mnemonicConfirm: string,
}

export default MnemonicConfirmStep
