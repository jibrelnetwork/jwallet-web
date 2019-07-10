// @flow

import React, { PureComponent } from 'react'
import { i18n } from 'i18n/lingui'

import {
  Form,
  Field,
} from 'react-final-form'

import { NewPasswordField } from 'components'

import {
  JInputField,
  Button,
} from 'components/base'

import {
  SubsettingsView,
  SubsettingsDescription,
} from 'pages/Settings/components'

import './paymentPassword.scss'

const text = {
  pageDescription: i18n._(
    'SettingsSecurityPassword.description',
    null,
    { defaults: 'You will use this password to unlock and transfer your funds. Keep it secure!' },
  ),
  passwordOld: i18n._(
    'SettingsSecurityPassword.oldPassword',
    null,
    { defaults: 'Old payment password' },
  ),
  passwordOldAlert: i18n._(
    'SettingsSecurityPassword.errors.oldPasswordRequired',
    null,
    { defaults: 'Old password is required' },
  ),
  passwordConfirmAlert: i18n._(
    'SettingsSecurityPassword.errors.passwordsNotMatch',
    null,
    { defaults: 'Password does not match confirmation' },
  ),
  passwordNotEqual: i18n._(
    'SettingsSecurityPassword.errors.passwordsNotEqual',
    null,
    { defaults: 'Not equal' },
  ),
  hint: i18n._(
    'SettingsSecurityPassword.hint',
    null,
    { defaults: 'Password hint' },
  ),
  hintAlert: i18n._(
    'SettingsSecurityPassword.errors.hintRequired',
    null,
    { defaults: 'Password hint is required' },
  ),
  hintAlertPassword: i18n._(
    'SettingsSecurityPassword.errors.hintEqualsPassword',
    null,
    { defaults: 'Password and hint should not be equal' },
  ),
}

const required = message => value => (value ? undefined : message)

type Props = {
  passwordForm: {
    messages: PaymentPasswordForm,
    isLoading: boolean,
  },
  submit: Function,
}

export default class PaymentPasswordView extends PureComponent<Props> {
  static defaultProps = {
    infoMessage: null,
    errorMessage: null,
  }

  handleSubmit = (formState: PaymentPasswordForm) => {
    const { passwordHint } = formState

    if (passwordHint === undefined || passwordHint.length < 1) {
      return { passwordHint: text.hintAlert }
    }

    this.props.submit(formState)

    return {}
  }

  validate = (formState: PaymentPasswordForm) => {
    const {
      passwordNew,
      passwordHint,
    } = formState

    const errors = {}

    /* eslint-disable fp/no-mutation */
    if (passwordHint && passwordHint.length === 0) {
      errors.passwordHint = text.hintAlert
    }

    if (passwordHint && passwordHint === passwordNew) {
      errors.passwordHint = text.hintAlertPassword
    }
    /* eslint-enable fp/no-mutation */

    return errors
  }

  render() {
    const { passwordForm } = this.props

    return (
      <SubsettingsView
        title={i18n._(
          'SettingsSecurityPassword.title',
          null,
          { defaults: 'Update payment password' },
        )}
      >
        <SubsettingsDescription text={text.pageDescription} />
        <Form
          onSubmit={this.handleSubmit}
          validate={this.validate}
          render={({
            handleSubmit,
            values,
            form: {
              change: handleFormChange,
              submit: handleFormSubmit,
            },
          }) => (
            <form className='password-form' onSubmit={handleSubmit}>
              <Field
                component={JInputField}
                name='passwordOld'
                label={text.passwordOld}
                placeholder={text.passwordOld}
                errorMessage={passwordForm.messages.passwordOld}
                color='gray'
                type='password'
                validate={required(text.passwordOldAlert)}
                isDisabled={this.props.passwordForm.isLoading}
                isAutoFocus
              />
              <NewPasswordField
                onChange={handleFormChange}
                values={values}
                errors={passwordForm.messages}
                placeholder='Enter Security Password'
                isLoading={passwordForm.isLoading}
              />
              <Field
                component={JInputField}
                name='passwordHint'
                label={text.hint}
                errorMessage={passwordForm.messages.passwordHint}
                placeholder={text.hint}
                color='gray'
                validate={required(text.hintAlert)}
                isDisabled={passwordForm.isLoading}
              />
              <Button
                onClick={handleFormSubmit}
                isLoading={passwordForm.isLoading}
                type='submit'
              >
                {i18n._(
                  'SettingsSecurityPassword.submit',
                  null,
                  { defaults: 'Set password' },
                )}
              </Button>
            </form>
          )}
        />
      </SubsettingsView>
    )
  }
}
