// @flow strict

import React, { Component } from 'react'
import { noop } from 'lodash-es'
import { withI18n } from '@lingui/react'
import { type I18n as I18nType } from '@lingui/core'

import {
  Form,
  Field,
  type FormRenderProps,
} from 'react-final-form'

import { NewPasswordField } from 'components'

import {
  JInputField,
  Button,
} from 'components/base'
import { StartLayout } from 'layouts'

import setPasswordViewStyle from './setPasswordView.m.scss'

export type Props = {|
  +dispatch: Function,
  +validate: FormValidate,
  +submit: (FormFields, Function) => Promise<void>,
  +i18n: I18nType,
|}

type StateProps = {|
  +isStrongPassword: boolean,
|}

const PASSWORD_FORM_INITIAL_VALUES = {
  password: '',
  passwordHint: '',
  passwordConfirm: '',
}

class SetPasswordViewComponent extends Component<Props, StateProps> {
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
  }: FormRenderProps) => {
    const { i18n } = this.props

    return (
      <form
        onSubmit={handleSubmit}
        className={setPasswordViewStyle.form}
      >
        <NewPasswordField
          onChange={handleChange}
          onScoreChange={this.handleScoreChange}
          values={values}
          label={i18n._(
            'SetPassword.securityPassword',
            null,
            { defaults: 'Enter Security Password' },
          )}
          isDisabled={isSubmitting}
          isAutoFocus
        />
        <Field
          component={JInputField}
          name='passwordHint'
          label={i18n._(
            'SetPassword.hint.label',
            null,
            { defaults: 'Enter Password Hint' },
          )}
          infoMessage={i18n._(
            'SetPassword.hint.description',
            null,
            // eslint-disable-next-line max-len
            { defaults: 'If you forget your Security Password, some functions won’t be available. To restore access to all functions you will need to clear your data and re-import your wallets again using backup phrase.' },
          )}
        />
        <Button
          type='submit'
          isLoading={isSubmitting}
          isDisabled={!this.state.isStrongPassword}
        >
          {i18n._(
            'SetPassword.submit',
            null,
            { defaults: 'Set Security Password' },
          )}
        </Button>
      </form>
    )
  }

  render() {
    const { i18n } = this.props

    return (
      <StartLayout
        className='__new-password'
      >
        <h1 className={setPasswordViewStyle.title}>
          {i18n._(
            'SetPassword.title',
            null,
            { defaults: 'Set Password to Secure Your Storage' },
          )}
        </h1>
        <Form
          onSubmit={this.handleSubmit}
          validate={this.props.validate}
          render={this.renderSetPasswordForm}
          initialValues={PASSWORD_FORM_INITIAL_VALUES}
        />
      </StartLayout>
    )
  }
}

export const SetPasswordView = withI18n()(
  SetPasswordViewComponent,
)
