// @flow strict

import React, { Component } from 'react'
import { t } from 'ttag'
import { noop } from 'lodash-es'

import {
  Form,
  Field,
  type FormRenderProps,
} from 'react-final-form'

import { PasswordField } from 'components'

import {
  JInputField,
  JRaisedButton,
} from 'components/base'

import setPasswordViewStyle from './setPasswordView.m.scss'

type Props = {|
  +dispatch: Function,
  +validate: FormValidate,
  +submit: (FormFields, Function) => Promise<void>,
|}

type StateProps = {|
  +isStrongPassword: boolean,
|}

const PASSWORD_FORM_INITIAL_VALUES = {
  password: '',
  passwordHint: '',
  passwordConfirm: '',
}

export class SetPasswordView extends Component<Props, StateProps> {
  static defaultProps = {
    dispatch: noop,
  }

  constructor(props: Props) {
    super(props)

    this.state = {
      isStrongPassword: false,
    }
  }

  handleScoreChange = (isStrongPassword: boolean) => {
    this.setState({ isStrongPassword })
  }

  handleSubmit = async (values: FormFields): Promise<void> => {
    const {
      submit,
      dispatch,
    }: Props = this.props

    await submit(values, dispatch)
  }

  renderSetPasswordForm = ({
    handleSubmit,
    form: {
      change: handleChange,
    },
    values = {},
    submitting: isSubmitting,
  }: FormRenderProps) => (
    <form
      onSubmit={handleSubmit}
      className={setPasswordViewStyle.form}
    >
      <PasswordField
        onChange={handleChange}
        onScoreChange={this.handleScoreChange}
        values={values}
        label={t`Enter Security Password`}
        isDisabled={isSubmitting}
        isAutoFocus
      />
      <Field
        component={JInputField}
        name='passwordHint'
        label={t`Enter Password Hint (Optional)`}
      />
      <JRaisedButton
        type='submit'
        isLoading={isSubmitting}
        isDisabled={!this.state.isStrongPassword}
      >
        {t`Set Security Password`}
      </JRaisedButton>
    </form>
  )

  render() {
    return (
      <div className={`__set-password-view ${setPasswordViewStyle.core}`}>
        <h1 className={setPasswordViewStyle.title}>
          {t`Set Password for your Storage`}
        </h1>
        <Form
          onSubmit={this.handleSubmit}
          validate={this.props.validate}
          render={this.renderSetPasswordForm}
          initialValues={PASSWORD_FORM_INITIAL_VALUES}
        />
      </div>
    )
  }
}
