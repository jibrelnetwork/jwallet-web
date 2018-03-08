// @flow

import React from 'react'

import { JButton, JCallout, JTextInput } from 'components/base'

const MnemonicConfirmStep = ({
  setMnemonicConfirm,
  setPrevStep,
  setNextStep,
  validFields,
  invalidFields,
  mnemonicConfirm,
}: Props) => (
  <div className='create-wallet-mnemonic-confirm-step'>
    <JCallout text='routes.createWallet.alert.mnemonicConfirm' />
    <JTextInput
      onValueChange={setMnemonicConfirm}
      name='create-wallet-mnemonic-confirm'
      placeholder={i18n('routes.createWallet.placeholder.mnemonicConfirm')}
      value={mnemonicConfirm}
      errorMessage={invalidFields.mnemonicConfirm}
      successMessage={validFields.mnemonicConfirm}
      editable
      multiline
    />
    <JButton onClick={setPrevStep} label={i18n('routes.createWallet.buttonTitle.prevStep')} blue />
    <JButton onClick={setNextStep} label={i18n('routes.createWallet.buttonTitle.confirm')} blue />
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
