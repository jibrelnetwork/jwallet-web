// @flow strict

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { t } from 'ttag'
import {
  Form,
  type FormRenderProps,
} from 'react-final-form'

import {
  decryptInternalKey,
  deriveKeyFromPassword,
} from 'utils/encryption'

import { getPrivateKey } from 'utils/wallets'
import { selectActiveWalletOrThrow } from 'store/selectors/wallets'
import { selectPasswordPersist } from 'store/selectors/password'
import { WalletPasswordForm } from 'components'

type PasswordFormValues= {|
  password: string,
|}

type Props = {|
  internalKey: EncryptedData,
  salt: string,
  hint: string,
  activeWallet: Wallet,
  onDecryptPrivateKey: (privateKey: string) => Promise<*>,
|}

type OwnProps = {|
  onDecryptPrivateKey: (privateKey: string) => Promise<*>,
|}

class PasswordStepForm extends PureComponent<Props> {
  handleSendFormSubmit = async (values: PasswordFormValues) => {
    const {
      salt,
      internalKey,
      activeWallet,
    } = this.props

    try {
      const derivedKey = await deriveKeyFromPassword(
        values.password,
        salt,
      )

      const internalKeyDec = decryptInternalKey(
        internalKey,
        derivedKey,
      )

      const privateKey = getPrivateKey(activeWallet, internalKeyDec)

      // console.log(derivedKey, internalKeyDec, privateKey)

      await this.props.onDecryptPrivateKey(privateKey)

      return {}
    } catch (err) {
      return {
        password: t`Invalid password`,
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
        handleSubmit={handleSubmit}
        values={values}
        hint={this.props.hint}
        isSubmitting={submitting}
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
  const activeWallet = selectActiveWalletOrThrow(state)

  const {
    internalKey,
    salt,
    hint,
  } = selectPasswordPersist(state)

  return {
    internalKey,
    salt,
    hint,
    activeWallet,
  }
}

export const ConnectedPasswordStepForm = connect<Props, OwnProps, _, _, _, _>(
  mapStateToProps,
)(PasswordStepForm)
