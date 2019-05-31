// @flow strict

import { t } from 'ttag'

import React, {
  Fragment,
  Component,
} from 'react'

import {
  Form,
  Field,
  type FormRenderProps,
} from 'react-final-form'

import ofssetsStyle from 'styles/offsets.m.scss'

import {
  getTypeByInput,
  checkNameExists,
  checkMnemonicType,
  validateDerivationPath,
} from 'utils/wallets'

import {
  JTextArea,
  JInputField,
  Button,
} from 'components/base'

import {
  TitleHeader,
  WalletPasswordForm,
} from 'components'

import walletsImportStyle from './walletsImport.m.scss'

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
  +hint: string,
|}

type StateProps = {|
  +currentStep: WalletsImportStep,
  +isAdvancedOpened: boolean,
|}

export const STEPS: WalletsImportSteps = {
  DATA: 'DATA',
  PASSWORD: 'PASSWORD',
}

const WALLETS_IMPORT_INITIAL_VALUES: FormFields = {
  name: '',
  data: '',
  password: '',
  passphrase: '',
  derivationPath: 'm/44\'/60\'/0\'/0',
  walletType: null,
}

const DEFAULT_DATA_MESSAGE: string = t`Enter a private key or backup phrase of the wallet you want 
to import. You can also enter a public key or address to access wallet in read-only mode. We 
support: Ethereum address, Ethereum private key, BIP39 mnemonic, BIP32 XPUB, BIP44 XPRIV.`

const DEFAULT_DERIVATION_PATH_MESSAGE: string = t`Derivation path and BIP39 mnemonic passphrase 
affect generation of blockchain addresses from mnemonic. Usually you need to edit them to import 
mnemonic from a hardwallet. In all other cases just leave it as is.`

export class WalletsImportView extends Component<Props, StateProps> {
  static defaultProps = {
    onBack: null,
  }

  constructor(props: Props) {
    super(props)

    this.state = {
      currentStep: STEPS.DATA,
      isAdvancedOpened: false,
    }
  }

  setCurrentStep = (currentStep: WalletsImportStep) => {
    this.setState({
      currentStep,
      isAdvancedOpened: false,
    })
  }

  getTitle = (): string => {
    switch (this.state.currentStep) {
      case STEPS.DATA:
        return t`Import wallet`

      case STEPS.PASSWORD:
        return t`Enter Security Password to Protect Your Wallet`

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

  handleOpenAdvanced = () => {
    this.setState({ isAdvancedOpened: true })
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

    this.setState({ isAdvancedOpened: false })
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

  renderWalletsImportDataStep = ({
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
    const { isAdvancedOpened }: StateProps = this.state

    return (
      <form
        onSubmit={handleSubmit}
        className={walletsImportStyle.form}
      >
        <Field
          component={JInputField}
          label={t`Wallet Name`}
          infoMessage={checkNameExists(name)}
          name='name'
          isDisabled={isSubmitting}
        />
        <Field
          component={JTextArea}
          onChange={this.handleChange(form.change)}
          label={t`Address, Key, Mnemonic`}
          errorMessage={errorDataMessage}
          infoMessage={infoDataMessage || successDataMessage || DEFAULT_DATA_MESSAGE}
          name='data'
          isDisabled={isSubmitting}
        />
        {checkMnemonicType(walletType) && (isAdvancedOpened ? (
          <Fragment>
            <Field
              component={JInputField}
              label={t`Mnemonic Passphrase (Optional)`}
              name='passphrase'
              isDisabled={isSubmitting}
            />
            <Field
              component={JInputField}
              label={t`Derivation Path (Optional)`}
              infoMessage={DEFAULT_DERIVATION_PATH_MESSAGE}
              errorMessage={validateDerivationPath(derivationPath)}
              name='derivationPath'
              isDisabled={isSubmitting}
            />
          </Fragment>
        ) : (
          <Button
            className={ofssetsStyle.mt16}
            theme='secondary'
            onClick={this.handleOpenAdvanced}
          >
            {t`Advanced`}
          </Button>
        ))}
        <Button
          className={ofssetsStyle.mt16}
          type='submit'
          isLoading={isSubmitting}
          isDisabled={!!infoDataMessage || !!errorDataMessage || !(name.trim() && data.trim())}
        >
          {t`Import`}
        </Button>
      </form>
    )
  }

  renderWalletsImportForm = (formRenderProps: FormRenderProps) => {
    switch (this.state.currentStep) {
      case STEPS.DATA:
        return this.renderWalletsImportDataStep(formRenderProps)

      case STEPS.PASSWORD: {
        const {
          handleSubmit,
          values = {},
          submitting,
        }: FormRenderProps = formRenderProps

        return (
          <WalletPasswordForm
            handleSubmit={handleSubmit}
            values={values}
            hint={this.props.hint}
            isSubmitting={submitting}
          />
        )
      }

      default:
        return null
    }
  }

  render() {
    return (
      <div className={walletsImportStyle.core}>
        <TitleHeader
          onBack={this.handleBack()}
          title={this.getTitle()}
        />
        <Form
          onSubmit={this.handleSubmit}
          render={this.renderWalletsImportForm}
          initialValues={WALLETS_IMPORT_INITIAL_VALUES}
        />
      </div>
    )
  }
}
