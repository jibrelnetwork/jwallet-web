// @flow

import React, { PureComponent } from 'react'
import { Form, Field } from 'react-final-form'

import { SubsettingsDescription, SubsettingsView } from 'routes/Settings/components'
import { JInputField } from 'components/base/JInput'
import { PasswordFieldFinalFormAdapter } from 'components/PasswordField'
import { JRaisedButton } from 'components/base'

import './paymentPassword.scss'

const text = {
  pageDescription: 'You will use this password to unlock and transfer your funds.\n' +
    'Keep it secure!',
  passwordOld: 'Old security password',
  passwordOldAlert: 'Old password is required',
  passwordConfirmAlert: 'Password does not match confirmation',
  passwordNotEqual: 'Not equal',
  hint: 'Password hint',
  hintAlert: 'Password hint is required',
  hintAlertPassword: 'Password and hint should not be equal',
  button: 'Set button',
}

const required = message => value => (value ? undefined : message)

type Props = {
  submit: () => void,
}

export default class PaymentPassword extends PureComponent<Props> {
  static defaultProps = {
    infoMessage: null,
    errorMessage: null,
  }

  onSubmit = (formState: Object) => {
    const { passwordHint } = formState
    if (passwordHint === undefined || passwordHint.length < 1) {
      return { passwordHint: text.hintAlert }
    }
    this.props.submit()
    return {}
  }

  validate = (formState: Object) => {
    const { passwordNew, passwordHint } = formState
    const errors: { [string]: string } = {}
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
    return (
      <SubsettingsView title='Update security password'>
        <SubsettingsDescription text={text.pageDescription} />
        <Form
          onSubmit={this.onSubmit}
          validate={this.validate}
          render={({ handleSubmit, form, values, submitting }) => (
            <form className='password-form' onSubmit={handleSubmit}>
              <Field
                component={JInputField}
                name='passwordOld'
                label={text.passwordOld}
                placeholder={text.passwordOld}
                color='gray'
                type='password'
                validate={required(text.passwordOldAlert)}
                isAutoFocus
              />
              <PasswordFieldFinalFormAdapter
                onChange={form.change}
                isLoading={submitting}
                values={values}
              />
              <Field
                component={JInputField}
                name='passwordHint'
                label={text.hint}
                placeholder={text.hint}
                color='gray'
                validate={required(text.hintAlert)}
              />
              <JRaisedButton onClick={form.submit} label='Set password' color='blue' />
            </form>
          )}
        />
      </SubsettingsView>
    )
  }
}
