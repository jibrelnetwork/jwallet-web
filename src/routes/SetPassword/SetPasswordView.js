// @flow strict

import React, { Component } from 'react'
import { t } from 'ttag'

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
  +validate: FormValidate,
  +handleSubmit: FormSubmit,
  +errors: FormFields,
|}

const PASSWORD_FORM_INITIAL_VALUES = {
  password: '',
  passwordHint: '',
  passwordConfirm: '',
}

export class SetPasswordView extends Component<Props> {
  renderSetPasswordForm = ({
    handleSubmit,
    form: {
      change: handleChange,
    },
    values = {},
    submitting: isSubmitting,
  }: FormRenderProps) => (
    <form className={setPasswordViewStyle.form}>
      <PasswordField
        onChange={handleChange}
        values={values}
        errors={this.props.errors}
        label={t`Enter Security Password`}
        isDisabled={isSubmitting}
        isAutoFocus
      />
      <Field
        component={JInputField}
        errorMessage={this.props.errors.passwordHint}
        name='passwordHint'
        label={t`Enter Password Hint (Optional)`}
      />
      <JRaisedButton
        onClick={handleSubmit}
        isLoading={isSubmitting}
      >
        {t`Set Security Password`}
      </JRaisedButton>
    </form>
  )

  render() {
    const {
      validate,
      handleSubmit,
    } = this.props

    return (
      <div className={`__set-password-view ${setPasswordViewStyle.core}`}>
        <h1 className={setPasswordViewStyle.title}>
          {t`Set Password for your Storage`}
        </h1>
        <Form
          validate={validate}
          onSubmit={handleSubmit}
          render={this.renderSetPasswordForm}
          initialValues={PASSWORD_FORM_INITIAL_VALUES}
        />
      </div>
    )
  }
}
