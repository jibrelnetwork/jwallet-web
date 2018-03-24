// @flow

import React from 'react'

import { JButton, JInput } from 'components/base/__new__'

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
      <JButton
        onClick={setPrevStep}
        text={i18n('routes.createWallet.buttonTitle.prevStep')}
        color='white'
        iconSize='small'
        iconName='arrow-back'
        minimal
        transparent
      />
      <JButton
        onClick={setNextStep}
        text={i18n('routes.createWallet.buttonTitle.confirm')}
        color='blue'
        large
        right
      />
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
