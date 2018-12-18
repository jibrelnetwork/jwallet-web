// @flow

import React, { PureComponent } from 'react'
import keystore from 'services/keystore'
import { Form, Field } from 'react-final-form'

import { SubsettingsDescription, SubsettingsView } from 'routes/Settings/components'
import { JInputField } from 'components/base/JInput'
import Indicator from 'components/PasswordField/Indicator'
import { JRaisedButton } from 'components/base'

const text = {
  pageDescription: 'You will use this password to unlock and transfer your funds.\n' +
    'Keep it secure!',
  passwordOld: 'Old security password',
  passwordOldAlert: 'Old password is required',
  passwordNew: 'New security password',
  passwordConfirm: 'Repeat security password',
  passwordConfirmAlert: 'Password does not match confirmation',
  passwordNotEqual: 'Not equal',
  hint: 'Password hint',
  hintAlert: 'Password hint is required',
  hintAlertPassword: 'Password and hint should not be equal',
  button: 'Set button',
}

const required = message => value => (value ? undefined : message)

function getStatusByScore(score: number): ?PasswordStatus {
  switch (score) {
    case 0:
      return 'red'
    case 1:
      return 'red'
    case 2:
      return 'orange'
    case 3:
      return 'yellow'
    case 4:
      return 'green'
    default:
      return null
  }
}

type State = {
  passwordStrength: ?PasswordStatus,
}

export default class SecurityPassword extends PureComponent<*, State> {
  static defaultProps = {
    infoMessage: null,
    errorMessage: null,
  }

  constructor() {
    super()

    this.state = {
      passwordStrength: null,
    }
  }

  onSubmit = (formState: Object) => {
    const { passwordHint } = formState
    if (passwordHint === undefined || passwordHint.lengt < 1) {
      return { passwordHint: text.hintAlert }
    }
    return {}
  }

  validate = (formState: Object) => {
    const { passwordNew, passwordNewConfirm, passwordHint } = formState
    const errors = {}
    /* eslint-disable fp/no-mutation */
    if (passwordHint && passwordHint.length === 0) {
      errors.passwordHint = { warning: text.hintAlert }
    }
    if (passwordHint && passwordHint === passwordNew) {
      errors.passwordHint = text.hintAlertPassword
    }
    if (passwordNewConfirm !== passwordNew) {
      errors.passwordNewConfirm = text.passwordConfirmAlert
    }
    if (passwordNew && passwordNew.length > 0) {
      const { score, feedback }: { score: number, feedback: Object }
        = keystore.getPasswordStrength(passwordNew)
      this.setState({ passwordStrength: getStatusByScore(score) })

      errors.passwordNew = feedback.warning || feedback.suggestions[0]
    }
    /* eslint-enable fp/no-mutation */

    return errors
  }

  render() {
    const { passwordStrength } = this.state

    return (
      <SubsettingsView title='Update security password'>
        <SubsettingsDescription text={text.pageDescription} />
        <Form
          onSubmit={this.onSubmit}
          validate={this.validate}
          render={({ handleSubmit, form, values }) => (
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
              <div style={{ 'position': 'relative' }}>
                <Field
                  component={JInputField}
                  name='passwordNew'
                  label={text.passwordNew}
                  placeholder={text.passwordNew}
                  color='gray'
                  type='password'
                  validateType='visited'
                />
                {(values && values.passwordNew) && <Indicator status={passwordStrength} />}
              </div>
              <Field
                component={JInputField}
                name='passwordNewConfirm'
                label={text.passwordConfirm}
                placeholder={text.passwordConfirm}
                color='gray'
                type='password'
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
