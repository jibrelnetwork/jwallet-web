// @flow

import React from 'react'

import { JButton, JTextInput } from 'components/base'
import { JCallout } from 'components/base/__new__'

const MnemonicStep = ({
  setName,
  setNextStep,
  invalidFields,
  mnemonic,
  name,
}: Props) => (
  <div className='create-wallet-step-mnemonic'>
    <JCallout text='routes.createWallet.alert.mnemonic' />
    <JTextInput
      onValueChange={setName}
      name='create-wallet-name'
      placeholder={i18n('routes.createWallet.placeholder.name')}
      value={name}
      errorMessage={invalidFields.name}
      editable
    />
    <JTextInput
      name='create-wallet-mnemonic'
      placeholder={i18n('routes.createWallet.placeholder.mnemonic')}
      value={mnemonic}
      editable
      readOnly
      multiline
      preventCopy
      unselectable
    />
    <JButton onClick={setNextStep} label={i18n('routes.createWallet.buttonTitle.save')} blue />
  </div>
)

type Props = {
  setName: (name: string) => Dispatch,
  setNextStep: () => Dispatch,
  invalidFields: Object,
  name: string,
  mnemonic: string,
}

export default MnemonicStep
