// @flow strict

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withI18n } from '@lingui/react'
import { type I18n as I18nType } from '@lingui/core'

import {
  Form,
  type FormRenderProps,
} from 'react-final-form'

import walletsPlugin from 'store/plugins/walletsPlugin'
import { selectPasswordHint } from 'store/selectors/password'
import { selectActiveWalletId } from 'store/selectors/wallets'
import { WalletPasswordForm } from 'components'

type PasswordFormValues= {|
  password: string,
|}

type OwnProps = {|
  +onDecryptPrivateKey: (privateKey: string) => Promise<*>,
|}

type Props = {|
  ...OwnProps,
  +i18n: I18nType,
  +hint: string,
  +activeWalletId: WalletId,
|}

class PasswordStepForm extends PureComponent<Props> {
  handleSendFormSubmit = async (values: PasswordFormValues) => {
    const {
      activeWalletId,
      i18n,
    } = this.props

    try {
      const privateKey = await walletsPlugin.getPrivateKey(
        activeWalletId,
        values.password,
      )

      await this.props.onDecryptPrivateKey(privateKey)

      return {}
    } catch (err) {
      return {
        password: i18n._(
          'Send.PasswordStepForm.input.password.error.invalid',
          null,
          { defaults: 'Invalid password' },
        ),
      }
    }
  }

  renderPasswordStepForm = (formRenderProps: FormRenderProps) => {
    const {
      handleSubmit,
      values = {},
      submitting,
    }: FormRenderProps = formRenderProps

    return (
      <WalletPasswordForm
        isSubmitting={submitting}
        handleSubmit={handleSubmit}
        values={values}
        hint={this.props.hint}
      />
    )
  }

  render() {
    const initialValues = {
      password: '',
    }

    return (
      <Form
        onSubmit={this.handleSendFormSubmit}
        render={this.renderPasswordStepForm}
        initialValues={initialValues}
      />
    )
  }
}

function mapStateToProps(state: AppState) {
  return {
    hint: selectPasswordHint(state),
    activeWalletId: selectActiveWalletId(state),
  }
}

export const ConnectedPasswordStepForm = compose(
  withI18n(),
  connect<Props, OwnProps, _, _, _, _>(mapStateToProps),
)(PasswordStepForm)
