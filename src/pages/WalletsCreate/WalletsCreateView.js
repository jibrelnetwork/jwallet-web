// @flow strict

import { t } from 'ttag'
import React, { Component } from 'react'

import ofssetsStyle from 'styles/offsets.m.scss'
import { type FormApi } from 'final-form'
import { gaSendEvent } from 'utils/analytics'
import { checkNameExists } from 'utils/wallets'
import { generateMnemonic } from 'utils/mnemonic'

import {
  Form,
  Field,
  type FormRenderProps,
} from 'react-final-form'

import {
  JIcon,
  Button,
  JCheckbox,
  JInputField,
} from 'components/base'

import {
  TitleHeader,
  WalletBackupForm,
  WalletPasswordForm,
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

const EVENTS = {
  NAME: null,
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

const BACKUP_TEXT: string = t`Jwallet never sends your wallets anywhere.
Therefore, in case of device loss or failure, the only way to restore access to your
funds is to use a wallet backup phrase.`

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
    const event: ?string = EVENTS[currentStep]

    if (event) {
      gaSendEvent('CreateWallet', event)
    }
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
    values: {
      name = '',
    } = {},
  }: FormRenderProps) => (
    <form
      onSubmit={handleSubmit}
      className={walletsCreateStyle.form}
    >
      <Field
        component={JInputField}
        label={t`Wallet Name`}
        infoMessage={checkNameExists(name)}
        name='name'
        isDisabled={isSubmitting}
      />
      <Button
        className={ofssetsStyle.mt16}
        type='submit'
        isLoading={isSubmitting}
        isDisabled={!name.trim()}
      >
        {t`Next`}
      </Button>
    </form>
  )

  /* eslint-disable react/no-danger */
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
      <p
        className={walletsCreateStyle.text}
        dangerouslySetInnerHTML={{
          __html: BACKUP_TEXT.split('\n').join('<br />'),
        }}
      />
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
        <Button
          type='submit'
          isDisabled={!(loseAccess && compromise)}
        >
          {t`Continue`}
        </Button>
      </form>
    </div>
  )
  /* eslint-enable react/no-danger */

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

      case STEPS.BACKUP_FORM: {
        const {
          name,
          data,
        }: FormFields = values

        return (
          <WalletBackupForm
            handleSubmit={handleSubmit}
            data={data || ''}
            name={name || ''}
            isMnemonic
          />
        )
      }

      case STEPS.PASSWORD:
        return (
          <WalletPasswordForm
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
          onSubmit={this.handleSubmit}
          render={this.renderWalletsCreateForm}
          initialValues={WALLETS_CREATE_INITIAL_VALUES}
        />
      </div>
    )
  }
}
