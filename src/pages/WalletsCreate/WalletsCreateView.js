// @flow strict

import { t } from 'ttag'
import React, { Component } from 'react'

import { type FormApi } from 'final-form'
import { gaSendEvent } from 'utils/analytics'
import { generateMnemonic } from 'utils/mnemonic'

import {
  Form,
  Field,
  type FormRenderProps,
} from 'react-final-form'

import {
  JIcon,
  JCheckbox,
  JInputField,
  JRaisedButton,
} from 'components/base'

import {
  TitleHeader,
  WalletBackupForm,
  NewWalletPasswordForm,
} from 'components'

import walletsCreateStyle from './walletsCreate.m.scss'

export type WalletsCreateBackHandler = () => void
export type WalletsCreateStep = 'NAME' | 'BACKUP_TICKS' | 'BACKUP_FORM' | 'PASSWORD'
type WalletsCreateSteps = { [WalletsCreateStep]: WalletsCreateStep }

export type WalletsCreateSubmitPayload = {|
  +setCurrentStep: Function,
  +values: FormFields,
  +currentStep: WalletsCreateStep,
  +createdBlockNumber: ?WalletCreatedBlockNumber,
|}

export type Props = {|
  +requestBlockNumbers: () => void,
  onBack?: ?WalletsCreateBackHandler,
  +validate: (FormFields, WalletsCreateStep) => ?FormFields,
  +submit: WalletsCreateSubmitPayload => Promise<?FormFields>,
  +hint: string,
  +createdBlockNumber: ?WalletCreatedBlockNumber,
|}

type StateProps = {|
  +currentStep: WalletsCreateStep,
|}

export const STEPS: WalletsCreateSteps = {
  NAME: 'NAME',
  BACKUP_TICKS: 'BACKUP_TICKS',
  BACKUP_FORM: 'BACKUP_FORM',
  PASSWORD: 'PASSWORD',
}

const EVENTS: { [WalletsCreateStep]: string } = {
  BACKUP_TICKS: 'NameEntered',
  BACKUP_FORM: 'BackupTicksConfirmed',
  PASSWORD: 'BackupCompleted',
}

const WALLETS_CREATE_INITIAL_VALUES: FormFields = {
  name: '',
  data: '',
  password: '',
  loseAccess: '',
  compromise: '',
}

const BACKUP_TEXT: string[] = t`Jwallet never sends your wallets anywhere.
Therefore, in case of device loss or failure, the only way to restore access to your
funds is to use a wallet backup phrase.`.split('\n')

export class WalletsCreateView extends Component<Props, StateProps> {
  static defaultProps = {
    onBack: null,
  }

  constructor(props: Props) {
    super(props)

    this.state = {
      currentStep: STEPS.NAME,
    }
  }

  componentDidMount() {
    this.props.requestBlockNumbers()
  }

  setCurrentStep = (currentStep: WalletsCreateStep) => () => {
    this.setState({ currentStep })
    gaSendEvent('CreateWallet', EVENTS[currentStep])
  }

  getTitle = (): string => {
    switch (this.state.currentStep) {
      case STEPS.NAME:
        return t`Create wallet`

      case STEPS.BACKUP_FORM:
      case STEPS.BACKUP_TICKS:
        return t`Backup wallet`

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

  validate = (values: FormFields): ?FormFields => {
    const { validate }: Props = this.props
    const { currentStep }: StateProps = this.state

    return validate(values, currentStep)
  }

  handleBack = () => {
    if (!this.props.onBack) {
      return null
    }

    switch (this.state.currentStep) {
      case STEPS.NAME:
        return this.goBack

      case STEPS.BACKUP_TICKS:
        return this.setCurrentStep(STEPS.NAME)

      case STEPS.BACKUP_FORM:
        return this.setCurrentStep(STEPS.BACKUP_TICKS)

      case STEPS.PASSWORD:
        return this.setCurrentStep(STEPS.BACKUP_FORM)

      default:
        return null
    }
  }

  handleSubmit = async (
    values: FormFields,
    { change }: FormApi,
  ): Promise<?FormFields> => {
    const {
      submit,
      createdBlockNumber,
    }: Props = this.props

    const { currentStep }: StateProps = this.state

    if (!values.data) {
      change('data', generateMnemonic())
    }

    return submit({
      values,
      currentStep,
      createdBlockNumber,
      setCurrentStep: this.setCurrentStep,
    })
  }

  handleChange = (onChange: (string, ?string) => void, name: string) => (isChecked: boolean) => {
    onChange(name, isChecked ? 'true' : null)
  }

  renderWalletNameForm = ({
    handleSubmit,
    submitting: isSubmitting,
  }: FormRenderProps) => (
    <form
      onSubmit={handleSubmit}
      className={walletsCreateStyle.form}
    >
      <Field
        component={JInputField}
        label={t`Wallet Name`}
        name='name'
        isDisabled={isSubmitting}
      />
      <JRaisedButton
        type='submit'
        isLoading={isSubmitting}
      >
        {t`Next`}
      </JRaisedButton>
    </form>
  )

  renderBackupTicksForm = ({
    handleSubmit,
    form,
    values: {
      loseAccess,
      compromise,
    } = {},
  }: FormRenderProps) => (
    <div className={walletsCreateStyle.form}>
      <JIcon
        className={walletsCreateStyle.icon}
        color='blue'
        name='ic_backup_48-use-fill'
      />
      <h2 className={walletsCreateStyle.title}>{t`Back Up Wallet`}</h2>
      {BACKUP_TEXT.map((text: string) => (
        <p
          key={text}
          className={walletsCreateStyle.text}
        >
          {text}
        </p>
      ))}
      <form
        onSubmit={handleSubmit}
        className={walletsCreateStyle.ticks}
      >
        <JCheckbox
          name='loseAccess'
          onChange={this.handleChange(form.change, 'loseAccess')}
        >
          {t`I understand that I will lose access to my funds if I loose wallet backup phrase.`}
        </JCheckbox>
        <JCheckbox
          name='compromise'
          onChange={this.handleChange(form.change, 'compromise')}
        >
          {t`I understand that all my assets might be lost if my wallet backup phrase is 
          compromised.`}
        </JCheckbox>
        <p className={walletsCreateStyle.note}>
          {t`Be very careful with wallet backup phrase — anyone who know it will get access to 
          your funds.`}
        </p>
        <JRaisedButton
          type='submit'
          isDisabled={!(loseAccess && compromise)}
        >
          {t`Next`}
        </JRaisedButton>
      </form>
    </div>
  )

  renderWalletsCreateForm = (formRenderProps: FormRenderProps) => {
    const {
      handleSubmit,
      values = {},
      submitting,
    }: FormRenderProps = formRenderProps

    switch (this.state.currentStep) {
      case STEPS.NAME:
        return this.renderWalletNameForm(formRenderProps)

      case STEPS.BACKUP_TICKS:
        return this.renderBackupTicksForm(formRenderProps)

      case STEPS.BACKUP_FORM:
        return (
          <WalletBackupForm
            handleSubmit={handleSubmit}
            name={values.name}
            isMnemonic
          />
        )

      case STEPS.PASSWORD:
        return (
          <NewWalletPasswordForm
            handleSubmit={handleSubmit}
            values={values}
            hint={this.props.hint}
            isSubmitting={submitting}
          />
        )

      default:
        return null
    }
  }

  render() {
    return (
      <div className={walletsCreateStyle.core}>
        <TitleHeader
          onBack={this.handleBack()}
          title={this.getTitle()}
        />
        <Form
          validate={this.validate}
          onSubmit={this.handleSubmit}
          render={this.renderWalletsCreateForm}
          initialValues={WALLETS_CREATE_INITIAL_VALUES}
        />
      </div>
    )
  }
}
