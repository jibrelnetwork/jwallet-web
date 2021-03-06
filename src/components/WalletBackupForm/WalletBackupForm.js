// @flow strict

import React, { PureComponent } from 'react'
import { withI18n } from '@lingui/react'
import { type I18n } from '@lingui/core'

import { fileSaver } from 'services'
import { Button } from 'components/base'
import { gaSendEvent } from 'utils/analytics'

import {
  CopyableField,
  UserActionInfo,
} from 'components'

import styles from './walletBackupForm.m.scss'

type Props = {|
  +handleSubmit: (?SyntheticEvent<HTMLFormElement>) => ?Promise<?FormFields>,
  +i18n: I18n,
  +data: string,
  +name: string,
  +passphrase: ?string,
  +derivationPath: ?string,
  +isMnemonic: boolean,
|}

class WalletBackupForm extends PureComponent<Props> {
  static defaultProps = {
    passphrase: null,
    derivationPath: null,
  }

  getBackupText = (
    passphrase: ?string,
    derivationPath: ?string,
  ) => {
    const { i18n }: Props = this.props

    const BACKUP_TEXT = {
      SINGLE_DATA: i18n._(
        'WalletBackupForm.backup.single',
        null,
        // eslint-disable-next-line max-len
        { defaults: 'Save a wallet backup phrase to a secure storage \nor write it down on the paper.' },
      ),
      PASSPHRASE: i18n._(
        'WalletBackupForm.backup.passphrase',
        null,
        // eslint-disable-next-line max-len
        { defaults: 'Save a wallet backup phrase and passphrase \nto a secure storage or write it down on the paper.' },
      ),
      DERIVATION_PATH: i18n._(
        'WalletBackupForm.backup.derivationPath',
        null,
        // eslint-disable-next-line max-len
        { defaults: 'Save a wallet backup phrase and derivation path \nto a secure storage or write it down on the paper.' },
      ),
      ALL_FIELDS: i18n._(
        'WalletBackupForm.backup.allFields',
        null,
        // eslint-disable-next-line max-len
        { defaults: 'Save a wallet backup phrase, passphrase, and derivation path \nto a secure storage or write it down on the paper.' },
      ),
    }

    if (passphrase && derivationPath) {
      return BACKUP_TEXT.ALL_FIELDS
    } else if (passphrase) {
      return BACKUP_TEXT.PASSPHRASE
    } else if (derivationPath) {
      return BACKUP_TEXT.DERIVATION_PATH
    }

    return BACKUP_TEXT.SINGLE_DATA
  }

  handleDownload = () => {
    const {
      data,
      passphrase,
      derivationPath,
    }: Props = this.props

    fileSaver.saveTXT(
      `${data || ''}\n${passphrase || ''}\n${derivationPath || ''}`,
      'jwallet-backup',
    )

    gaSendEvent(
      'BackupWallet',
      'BackupDownloaded',
    )
  }

  render() {
    const {
      handleSubmit,
      i18n,
      name,
      data,
      passphrase,
      derivationPath,
      isMnemonic,
    }: Props = this.props

    return (
      <div className={`__wallet-backup-form ${styles.core}`}>
        <UserActionInfo
          text={this.getBackupText(
            passphrase,
            derivationPath,
          )}
          title={i18n._(
            'WalletBackupForm',
            { name },
            { defaults: 'Back Up {name}' },
          )}
          iconClassName={styles.icon}
          iconName='ic_backup_48-use-fill'
        />
        <form
          onSubmit={handleSubmit}
          className={styles.form}
        >
          <div className={styles.fields}>
            <CopyableField
              value={data}
              label={i18n._(
                'WalletBackupForm.backupPhrase',
                null,
                { defaults: 'Backup Phrase' },
              )}
            />
            {isMnemonic && passphrase && (
              <CopyableField
                value={passphrase}
                label={i18n._(
                  'WalletBackupForm.passphrase',
                  null,
                  { defaults: 'Passphrase' },
                )}
              />
            )}
            {isMnemonic && derivationPath && (
              <CopyableField
                value={derivationPath}
                label={i18n._(
                  'WalletBackupForm.derivationPath',
                  null,
                  { defaults: 'Derivation Path' },
                )}
              />
            )}
          </div>
          <Button
            type='button'
            theme='secondary'
            className={styles.button}
            onClick={this.handleDownload}
          >
            {i18n._(
              'WalletBackupForm.download',
              null,
              { defaults: 'Download Backup as TXT' },
            )}
          </Button>
          <Button
            type='submit'
            theme='general'
          >
            {i18n._(
              'WalletBackupForm.done',
              null,
              { defaults: 'Done' },
            )}
          </Button>
        </form>
      </div>
    )
  }
}

const WalletBackupFormEnhanced = withI18n()(WalletBackupForm)
export { WalletBackupFormEnhanced as WalletBackupForm }
