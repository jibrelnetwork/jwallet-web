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

import { walletsPlugin } from 'store/plugins/walletsPlugin'
import { selectActiveWalletIdOrThrow } from 'store/selectors/wallets'
import { selectPasswordPersist } from 'store/selectors/password'
import { WalletPasswordForm } from 'components'

type PasswordFormValues= {|
  password: string,
|}

type Props = {|
  hint: string,
  activeWalletId: WalletId,
  onDecryptPrivateKey: (privateKey: string) => Promise<*>,
  i18n: I18nType,
|}

type OwnProps = {|
  onDecryptPrivateKey: (privateKey: string) => Promise<*>,
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
  const activeWalletId = selectActiveWalletIdOrThrow(state)

  const {
    hint,
  } = selectPasswordPersist(state)

  return {
    hint,
    activeWalletId,
  }
}

export const ConnectedPasswordStepForm = compose(
  withI18n(),
  connect<Props, OwnProps, _, _, _, _>(
    mapStateToProps,
  ),
)(PasswordStepForm)
