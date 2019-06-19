// @flow strict

import Promise from 'bluebird'
import React, { Component } from 'react'
import { t } from 'ttag'
import { isEmpty } from 'lodash-es'

import {
  Form,
  Field,
  type FormRenderProps,
} from 'react-final-form'

import ofssetsStyle from 'styles/offsets.m.scss'
import { gaSendEvent } from 'utils/analytics'
import { walletsPlugin } from 'store/plugins'

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
  UserActionInfo,
  MnemonicOptions,
  WalletPasswordForm,
} from 'components'

import walletsItemUpgradeStyle from './walletsItemUpgrade.m.scss'
import { getErrorDataMessage } from './WalletsItemUpgrade'

export type WalletsItemUpgradeStep = 'DATA' | 'PASSWORD' | 'FINISH'
type WalletsItemUpgradeSteps = { [WalletsItemUpgradeStep]: WalletsItemUpgradeStep }

type StateProps = {|
  +currentStep: WalletsItemUpgradeStep,
|}

export type Props = {|
  +goTo: (string) => any,
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

const DEFAULT_DATA_MESSAGE: string = t`To unlock all features you need to provide a wallet backup 
phrase apropriate for your wallet type: BIP39 Mnemonic, BIP32 XPRV, Ethereum Private Key. Other 
crypto wallets use many different synonyms to name it: "Recovery phrase", "Private key", 
"Mnemonic phrase" etc.`

export class WalletsItemUpgradeView extends Component<Props, StateProps> {
  constructor(props: Props) {
    super(props)

    this.state = {
      currentStep: STEPS.DATA,
    }
  }

  getTitle = (): string => {
    switch (this.state.currentStep) {
      case STEPS.DATA:
        return ''

      case STEPS.PASSWORD:
        return t`Enter Security Password`

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
    gaSendEvent('UnlockFeatures', 'DataEntered')
    this.setState({ currentStep: STEPS.PASSWORD })
  }

  goToFinishStep = () => {
    gaSendEvent('UnlockFeatures', 'WalletUpgraded')
    this.setState({ currentStep: STEPS.FINISH })
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

    const isXPUB: boolean = (type === 'xpub')
    const isMnemonicInputted: boolean = (getTypeByInput(data) === 'mnemonic')

    return (
      <form
        onSubmit={handleSubmit}
        className={walletsItemUpgradeStyle.form}
      >
        <UserActionInfo
          title={t`Your Wallet Is in Read-Only Mode`}
          iconClassName={walletsItemUpgradeStyle.icon}
          text={t`Add private key to get the full access to Jwallet features and send assets.`}
          iconName='ic_key_48-use-fill'
        />
        <Field
          component={JTextArea}
          label={t`Address, Key, Mnemonic`}
          errorMessage={errorDataMessage}
          infoMessage={DEFAULT_DATA_MESSAGE}
          name='data'
          isDisabled={isSubmitting}
        />
        {isXPUB && isMnemonicInputted && (
          <MnemonicOptions
            derivationPath={derivationPath}
            isFormDisabled={!!isSubmitting}
          />
        )}
        <Button
          className={ofssetsStyle.mt16}
          type='submit'
          isLoading={isSubmitting}
          isDisabled={!!errorDataMessage || !data}
        >
          {t`Unlock`}
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
      <WalletPasswordForm
        handleSubmit={handleSubmit}
        values={values}
        hint={this.props.hint}
        isSubmitting={submitting}
      />
    )
  }

  renderFinishStep = () => {
    const handleGoHome = this.goToHome

    return (
      <div className={walletsItemUpgradeStyle.finish}>
        <UserActionInfo
          title={t`Features Unlocked`}
          iconClassName={walletsItemUpgradeStyle.icon}
          text={t`Congratulations, you have full access to Jwallet features.
          Start using them now!`}
          iconName='ic_success_48-use-fill'
        />
        <div className={walletsItemUpgradeStyle.buttons}>
          <Button
            onClick={handleGoHome}
            theme='general'
          >
            {t`Go to Wallet`}
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
      <div className={walletsItemUpgradeStyle.core}>
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
