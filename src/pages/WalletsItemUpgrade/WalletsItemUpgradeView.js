// @flow strict

import Promise from 'bluebird'
import React, { Component } from 'react'
import { isEmpty } from 'lodash-es'
import { withI18n } from '@lingui/react'
import { type I18n } from '@lingui/core'

import {
  Form,
  Field,
  type FormRenderProps,
} from 'react-final-form'

import ofssetsStyle from 'styles/offsets.m.scss'
import { gaSendEvent } from 'utils/analytics'
import { walletsPlugin } from 'store/plugins'
import { getSuccessDataMessage } from 'pages/WalletsImport/dataMessage'

import {
  getTypeByInput,
  validateDerivationPath,
} from 'utils/wallets'

import {
  Button,
  JTextArea,
} from 'components/base'

import {
  TitleHeader,
  PasswordForm,
  UserActionInfo,
  MnemonicOptions,
} from 'components'

import styles from './walletsItemUpgrade.m.scss'
import { getErrorDataMessage } from './WalletsItemUpgrade'

export type WalletsItemUpgradeStep = 'DATA' | 'PASSWORD' | 'FINISH'
type WalletsItemUpgradeSteps = { [WalletsItemUpgradeStep]: WalletsItemUpgradeStep }

type StateProps = {|
  +currentStep: WalletsItemUpgradeStep,
|}

export type Props = {|
  +goTo: (string) => any,
  +i18n: I18n,
  +hint: string,
  +walletId: WalletId,
  +publicData: string,
  +type: WalletCustomType,
|}

export const STEPS: WalletsItemUpgradeSteps = {
  DATA: 'DATA',
  PASSWORD: 'PASSWORD',
  FINISH: 'FINISH',
}

const INITIAL_VALUES: FormFields = {
  data: '',
  password: '',
  passphrase: '',
  derivationPath: 'm/44\'/60\'/0\'/0',
}

class WalletsItemUpgradeView extends Component<Props, StateProps> {
  constructor(props: Props) {
    super(props)

    this.state = {
      currentStep: STEPS.DATA,
    }
  }

  getTitle = (): string => {
    const { i18n } = this.props

    switch (this.state.currentStep) {
      case STEPS.DATA:
        return ''

      case STEPS.PASSWORD:
        return i18n._(
          'WalletsItemUpgrade.password.title',
          null,
          { defaults: 'Enter Security Password' },
        )

      default:
        return ''
    }
  }

  goToHome = () => {
    this.props.goTo('Home')
  }

  goToWallets = () => {
    this.props.goTo('Wallets')
  }

  goToDataStep = () => {
    this.setState({ currentStep: STEPS.DATA })
  }

  goToPasswordStep = () => {
    this.setState({ currentStep: STEPS.PASSWORD })

    gaSendEvent(
      'UnlockFeatures',
      'DataEntered',
    )
  }

  goToFinishStep = () => {
    this.setState({ currentStep: STEPS.FINISH })

    gaSendEvent(
      'UnlockFeatures',
      'WalletUpgraded',
    )
  }

  handleBack = () => {
    switch (this.state.currentStep) {
      case STEPS.DATA:
        return this.goToWallets

      case STEPS.PASSWORD:
        return this.goToDataStep

      default:
        return null
    }
  }

  validate = (values: FormFields): ?FormFields => {
    const formErrors: FormFields = {}

    const {
      type,
      publicData,
    }: Props = this.props

    switch (this.state.currentStep) {
      case STEPS.DATA: {
        const validateWalletDataResult: ?string = getErrorDataMessage(
          type,
          publicData,
          values,
        )

        if (validateWalletDataResult) {
          formErrors.data = validateWalletDataResult
        }

        const data: string = (values.data || '').trim()
        const derivationPath: string = (values.derivationPath || '').trim()

        if (getTypeByInput(data) === 'mnemonic') {
          const validateDerPathResult: ?string = validateDerivationPath(derivationPath)

          if (validateDerPathResult) {
            formErrors.derivationPath = validateDerPathResult
          }
        }

        return formErrors
      }

      default:
        return null
    }
  }

  handleSubmit = async (values: FormFields): Promise<?FormFields> => {
    const validateErrors: ?FormFields = this.validate(values)

    if (!isEmpty(validateErrors)) {
      return validateErrors
    }

    switch (this.state.currentStep) {
      case STEPS.DATA:
        return this.goToPasswordStep()

      case STEPS.PASSWORD: {
        const submitErrors: ?FormFields = await walletsPlugin.upgradeWallet(
          this.props.walletId,
          values,
        )

        if (submitErrors) {
          return submitErrors
        }

        return this.goToFinishStep()
      }

      default:
        return null
    }
  }

  renderDataStep = ({
    handleSubmit,
    form,
    values = {},
    submitting: isSubmitting,
  }: FormRenderProps) => {
    const {
      i18n,
      type,
      publicData,
    }: Props = this.props

    const data: string = (values.data || '').trim()
    const derivationPath: string = (values.derivationPath || '').trim()

    const errorDataMessage: ?string = !data ? null : getErrorDataMessage(
      type,
      publicData,
      values,
    )

    const inputtedDataType: ?WalletCustomType = getTypeByInput(data)
    const isDPathError: boolean = !!derivationPath && !!validateDerivationPath(derivationPath)
    const isDisabled: boolean = !inputtedDataType || !!errorDataMessage || isDPathError
    const successDataMessage: ?string = isDisabled ? null : getSuccessDataMessage(data)

    const DEFAULT_DATA_MESSAGE: string = i18n._(
      'WalletsItemUpgrade.input.data.info',
      null,
      // eslint-disable-next-line max-len
      { defaults: 'To unlock all features you need to provide a wallet backup phrase apropriate for your wallet type: BIP39 Mnemonic, BIP32 XPRV, Ethereum Private Key. Other crypto wallets use many different synonyms to name it: "Recovery phrase", "Private key", "Mnemonic", "Mnemonic phrase" etc.' },
    )

    return (
      <form
        onSubmit={handleSubmit}
        className={styles.form}
      >
        <UserActionInfo
          title={i18n._(
            'WalletsItemUpgrade.data.title',
            null,
            { defaults: 'Your Wallet Is in Read-Only Mode' },
          )}
          iconClassName={styles.icon}
          text={i18n._(
            'WalletsItemUpgrade.data.description',
            null,
            // eslint-disable-next-line max-len
            { defaults: 'Add private key to get the full access to Jwallet features and send assets.' },
          )}
          iconName='ic_key_48-use-fill'
        />
        <Field
          component={JTextArea}
          label={i18n._(
            'WalletsItemUpgrade.input.data.title',
            null,
            { defaults: 'Backup Phrase' },
          )}
          errorMessage={errorDataMessage}
          infoMessage={successDataMessage || DEFAULT_DATA_MESSAGE}
          name='data'
          isDisabled={isSubmitting}
        />
        {(inputtedDataType === 'mnemonic') && (
          <MnemonicOptions
            derivationPath={derivationPath}
            isFormDisabled={!!isSubmitting}
          />
        )}
        <Button
          className={ofssetsStyle.mt16}
          type='submit'
          isDisabled={isDisabled}
          isLoading={isSubmitting}
        >
          {i18n._(
            'WalletsItemUpgrade.data.actions.submit',
            null,
            { defaults: 'Unlock' },
          )}
        </Button>
      </form>
    )
  }

  renderPasswordStep = (formRenderProps: FormRenderProps) => {
    const {
      handleSubmit,
      values = {},
      submitting,
    }: FormRenderProps = formRenderProps

    return (
      <PasswordForm
        handleSubmit={handleSubmit}
        values={values}
        hint={this.props.hint}
        isSubmitting={submitting}
      />
    )
  }

  renderFinishStep = () => {
    const { i18n }: Props = this.props
    const handleGoHome = this.goToHome

    return (
      <div className={styles.finish}>
        <UserActionInfo
          title={i18n._(
            'WalletsItemUpgrade.finish.title',
            null,
            { defaults: 'Features Unlocked' },
          )}
          iconClassName={styles.icon}
          text={i18n._(
            'WalletsItemUpgrade.finish.description',
            null,
            // eslint-disable-next-line max-len
            { defaults: 'Congratulations, you have full access to Jwallet features. \nStart using them now!' },
          )}
          iconName='ic_success_48-use-fill'
        />
        <div className={styles.buttons}>
          <Button
            onClick={handleGoHome}
            theme='general'
          >
            {i18n._(
              'WalletsItemUpgrade.finish.actions.submit',
              null,
              { defaults: 'Go to Wallet' },
            )}
          </Button>
        </div>
      </div>
    )
  }

  renderForm = (formRenderProps: FormRenderProps) => {
    switch (this.state.currentStep) {
      case STEPS.DATA:
        return this.renderDataStep(formRenderProps)

      case STEPS.PASSWORD:
        return this.renderPasswordStep(formRenderProps)

      case STEPS.FINISH:
        return this.renderFinishStep()

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
          initialValues={INITIAL_VALUES}
        />
      </div>
    )
  }
}

const WalletsItemUpgradeViewEnhanced = withI18n()(WalletsItemUpgradeView)
export { WalletsItemUpgradeViewEnhanced as WalletsItemUpgradeView }
