// @flow strict

import React, { Component } from 'react'
import classNames from 'classnames'
import { t } from 'ttag'
import { FORM_ERROR } from 'final-form'
import {
  Form,
  Field,
} from 'react-final-form'
import * as yup from 'yup'

import {
  JInputField,
  JRaisedButton,
} from 'components/base'
import { checkAddressValid } from 'utils/address'

import {
  type FirstStepValues,
} from '../../DigitalAssetsSendWizard'

import styles from './firstStepForm.m.scss'

type OnSubmit = (values: FirstStepValues) => Promise<void>

type Props = {|
  onSubmit: OnSubmit,
  initialValues: FirstStepValues,
|}

const MSG_REQUIRED = t`This field is required`
const MSG_INVALID_ADDRESS = t`Invalid address`
const MSG_INVALID_AMOUNT = t`Invalid amount`

const checkAddress = yup
  .string()
  .required(MSG_REQUIRED)
  .test(
    'isAddress',
    MSG_INVALID_ADDRESS,
    address => checkAddressValid(address),
  )

const checkAssetAddress = yup
  .string()
  .required(MSG_REQUIRED)
  .test(
    'isAssetAddress',
    MSG_INVALID_ADDRESS,
    address => address === 'Ethereum' || checkAddressValid(address),
  )

class FirstStepForm extends Component<Props> {
  getRecipientWarning = (values: FirstStepValues) => {
    if (values.recipient === values.owner) {
      return t`Recipient address is the same as sender address`
    }

    return ''
  }

  handleSubmit = async (values: FirstStepValues) => {
    try {
      const validationSchema = yup.object().shape({
        owner: checkAddress,
        recipient: checkAddress,
        asset: checkAssetAddress,
        amount: yup
          .number()
          .typeError(MSG_INVALID_AMOUNT)
          .required(MSG_REQUIRED)
          .positive(MSG_INVALID_AMOUNT),
        // TODO: .max(<this asset balace + gasPrice*gasLimit>,
        // t`Amount plus blockchain fee exceeds balance`)
      })

      await validationSchema.validate(values, { abortEarly: false })
      await this.props.onSubmit(values)

      return null
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errors = err.inner.reduce((result, error) => ({
          ...result,
          [error.path]: error.message,
        }), {})

        return errors
      }

      return {
        [FORM_ERROR]: t`Something wrong (${err.message})`,
      }
    }
  }

  render() {
    const {
      initialValues,
    } = this.props

    return (
      <Form
        initialValues={initialValues}
        onSubmit={this.handleSubmit}
        render={({
          handleSubmit, form, submitting, submitError, values,
        }) => (
          <form>
            <div className={classNames(
              styles.form,
              { [styles.submitting]: submitting },
            )}
            >
              {submitError && <div className='error'>{submitError}</div>}
              <Field
                component={JInputField}
                name='owner'
                color='gray'
                label={t`Current address`}
                isDisabled
              />
              <Field
                component={JInputField}
                name='asset'
                color='gray'
                label={t`Asset address`}
              />
              <Field
                component={JInputField}
                name='recipient'
                color='gray'
                placeholder={t`Recipient address`}
                infoMessage={this.getRecipientWarning(values)}
              />
              <Field
                component={JInputField}
                name='amount'
                color='gray'
                label={t`Amount`}
              />
              <JRaisedButton
                onClick={handleSubmit}
                isLoading={submitting}
                color='blue'
                label={t`Confirm`}
                labelColor='white'
                isWide
              />
            </div>
          </form>
        )}
      />
    )
  }
}

export default FirstStepForm
