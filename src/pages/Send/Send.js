// @flow strict

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { t } from 'ttag'
import {
  Form,
  Field,
  type FormRenderProps,
} from 'react-final-form'

import { TitleHeader } from 'components'
import { Button } from 'components/base'
import { selectCurrentNetworkOrThrow } from 'store/selectors/networks'
import web3 from 'services/web3'

import { ConnectedAssetPicker } from './components/AssetPicker/AssetPickerContainer'
import { ConnectedRecipientPicker } from './components/RecipientPicker/RecipientPickerContainer'
import { PriorityField } from './components/PriorityField/PriorityField'
import { SendAmountField } from './components/SendAmountField/SendAmountField'

import styles from './send.m.scss'

const { getGasPrice } = web3

type Props = {|
  +network: Network,
|}

type OwnProps = {|

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

type ComponentState = {|
  currentStep: SendAssetStep,
  sendFormValues: SendFormValues,
  requestedGasPrice: string,
  requestedGasLimit: string,
  isGasPriceLoading: boolean,
  isGasLimitLoading: boolean,
  isNetworkError: boolean,
|}

class SendAsset extends Component<Props, ComponentState> {
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
    requestedGasPrice: '',
    isGasPriceLoading: false,
    requestedGasLimit: '',
    isGasLimitLoading: false,
    isNetworkError: false,
  }

  handleSendFormSubmit = (values: SendFormValues) => {
    this.setState({ sendFormValues: values })
  }

  requestGasPrice = async () => {
    const { network } = this.props

    this.setState({
      isGasPriceLoading: true,
      isNetworkError: false,
    })

    try {
      const gasPrice = await getGasPrice(network)

      this.setState({
        isGasLimitLoading: false,
        requestedGasPrice: gasPrice.toString(),
      })
    } catch (err) {
      console.error(err)
      this.setState({ isNetworkError: true })
    }
  }

  // type Props = {|
  //   +blockchainFee: string,
  //   +className: string,
  //   +currency: string,
  //   +fiatAmount: string,
  //   +fiatCurrency: FiatCurrency,
  //   +infoMessage: string,
  //   +input: FinalFormInput,
  //   +isFetchingFiatAmount: boolean,
  //   +maxValue: string,
  //   +meta: FinalFormMeta,
  //   +validateType: FinalFormValidateType,
  // |}

  renderSendStepForm = (props: FormRenderProps) => {
    const {
      handleSubmit,
      submitting: isSubmitting,
      values,
    } = props

    const {
      recipientAddress,
      assetAddress,
      amountValue,
    } = values || {}

    // const {
    //   // requestedGasPrice,
    //   // requestedGasLimit,
    //   isGasPriceLoading,
    //   isGasLimitLoading,
    // } = this.state

    const isPriorityEnabled = !!recipientAddress &&
      !!assetAddress &&
      !!amountValue

    const isFormDisabled = !!recipientAddress ||
      !!assetAddress ||
      !!amountValue

    const isEthereumAsset = (assetAddress === 'Ethereum')

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
          isEth={isEthereumAsset}
          isDisabled={!isPriorityEnabled}
          className={styles.mb32}
          component={PriorityField}
          name='isPriorityOpen'
          gasPriceFieldName='gasPriceValue'
          gasLimitFieldName='gasLimitValue'
        />
        <Button
          type='submit'
          name='send'
          isLoading={isSubmitting}
          isDisabled={isFormDisabled}
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

function mapStateToProps(state: AppState) {
  const network = selectCurrentNetworkOrThrow(state)

  return {
    network,
  }
}

export const Send = connect<Props, OwnProps, _, _, _, _>(mapStateToProps)(SendAsset)
