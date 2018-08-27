// @flow

import React from 'react'
import { JFlatButton, JInput, JRaisedButton } from 'react-components'

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
      type='text'
      color='white'
      name='create-wallet-mnemonic-confirm'
      placeholder='routes.createWallet.placeholder.mnemonicConfirm'
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
