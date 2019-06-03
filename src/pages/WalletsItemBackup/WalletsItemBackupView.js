// @flow strict

import Promise from 'bluebird'
import { t } from 'ttag'
import React, { Component } from 'react'

import { gaSendEvent } from 'utils/analytics'
import { walletsPlugin } from 'store/plugins'
import { checkMnemonicType } from 'utils/wallets'
import { WalletInconsistentDataError } from 'errors'

import {
  decryptData,
  decryptInternalKey,
  deriveKeyFromPassword,
} from 'utils/encryption'

import {
  Form,
  type FormRenderProps,
} from 'react-final-form'

import {
  TitleHeader,
  WalletBackupForm,
  WalletPasswordForm,
} from 'components'

import walletsItemBackupStyle from './walletsItemBackup.m.scss'

export type WalletsItemBackupStep = 'PASSWORD' | 'BACKUP_FORM'
type WalletsItemBackupSteps = { [WalletsItemBackupStep]: WalletsItemBackupStep }

export type WalletsItemBackupSubmitPayload = {|
  +setCurrentStep: Function,
  +values: FormFields,
  +currentStep: WalletsItemBackupStep,
|}

export type Props = {|
  +goHome: () => any,
  +internalKey: EncryptedData,
  +salt: string,
  +hint: string,
  +walletId: string,
|}

type StateProps = {|
  +name: string,
  +data: string,
  +passphrase: ?string,
  +derivationPath: ?string,
  +customType: ?WalletCustomType,
  +currentStep: WalletsItemBackupStep,
|}

export const STEPS: WalletsItemBackupSteps = {
  PASSWORD: 'PASSWORD',
  BACKUP_FORM: 'BACKUP_FORM',
}

const WALLETS_BACKUP_INITIAL_VALUES: FormFields = {
  password: '',
}

export class WalletsItemBackupView extends Component<Props, StateProps> {
  constructor(props: Props) {
    super(props)

    this.state = {
      name: '',
      data: '',
      passphrase: '',
      derivationPath: '',
      currentStep: STEPS.PASSWORD,
      customType: null,
    }
  }

  getTitle = (): string => {
    switch (this.state.currentStep) {
      case STEPS.PASSWORD:
        return t`Enter Security Password`

      case STEPS.BACKUP_FORM:
        return t`Backup wallet`

      default:
        return ''
    }
  }

  handleData = (
    data: ?EncryptedData,
    key: Uint8Array,
  ) => {
    if (!data) {
      throw new WalletInconsistentDataError()
    }

    this.setState({
      data: decryptData({
        key,
        data,
      }),
    })
  }

  handleMnemonicData = (
    mnemonic: ?EncryptedData,
    passphrase: ?EncryptedData,
    derivationPath: ?string,
    key: Uint8Array,
  ) => {
    if (!(mnemonic && passphrase)) {
      throw new WalletInconsistentDataError()
    }

    this.setState({
      data: decryptData({
        key,
        data: mnemonic,
      }),
      passphrase: decryptData({
        key,
        data: passphrase,
      }),
      derivationPath: derivationPath || 'm/44\'/60\'/0\'/0',
    })
  }

  handleSubmit = async (values: FormFields): Promise<?FormFields> => {
    const {
      goHome,
      walletId,
      internalKey,
      salt,
    }: Props = this.props

    switch (this.state.currentStep) {
      case STEPS.PASSWORD: {
        const {
          encrypted,
          name,
          customType,
          derivationPath,
        }: Wallet = walletsPlugin.getWallet(walletId)

        const derivedKey: Uint8Array = await deriveKeyFromPassword(
          values.password || '',
          salt,
        )

        try {
          const internalKeyDec: Uint8Array = decryptInternalKey(
            internalKey,
            derivedKey,
          )

          this.setState({
            name,
            customType,
          })

          switch (customType) {
            case 'privateKey': {
              this.handleData(
                encrypted.privateKey,
                internalKeyDec,
              )

              break
            }

            case 'xprv': {
              this.handleData(
                encrypted.xprv,
                internalKeyDec,
              )

              break
            }

            case 'mnemonic': {
              this.handleMnemonicData(
                encrypted.mnemonic,
                encrypted.passphrase,
                derivationPath,
                internalKeyDec,
              )

              break
            }

            default:
              break
          }

          this.setState({ currentStep: STEPS.BACKUP_FORM })

          gaSendEvent(
            'BackupWallet',
            'PasswordEntered',
          )
        } catch (error) {
          return {
            password: 'Invalid password',
          }
        }

        return null
      }

      case STEPS.BACKUP_FORM:
        return goHome()

      default:
        return null
    }
  }

  renderWalletsItemBackupForm = (formRenderProps: FormRenderProps) => {
    const {
      name,
      data,
      customType,
      passphrase,
      currentStep,
      derivationPath,
    }: StateProps = this.state

    const {
      handleSubmit,
      values = {},
      submitting,
    }: FormRenderProps = formRenderProps

    switch (currentStep) {
      case STEPS.PASSWORD:
        return (
          <WalletPasswordForm
            handleSubmit={handleSubmit}
            values={values}
            hint={this.props.hint}
            isSubmitting={submitting}
          />
        )

      case STEPS.BACKUP_FORM:
        return (
          <WalletBackupForm
            handleSubmit={handleSubmit}
            name={name}
            data={data}
            passphrase={passphrase}
            derivationPath={derivationPath}
            isMnemonic={checkMnemonicType(customType)}
          />
        )

      default:
        return null
    }
  }

  render() {
    return (
      <div className={walletsItemBackupStyle.core}>
        <TitleHeader title={this.getTitle()} />
        <Form
          onSubmit={this.handleSubmit}
          render={this.renderWalletsItemBackupForm}
          initialValues={WALLETS_BACKUP_INITIAL_VALUES}
        />
      </div>
    )
  }
}
