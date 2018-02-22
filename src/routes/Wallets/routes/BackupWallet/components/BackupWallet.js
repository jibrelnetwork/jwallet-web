// @flow

import React from 'react'

import { JButton, JTextInput } from 'components/base'

const BackupWallet = ({ setPassword, backup, invalidFields, password }: Props) => (
  <div className='backup-wallet-view'>
    <JTextInput
      onValueChange={setPassword}
      value={password}
      name='backup-wallet-password'
      errorMessage={invalidFields.password}
      placeholder={i18n('routes.backupKeys.placeholder.password')}
      editable
      secureTextEntry
    />
    <JButton onClick={backup} label={i18n('routes.backupKeys.buttonTitle')} blue />
  </div>
)

type Props = {
  setPassword: (password: Password) => Dispatch,
  backup: () => Dispatch,
  invalidFields: Object,
  password: Password,
}

export default BackupWallet
