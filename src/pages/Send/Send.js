// @flow strict

import React, { Component } from 'react'
import { t } from 'ttag'
import { pick } from 'lodash-es'
import {
  Form,
  Field,
  type FormRenderProps,
} from 'react-final-form'

import { TitleHeader } from 'components'
import { Button } from 'components/base'

import { ConnectedAssetPicker } from './components/AssetPicker/AssetPickerContainer'
import { ConnectedRecipientPicker } from './components/RecipientPicker/RecipientPickerContainer'
import { PriorityField } from './components/PriorityField/PriorityField'
import { SendAmountField } from './components/SendAmountField/SendAmountField'

import styles from './send.m.scss'

type Props = {|

|}

const STEPS = {
  SEND_FORM: 'SEND_FORM',
  SEND_CONFIRM: 'SEND_CONFIRM',
  VALIDATION_FAILED: 'VALIDATION_FAILED',
  ERROR: 'ERROR',
}

type SendAssetStep = $Keys<typeof STEPS>

type SendFormValues = {|
  recipientAddress: string,
  assetAddress: string,
  amountValue: string,
  isPriorityOpen: boolean,
  gasPriceValue: string,
  gasLimitValue: string,
|}

type RequestedValues = {
  gasPrice: string,
  gasLimit: string,
  isLoading: boolean,
}

type ComponentState = {|
  currentStep: SendAssetStep,
  sendFormValues: SendFormValues,
  requestedValues: RequestedValues,
|}

class Send extends Component<Props, ComponentState> {
  state = {
    currentStep: STEPS.SEND_FORM,
    sendFormValues: {
      assetAddress: 'Ethereum',
      recipientAddress: '',
      amountValue: '',
      isPriorityOpen: false,
      gasPriceValue: '',
      gasLimitValue: '',
    },
    requestedValues: {
      gasPrice: '',
      gasLimit: '',
      isLoading: false,
    },
  }

  handleSendFormSubmit = (values: SendFormValues) => {
    this.setState({ sendFormValues: values })
    console.log(values)
  }

  renderSendStepForm = (props: FormRenderProps) => {
    const {
      handleSubmit,
      submitting: isSubmitting,
      // values,
    } = props

    return (
      <form
        onSubmit={handleSubmit}
        className={styles.form}
      >
        <Field
          className={styles.mb16}
          component={ConnectedAssetPicker}
          name='assetAddress'
        />
        <Field
          className={styles.mb16}
          component={ConnectedRecipientPicker}
          name='recipientAddress'
        />
        <Field
          className={styles.mb16}
          component={SendAmountField}
          name='amountValue'
        />
        <Field
          className={styles.mb32}
          component={PriorityField}
          name='isPriorityOpen'
          gasPriceFieldName='gasPriceValue'
          gasLimitFieldName='gasLimitValue'
        />
        <Button
          type='submit'
          isLoading={isSubmitting}
          // isDisabled={!name.trim()}
        >
          {t`Next`}
        </Button>
      </form>
    )
  }

  renderPasswordStepForm = (props: FormRenderProps) => {
    const {
      handleSubmit,
      submitting: isSubmitting,
      // values,
    } = props

    return (
      <form
        onSubmit={handleSubmit}
        className={styles.form}
      >
        <Field
          className={styles.mb16}
          component={AssetPicker}
          name='password'
        />
        <Button
          type='submit'
          isLoading={isSubmitting}
          // isDisabled={!name.trim()}
        >
          {t`Next`}
        </Button>
      </form>
    )
  }

  handleClose = () => {
    console.log('handleClose: CLOSE')
  }

  renderSendFormStep = () => {
    const {
      sendFormValues,
    } = this.state

    return (
      <div className={styles.core}>
        <TitleHeader
          onBack={this.handleClose()}
          title={t`Send`}
        />
        <Form
          onSubmit={this.handleSendFormSubmit}
          render={this.renderSendStepForm}
          initialValues={sendFormValues}
        />
      </div>
    )
  }

  handleBackToSendForm = () => {
    this.setState({ currentStep: STEPS.SEND_FORM })
  }

  renderPasswordStep = () => (
    <div className={styles.core}>
      <TitleHeader
        onBack={this.handleBackToSendForm()}
        title={t`Enter Secutity Password`}
      />
      {/* <Form
          onSubmit={this.handleSubmit}
          render={this.renderFirstStepForm}
          initialValues={initialValues}
        /> */}
    </div>
  )

  render() {
    switch (this.state.currentStep) {
      case STEPS.SEND_FORM:
        return this.renderSendFormStep()

      case STEPS.SEND_CONFIRM:
        return this.renderPasswordStep()

      default:
        return <span />
    }
  }
}

export { Send }
