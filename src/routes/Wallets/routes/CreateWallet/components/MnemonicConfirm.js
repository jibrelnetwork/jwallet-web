// @flow

import React from 'react'

import { JButton, JTextInput } from 'components/base'
import { JCallout } from 'components/base/__new__'

const MnemonicConfirmStep = ({
  setMnemonicConfirm,
  setPrevStep,
  setNextStep,
  validFields,
  invalidFields,
  mnemonicConfirm,
}: Props) => (
  <div className='create-wallet-step-mnemonic-confirm'>
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
