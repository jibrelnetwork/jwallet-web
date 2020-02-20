// @flow strict

import React, { Component } from 'react'
import { withI18n } from '@lingui/react'
import { type I18n } from '@lingui/core'

import {
  Form,
  Field,
  type FormRenderProps,
} from 'react-final-form'

import ofssetsStyle from 'styles/offsets.m.scss'
import walletsPlugin from 'store/plugins/walletsPlugin'
import { gaSendEvent } from 'utils/analytics'

import {
  getTypeByInput,
  checkNameExists,
} from 'utils/wallets'

import {
  JTextArea,
  JInputField,
  Button,
} from 'components/base'

import {
  TitleHeader,
  PasswordForm,
  MnemonicOptions,
} from 'components'

import styles from './walletsImport.m.scss'

import {
  getInfoDataMessage,
  getErrorDataMessage,
  getSuccessDataMessage,
} from './dataMessage'

export type WalletsImportBackHandler = () => void
export type WalletsImportStep = 'DATA' | 'PASSWORD'
type WalletsImportSteps = { [WalletsImportStep]: WalletsImportStep }

export type WalletsImportSubmitPayload = {|
  +goToPasswordStep: Function,
  +values: FormFields,
  +currentStep: WalletsImportStep,
|}

export type Props = {|
  onBack?: ?WalletsImportBackHandler,
  +submit: WalletsImportSubmitPayload => Promise<?FormFields>,
  +i18n: I18n,
  +hint: string,
  +hasWallets: boolean,
|}

type StateProps = {|
  +currentStep: WalletsImportStep,
|}

export const STEPS: WalletsImportSteps = {
  DATA: 'DATA',
  PASSWORD: 'PASSWORD',
}

const INITIAL_VALUES: FormFields = {
  name: '',
  data: '',
  password: '',
  passphrase: '',
  derivationPath: 'm/44\'/60\'/0\'/0',
  walletType: null,
}

function getInitialValues(): FormFields {
  return {
    ...INITIAL_VALUES,
    name: walletsPlugin.getNextWalletName(),
  }
}

class WalletsImportView extends Component<Props, StateProps> {
  static defaultProps = {
    onBack: null,
    hasWallets: false,
  }

  constructor(props: Props) {
    super(props)

    this.state = {
      currentStep: STEPS.DATA,
    }
  }

  componentDidMount() {
    gaSendEvent(
      'ImportWallet',
      'StartedImport',
      this.props.hasWallets ? 'additional' : 'new',
    )
  }

  setCurrentStep = (currentStep: WalletsImportStep) => {
    this.setState({ currentStep })

    if (currentStep === STEPS.PASSWORD) {
      gaSendEvent(
        'ImportWallet',
        'DataEntered',
      )
    }
  }

  getTitle = (): string => {
    const { i18n }: Props = this.props

    switch (this.state.currentStep) {
      case STEPS.DATA:
        return i18n._(
          'WalletsImport.import.title',
          null,
          { defaults: 'Import wallet' },
        )

      case STEPS.PASSWORD:
        return i18n._(
          'WalletsImport.password.title',
          null,
          { defaults: 'Enter Security Password to Protect Your Wallet' },
        )

      default:
        return ''
    }
  }

  goBack = () => {
    const { onBack }: Props = this.props

    return onBack ? onBack() : undefined
  }

  goToDataStep = () => {
    this.setCurrentStep(STEPS.DATA)
  }

  goToPasswordStep = () => {
    this.setCurrentStep(STEPS.PASSWORD)
  }

  handleBack = () => {
    if (!this.props.onBack) {
      return null
    }

    switch (this.state.currentStep) {
      case STEPS.DATA:
        return this.goBack

      case STEPS.PASSWORD:
        return this.goToDataStep

      default:
        return null
    }
  }

  handleChange = (change: FormFieldChange) => (event: SyntheticInputEvent<HTMLInputElement>) => {
    const data: string = (event.target.value || '').trim()
    const walletType: ?WalletCustomType = getTypeByInput(data)

    change('data', data)
    change('walletType', walletType)
  }

  handleFocus = () => {
    gaSendEvent(
      'ImportWallet',
      'NameStartedInput',
    )
  }

  handleSubmit = async (values: FormFields): Promise<?FormFields> => {
    const {
      goToPasswordStep,
      state,
    } = this

    const { submit }: Props = this.props
    const { currentStep }: StateProps = state

    return submit({
      goToPasswordStep,
      values,
      currentStep,
    })
  }

  renderDataStep = ({
    handleSubmit,
    form,
    values: {
      name = '',
      data = '',
      passphrase,
      derivationPath,
      walletType,
    } = {},
    submitting: isSubmitting,
  }: FormRenderProps) => {
    const { i18n }: Props = this.props

    const infoDataMessage: ?string = getInfoDataMessage(
      data,
      passphrase,
      derivationPath,
      walletType,
    )

    const errorDataMessage: ?string = getErrorDataMessage(
      data,
      passphrase,
      derivationPath,
      walletType,
    )

    const successDataMessage: ?string = getSuccessDataMessage(data)

    const DEFAULT_DATA_MESSAGE: string = i18n._(
      'WalletsImport.data.description.default',
      null,
      // eslint-disable-next-line max-len
      { defaults: 'Enter a private key or backup phrase of the wallet you want to import. You can also enter a public key or address to access wallet in read-only mode. We support: Ethereum address, Ethereum private key, BIP39 mnemonic, BIP32 XPUB, BIP44 XPRIV.' },
    )

    return (
      <form
        onSubmit={handleSubmit}
        className={styles.form}
      >
        <Field
          onFocus={this.handleFocus}
          component={JInputField}
          label={i18n._(
            'WalletsImport.name',
            null,
            { defaults: 'Wallet Name' },
          )}
          infoMessage={checkNameExists(name)}
          name='name'
          maxLength={32}
          isDisabled={isSubmitting}
        />
        <Field
          component={JTextArea}
          onChange={this.handleChange(form.change)}
          label={i18n._(
            'WalletsImport.data',
            null,
            { defaults: 'Address, Key, Mnemonic' },
          )}
          errorMessage={errorDataMessage}
          infoMessage={infoDataMessage || successDataMessage || DEFAULT_DATA_MESSAGE}
          name='data'
          isDisabled={isSubmitting}
        />
        {(walletType === 'mnemonic') && (
          <MnemonicOptions
            derivationPath={derivationPath}
            isFormDisabled={!!isSubmitting}
          />
        )}
        <Button
          className={ofssetsStyle.mt16}
          type='submit'
          isLoading={isSubmitting}
          isDisabled={!!infoDataMessage || !!errorDataMessage || !(name.trim() && data.trim())}
        >
          {i18n._(
            'WalletsImport.submit',
            null,
            { defaults: 'Import' },
          )}
        </Button>
      </form>
    )
  }

  renderPasswordStep = ({
    handleSubmit,
    values = {},
    submitting,
  }: FormRenderProps) => (
    <PasswordForm
      handleSubmit={handleSubmit}
      values={values}
      hint={this.props.hint}
      isSubmitting={submitting}
    />
  )

  renderForm = (formRenderProps: FormRenderProps) => {
    switch (this.state.currentStep) {
      case STEPS.DATA:
        return this.renderDataStep(formRenderProps)

      case STEPS.PASSWORD:
        return this.renderPasswordStep(formRenderProps)

      default:
        return null
    }
  }

  render() {
    return (
      <div className={styles.core}>
        <TitleHeader
          onBack={this.handleBack()}
          title={this.getTitle()}
        />
        <Form
          render={this.renderForm}
          onSubmit={this.handleSubmit}
          initialValues={getInitialValues()}
        />
      </div>
    )
  }
}

const WalletsImportViewEnhanced = withI18n()(WalletsImportView)
export { WalletsImportViewEnhanced as WalletsImportView }
