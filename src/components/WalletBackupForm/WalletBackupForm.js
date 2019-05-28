// @flow strict

import React, { PureComponent } from 'react'
import { t } from 'ttag'
import { Field } from 'react-final-form'

import { fileSaver } from 'services'

import {
  JIcon,
  Button,
  JTextArea,
  JInputField,
} from 'components/base'

import walletBackupFormStyle from './walletBackupForm.m.scss'

type Props = {|
  +handleSubmit: (?SyntheticEvent<HTMLFormElement>) => ?Promise<?FormFields>,
  +values: FormFields,
  +name: string,
  +passphrase: ?string,
  +derivationPath: ?string,
  +isMnemonic: boolean,
|}

const BACKUP_TEXT = {
  SINGLE_DATA: t`Save a wallet backup phrase to a secure storage
  or write it down on the paper.`,
  PASSPHRASE: t`Save a wallet backup phrase and passphrase
  to a secure storage or write it down on the paper.`,
  DERIVATION_PATH: t`Save a wallet backup phrase and derivation path
  to a secure storage or write it down on the paper.`,
  ALL_FIELDS: t`Save a wallet backup phrase, passphrase, and derivation path
  to a secure storage or write it down on the paper.`,
}

function getBackupText(passphrase, derivationPath): string {
  if (passphrase && derivationPath) {
    return BACKUP_TEXT.ALL_FIELDS
  } else if (passphrase) {
    return BACKUP_TEXT.PASSPHRASE
  } else if (derivationPath) {
    return BACKUP_TEXT.DERIVATION_PATH
  }

  return BACKUP_TEXT.SINGLE_DATA
}

export class WalletBackupForm extends PureComponent<Props> {
  static defaultProps = {
    passphrase: null,
    derivationPath: null,
  }

  handleDownload = () => {
    const {
      values,
      passphrase,
      derivationPath,
    } = this.props

    fileSaver.saveTXT(
      `${values.data || ''}\n${passphrase || ''}\n${derivationPath || ''}`,
      'jwallet-backup',
    )
  }

  render() {
    const {
      handleSubmit,
      name,
      passphrase,
      derivationPath,
      isMnemonic,
    }: Props = this.props

    /* eslint-disable react/no-danger */
    return (
      <div className={`__wallet-backup-form ${walletBackupFormStyle.core}`}>
        <JIcon
          className={walletBackupFormStyle.icon}
          color='blue'
          name='ic_backup_48-use-fill'
        />
        <h2 className={walletBackupFormStyle.title}>{t`Back Up ${name}`}</h2>
        <p
          className={walletBackupFormStyle.text}
          dangerouslySetInnerHTML={{
            __html: getBackupText(
              passphrase,
              derivationPath,
            ).split('\n').join('<br />'),
          }}
        />
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
          <Button
            type='button'
            theme='general'
            className={walletBackupFormStyle.button}
            onClick={this.handleDownload}
          >
            {t`Download Backup as TXT`}
          </Button>
          <Button
            type='submit'
            theme='secondary'
          >
            {t`Done`}
          </Button>
        </form>
      </div>
    )
    /* eslint-enable react/no-danger */
  }
}
