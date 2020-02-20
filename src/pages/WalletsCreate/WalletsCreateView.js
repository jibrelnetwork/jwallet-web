// @flow strict

import React, { Component } from 'react'
import { withI18n } from '@lingui/react'
import { type I18n } from '@lingui/core'

import ofssetsStyle from 'styles/offsets.m.scss'
import walletsPlugin from 'store/plugins/walletsPlugin'
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
  Button,
  JCheckbox,
  JInputField,
} from 'components/base'

import {
  TitleHeader,
  PasswordForm,
  UserActionInfo,
  WalletBackupForm,
} from 'components'

import styles from './walletsCreate.m.scss'

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
  +i18n: I18n,
  +hint: string,
  +createdBlockNumber: ?WalletCreatedBlockNumber,
  +hasWallets: boolean,
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

const INITIAL_VALUES: FormFields = {
  name: '',
  data: '',
  password: '',
  loseAccess: '',
  compromise: '',
}

function getInitialValues(): FormFields {
  return {
    ...INITIAL_VALUES,
    name: walletsPlugin.getNextWalletName(),
  }
}

class WalletsCreateView extends Component<Props, StateProps> {
  static defaultProps = {
    onBack: null,
    hasWallets: false,
  }

  constructor(props: Props) {
    super(props)

    this.state = {
      currentStep: STEPS.NAME,
    }
  }

  componentDidMount() {
    const {
      requestBlockNumbers,
      hasWallets,
    }: Props = this.props

    requestBlockNumbers()

    gaSendEvent(
      'CreateWallet',
      'StartedCreate',
      hasWallets ? 'additional' : 'new',
    )
  }

  setCurrentStep = (currentStep: WalletsCreateStep) => () => {
    this.setState({ currentStep })
    const event: ?string = EVENTS[currentStep]

    if (event) {
      gaSendEvent(
        'CreateWallet',
        event,
      )
    }
  }

  getTitle = (): string => {
    const { i18n } = this.props

    switch (this.state.currentStep) {
      case STEPS.NAME:
        return i18n._(
          'WalletsCreate.Create.title',
          null,
          { defaults: 'Create wallet' },
        )

      case STEPS.BACKUP_FORM:
      case STEPS.BACKUP_TICKS:
        return i18n._(
          'WalletsCreate.Backup.title',
          null,
          { defaults: 'Back Up Wallet' },
        )

      case STEPS.PASSWORD:
        return i18n._(
          'WalletsCreate.Password.title',
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

  handleFocus = () => {
    gaSendEvent(
      'CreateWallet',
      'NameStartedInput',
    )
  }

  renderNameStep = ({
    handleSubmit,
    submitting: isSubmitting,
    values: {
      name = '',
    } = {},
  }: FormRenderProps) => {
    const { i18n }: Props = this.props

    return (
      <form
        onSubmit={handleSubmit}
        className={styles.form}
      >
        <Field
          onFocus={this.handleFocus}
          component={JInputField}
          label={i18n._(
            'WalletsCreate.Create.name',
            null,
            { defaults: 'Wallet Name' },
          )}
          infoMessage={checkNameExists(name)}
          name='name'
          maxLength={32}
          isDisabled={isSubmitting}
        />
        <Button
          className={ofssetsStyle.mt16}
          type='submit'
          isLoading={isSubmitting}
          isDisabled={!name.trim()}
        >
          {i18n._(
            'WalletsCreate.Create.submit',
            null,
            { defaults: 'Next' },
          )}
        </Button>
      </form>
    )
  }

  renderTicksStep = ({
    handleSubmit,
    form,
    values: {
      loseAccess,
      compromise,
    } = {},
  }: FormRenderProps) => {
    const { i18n }: Props = this.props

    const BACKUP_TEXT: string = i18n._(
      'WalletsCreate.Backup.description',
      null,
      // eslint-disable-next-line max-len
      { defaults: 'Jwallet never sends your wallets anywhere. \nTherefore, in case of device loss or failure, the only way to restore access to your \nfunds is to use a wallet backup phrase.' },
    )

    return (
      <div className={styles.form}>
        <UserActionInfo
          text={BACKUP_TEXT}
          title={i18n._(
            'WalletsCreate.Backup.title',
            null,
            { defaults: 'Back Up Wallet' },
          )}
          iconClassName={styles.icon}
          iconName='ic_backup_48-use-fill'
        />
        <form
          onSubmit={handleSubmit}
          className={styles.ticks}
        >
          <JCheckbox
            name='loseAccess'
            onChange={this.handleChange(form.change, 'loseAccess')}
          >
            {i18n._(
              'WalletsCreate.Backup.loseAccess',
              null,
              // eslint-disable-next-line max-len
              { defaults: 'I understand that I will lose access to my funds if I loose wallet backup phrase.' },
            )}
          </JCheckbox>
          <JCheckbox
            name='compromise'
            onChange={this.handleChange(form.change, 'compromise')}
          >
            {i18n._(
              'WalletsCreate.Backup.compromise',
              null,
              // eslint-disable-next-line max-len
              { defaults: 'I understand that all my assets might be lost if my wallet backup phrase is \ncompromised.' },
            )}
          </JCheckbox>
          <p className={styles.note}>
            {i18n._(
              'WalletsCreate.Backup.beCareful',
              null,
              // eslint-disable-next-line max-len
              { defaults: 'Be very careful with wallet backup phrase — anyone who know it will get access to \nyour funds.' },
            )}
          </p>
          <Button
            type='submit'
            isDisabled={!(loseAccess && compromise)}
          >
            {i18n._(
              'WalletsCreate.Backup.submit',
              null,
              { defaults: 'Continue' },
            )}
          </Button>
        </form>
      </div>
    )
  }

  renderBackupStep = ({
    handleSubmit,
    values: {
      name,
      data,
    } = {},
  }: FormRenderProps) => (
    <WalletBackupForm
      handleSubmit={handleSubmit}
      data={data || ''}
      name={name || ''}
      isMnemonic
    />
  )

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
      case STEPS.NAME:
        return this.renderNameStep(formRenderProps)

      case STEPS.BACKUP_TICKS:
        return this.renderTicksStep(formRenderProps)

      case STEPS.BACKUP_FORM:
        return this.renderBackupStep(formRenderProps)

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

const WalletsCreateViewEnhanced = withI18n()(WalletsCreateView)
export { WalletsCreateViewEnhanced as WalletsCreateView }
