// @flow

import React from 'react'

import { JButton, JFlatButton, JInput } from 'components/base'

const MnemonicConfirmStep = ({
  setMnemonicConfirm,
  setPrevStep,
  setNextStep,
  validFields,
  invalidFields,
  mnemonicConfirm,
}: Props) => (
  <div className='form'>
    <JInput
      onChange={setMnemonicConfirm}
      name='create-wallet-mnemonic-confirm'
      placeholder={i18n('routes.createWallet.placeholder.mnemonicConfirm')}
      value={mnemonicConfirm}
      errorMessage={invalidFields.mnemonicConfirm}
      successMessage={validFields.mnemonicConfirm}
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
          color='blue'
          text='routes.createWallet.buttonTitle.confirm'
          wide
        />
      </div>
    </div>
  </div>
)

type Props = {
  setMnemonicConfirm: (mnemonicConfirm: string) => Dispatch,
  setNextStep: () => Dispatch,
  setPrevStep: () => Dispatch,
  validFields: Object,
  invalidFields: Object,
  mnemonicConfirm: string,
}

export default MnemonicConfirmStep
