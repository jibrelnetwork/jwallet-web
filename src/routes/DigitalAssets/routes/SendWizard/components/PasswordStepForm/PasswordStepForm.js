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
import { Deffered } from 'utils/misc'

import {
  type RequestPrivateKeyResult,
  typeof requestPrivateKey as RequestPrivateKeyFunction,
} from 'store/modules/digitalAssetsSendWizard'

import {
  type PasswordStepValues,
} from '../../DigitalAssetsSendWizard'

export type SaveValuesFunction = (values: PasswordStepValues) => Promise<void>

type FormValues = {|
  password: string,
|}

type Props = {|
  walletId: WalletId,
  saveValues: SaveValuesFunction,
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

    const payload = {
      walletId,
      password: values.password,
    }
    const resolver: Deffered<RequestPrivateKeyResult> = new Deffered()

    requestPrivateKey(payload, resolver)

    try {
      const {
        result: {
          privateKey,
        },
      } = await resolver.promise

      await this.props.saveValues({
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
