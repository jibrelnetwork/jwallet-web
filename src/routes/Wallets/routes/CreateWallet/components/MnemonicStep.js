// @flow

import React from 'react'
import { Link } from 'react-router'

import { JButton, JCallout, JTextInput } from 'components/base'

const MnemonicStep = ({
  setName,
  setNextStep,
  invalidFields,
  mnemonic,
  name,
}: Props) => (
  <div className='create-wallet-mnemonic-step'>
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
    <Link to='/wallets'>{i18n('routes.createWallet.buttonTitle.prevStep')}</Link>
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
