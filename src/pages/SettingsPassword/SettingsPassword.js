// @flow strict

import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withI18n } from '@lingui/react'
import { type I18n } from '@lingui/core'

import {
  Form,
  type FormRenderProps,
} from 'react-final-form'

import { JLink } from 'components/base'
import { gaSendEvent } from 'utils/analytics'
import { walletsPlugin } from 'store/plugins'
import { selectPasswordHint } from 'store/selectors/password'

import {
  TitleHeader,
  UserActionInfo,
  NewPasswordForm,
  WalletPasswordForm,
} from 'components'

import styles from './settingsPassword.m.scss'

type SettingsPasswordStep = 'OLD' | 'NEW' | 'SUCCESS'

type Props = {|
  +i18n: I18n,
  +hint: string,
|}

type StateProps = {|
  +internalKey: ?Uint8Array,
  +currentStep: SettingsPasswordStep,
|}

const STEPS: { [SettingsPasswordStep]: SettingsPasswordStep } = {
  OLD: 'OLD',
  NEW: 'NEW',
  SUCCESS: 'SUCCESS',
}

class SettingsPasswordView extends Component<Props, StateProps> {
  constructor(props: Props) {
    super(props)

    this.state = {
      internalKey: null,
      currentStep: STEPS.OLD,
    }
  }

  getTitle = (): string => {
    const { i18n }: Props = this.props

    switch (this.state.currentStep) {
      case STEPS.OLD:
        return i18n._(
          'SettingsPassword.title.old',
          null,
          { defaults: 'Enter Security Password' },
        )

      case STEPS.NEW:
        return i18n._(
          'SettingsPassword.title.new',
          null,
          { defaults: 'Change Security Password' },
        )

      default:
        return ''
    }
  }

  handleSubmit = async (values: FormFields): Promise<?FormFields> => {
    const { i18n }: Props = this.props

    const {
      internalKey,
      currentStep,
    }: StateProps = this.state

    switch (currentStep) {
      case STEPS.OLD: {
        try {
          const internalKeyDec: ?Uint8Array = await walletsPlugin.getInternalKey(values.password)

          if (!internalKeyDec) {
            return {
              password: i18n._(
                'SettingsPassword.error.password',
                null,
                { defaults: 'Incorrect password.' },
              ),
            }
          }

          this.setState({
            internalKey: internalKeyDec,
            currentStep: STEPS.NEW,
          })

          gaSendEvent(
            'Settings',
            'OldPasswordEntered',
          )
        } catch (error) {
          return {
            password: error.message,
          }
        }

        return null
      }

      case STEPS.NEW: {
        await walletsPlugin.reEncryptWallets(
          internalKey,
          values.passwordNew || '',
          values.passwordHint || '',
        )

        this.setState({ currentStep: STEPS.SUCCESS })

        gaSendEvent(
          'Settings',
          'PasswordChanged',
        )

        return null
      }

      default:
        return null
    }
  }

  renderOldPasswordForm = ({
    handleSubmit,
    values = {},
    submitting,
  }: FormRenderProps) => (
    <WalletPasswordForm
      handleSubmit={handleSubmit}
      values={values}
      hint={this.props.hint}
      isSubmitting={submitting}
    />
  )

  renderOldStep = () => (
    <div className={styles.step}>
      <Form
        onSubmit={this.handleSubmit}
        render={this.renderOldPasswordForm}
      />
    </div>
  )

  renderNewStep = () => (
    <div className={styles.step}>
      <NewPasswordForm onSubmit={this.handleSubmit} />
    </div>
  )

  renderSuccessStep = () => {
    const { i18n }: Props = this.props

    return (
      <div className={styles.overlay}>
        <div className={styles.success}>
          <UserActionInfo
            text={i18n._(
              'SettingsPassword.success.text',
              null,
              {
                defaults: 'Congratulations! Your security password has been successfully changed.',
              },
            )}
            title={i18n._(
              'SettingsPassword.success.title',
              null,
              { defaults: 'Security Password Changed' },
            )}
            iconClassName={styles.icon}
            iconName='ic_success_48-use-fill'
          />
          <JLink
            className={styles.button}
            href='/'
            theme='button-general'
          >
            {i18n._(
              'SettingsPassword.success.button',
              null,
              { defaults: 'Go to Wallet' },
            )}
          </JLink>
        </div>
      </div>
    )
  }

  renderCurrentStep() {
    const { currentStep }: StateProps = this.state

    switch (currentStep) {
      case STEPS.OLD:
        return this.renderOldStep()

      case STEPS.NEW:
        return this.renderNewStep()

      case STEPS.SUCCESS:
        return this.renderSuccessStep()

      default:
        return null
    }
  }

  render() {
    return (
      <div className={styles.core}>
        <TitleHeader title={this.getTitle()} />
        {this.renderCurrentStep()}
      </div>
    )
  }
}

function mapStateToProps(state: AppState) {
  return {
    hint: selectPasswordHint(state),
  }
}

export const SettingsPassword = compose(
  withI18n(),
  connect<Props, OwnPropsEmpty, _, _, _, _>(mapStateToProps),
)(SettingsPasswordView)
