// @flow strict

import React from 'react'
import { t } from 'ttag'
import { Field } from 'react-final-form'

import { fileSaver } from 'services'

import {
  JIcon,
  JTextArea,
  JInputField,
  JRaisedButton,
} from 'components/base'

import walletBackupFormStyle from './walletBackupForm.m.scss'

type Props = {|
  +handleSubmit: (?SyntheticEvent<HTMLFormElement>) => ?Promise<?Object>,
  +name: string,
  +passphrase: ?string,
  +derivationPath: ?string,
  +isMnemonic: boolean,
|}

const BACKUP_MNEMONIC_FIRST_LINE: string = t`Save a wallet backup phrase`
const BACKUP_MNEMONIC_SECOND_LINE: string = t`to a secure storage or write it down on the paper.`

const BACKUP_KEY_FIRST_LINE: string = t`Save a wallet backup phrase to a secure storage`
const BACKUP_KEY_SECOND_LINE: string = t`or write it down on the paper.`

const MNEMONIC_ATTRIBUTES: {[string]: string} = {
  passphrase: t` and passphrase`,
  derivationPath: t` and derivation path`,
  both: t`, passphrase and derivation path`,
}

function getMnemonicAttributesFirstLine(passphrase, derivationPath): string {
  if (passphrase && derivationPath) {
    return `${BACKUP_MNEMONIC_FIRST_LINE} ${MNEMONIC_ATTRIBUTES.both}`
  } else if (passphrase) {
    return `${BACKUP_MNEMONIC_FIRST_LINE} ${MNEMONIC_ATTRIBUTES.passphrase}`
  } else if (derivationPath) {
    return `${BACKUP_MNEMONIC_FIRST_LINE} ${MNEMONIC_ATTRIBUTES.derivationPath}`
  }

  return ''
}

function handleDownload({
  data,
  passphrase,
  derivationPath,
}: FormFields) {
  const content: string = `${data || ''}\n${passphrase || ''}\n${derivationPath || ''}`

  fileSaver.saveTXT(content, 'jwallet-backup')
}

export function WalletBackupForm({
  handleSubmit,
  name,
  passphrase,
  derivationPath,
  isMnemonic,
}: Props) {
  const hasMnemonicAttributes: boolean = !!(passphrase || derivationPath)

  return (
    <div className={`__wallet-backup-form ${walletBackupFormStyle.core}`}>
      <JIcon
        className={walletBackupFormStyle.icon}
        color='blue'
        name='ic_backup_48-use-fill'
      />
      <h2 className={walletBackupFormStyle.title}>{t`Back Up ${name}`}</h2>
      <p className={walletBackupFormStyle.text}>
        {hasMnemonicAttributes
          ? getMnemonicAttributesFirstLine(passphrase, derivationPath)
          : BACKUP_KEY_FIRST_LINE
        }
      </p>
      <p className={walletBackupFormStyle.text}>
        {hasMnemonicAttributes ? BACKUP_MNEMONIC_SECOND_LINE : BACKUP_KEY_SECOND_LINE}
      </p>
      <form
        onSubmit={handleSubmit}
        className={walletBackupFormStyle.form}
      >
        <Field
          component={JTextArea}
          className={walletBackupFormStyle.field}
          label={isMnemonic ? t`Mnemonic Phrase` : 'Private Key'}
          name='data'
          readOnly
        />
        {passphrase && (
          <Field
            component={JInputField}
            label={t`Passphrase`}
            className={walletBackupFormStyle.field}
            name='passphrase'
          />
        )}
        {derivationPath && (
          <Field
            component={JInputField}
            label={t`Derivation Path`}
            name='derivationPath'
          />
        )}
        <JRaisedButton
          type='button'
          theme='white'
          className={walletBackupFormStyle.button}
          onClick={handleDownload}
        >
          {t`Download Backup as TXT`}
        </JRaisedButton>
        <JRaisedButton
          type='submit'
          theme='blue'
        >
          {t`Done`}
        </JRaisedButton>
      </form>
    </div>
  )
}

WalletBackupForm.defaultProps = {
  passphrase: null,
  derivationPath: null,
}
