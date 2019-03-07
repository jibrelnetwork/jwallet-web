// @flow strict

import React, { Component } from 'react'
import { t } from 'ttag'
import {
  Form,
  Field,
} from 'react-final-form'

import {
  JInputField,
  JRaisedButton,
} from 'components/base'

import { executeDeferredAction } from 'utils/misc'

import {
  typeof requestPrivateKey as RequestPrivateKeyFunction,
} from 'store/modules/digitalAssetsSendWizard'

import {
  type PasswordStepValues,
} from '../../DigitalAssetsSendWizard'

export type OnSubmit = (values: PasswordStepValues) => Promise<void>

type FormValues = {|
  password: string,
|}

type Props = {|
  walletId: WalletId,
  onSubmit: OnSubmit,
  requestPrivateKey: RequestPrivateKeyFunction,
|}

class PasswordStepForm extends Component<Props> {
  handleSubmit = async (values: FormValues) => {
    const {
      walletId,
      requestPrivateKey,
    } = this.props

    const { password } = values

    if (!password.length) {
      return {
        password: t`This field is required`,
      }
    }

    try {
      const payload = {
        walletId,
        password,
      }

      const {
        privateKey,
      } = await executeDeferredAction(requestPrivateKey, payload)

      await this.props.onSubmit({
        privateKey,
      })

      return null
    } catch (err) {
      return {
        password: t`Invalid password`,
      }
    }
  }

  render() {
    const initialValues = {
      password: '',
    }

    return (
      <Form
        initialValues={initialValues}
        onSubmit={this.handleSubmit}
        render={({
          handleSubmit, form, submitting,
        }) => (
          <form>
            <Field
              component={JInputField}
              validateType='dirtySinceLastSubmit'
              type='password'
              name='password'
              color='gray'
              label={t`Payment password`}
            />
            <JRaisedButton
              onClick={handleSubmit}
              isLoading={submitting}
              color='blue'
              label={t`Send asset`}
              labelColor='white'
              isWide
            />
          </form>
        )}
      />
    )
  }
}

export default PasswordStepForm
