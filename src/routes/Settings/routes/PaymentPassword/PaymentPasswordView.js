// @flow

import React, { PureComponent } from 'react'
import { t } from 'ttag'

import {
  Form,
  Field,
} from 'react-final-form'

import { JRaisedButton } from 'components/base'
import { JInputField } from 'components/base/JInput'
import { PasswordFieldFinalFormAdapter } from 'components/PasswordField'

import {
  SubsettingsView,
  SubsettingsDescription,
} from 'routes/Settings/components'

import './paymentPassword.scss'

const text = {
  pageDescription: t`You will use this password to unlock and transfer your funds.
    Keep it secure!`,
  passwordOld: t`Old payment password`,
  passwordOldAlert: t`Old password is required`,
  passwordConfirmAlert: t`Password does not match confirmation`,
  passwordNotEqual: t`Not equal`,
  hint: t`Password hint`,
  hintAlert: t`Password hint is required`,
  hintAlertPassword: t`Password and hint should not be equal`,
  button: t`Set button`,
}

const required = message => value => (value ? undefined : message)

type Props = {
  passwordForm: { isLoading: boolean, messages: PaymentPasswordForm },
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
      <SubsettingsView title={t`Update payment password`}>
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
              <PasswordFieldFinalFormAdapter
                onChange={handleFormChange}
                errorMessages={passwordForm.messages}
                isLoading={passwordForm.isLoading}
                values={values}
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
              <JRaisedButton
                onClick={handleFormSubmit}
                label={t`Set password`}
                color='blue'
                isLoading={passwordForm.isLoading}
              />
            </form>
          )}
        />
      </SubsettingsView>
    )
  }
}
