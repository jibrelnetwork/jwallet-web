// @flow strict

import React, { PureComponent } from 'react'
import createCaluclateDecorator from 'final-form-calculate'
import { connect } from 'react-redux'
import { max } from 'lodash-es'
import { t } from 'ttag'
import {
  Form,
  Field,
  type FormRenderProps,
} from 'react-final-form'

import web3 from 'services/web3'
import checkETH from 'utils/digitalAssets/checkETH'

import { Button } from 'components/base'
import { selectCurrentNetworkOrThrow } from 'store/selectors/networks'
import { selectActiveWalletAddressOrThrow } from 'store/selectors/wallets'
import { selectBalanceByAssetAddressToCurrentBlock } from 'store/selectors/balances'
import { selectDigitalAssetOrThrow } from 'store/selectors/digitalAssets'
import {
  toBigNumber,
  fromWeiToGWei,
  isValidNumeric,
  divDecimals,
} from 'utils/numbers'

import { ConnectedAssetPicker } from './components/AssetPicker/AssetPickerContainer'
import { ConnectedRecipientPicker } from './components/RecipientPicker/RecipientPickerContainer'
import { ConnectedSendAmountField } from './components/SendAmountField/SendAmountFieldContainer'
import { PriorityField } from './components/PriorityField/PriorityField'

import styles from './send.m.scss'

const {
  getGasPrice,
  estimateETHGas,
  estimateContractGas,
} = web3

export type SendFormValues = {|
  recipientAddress: string,
  assetAddress: string,
  amountValue: string,
  isPriorityOpen: boolean,
  gasPriceValue: string,
  gasLimitValue: string,
|}

type Props = {|
  +network: Network,
  +ownerAddress: OwnerAddress,
  +initialValues: SendFormValues,
  +onSubmit: (values: SendFormValues) => any,
  +getAssetByAddress: (assetAddress: string) => DigitalAsset,
  +getAssetBalanceByAddress: (assetAddress: string) => ?string,
|}

type OwnProps = {|
  +onSubmit: (values: SendFormValues) => any,
  +initialValues: SendFormValues,
|}

type ComponentState = {|
  isGasPriceLoading: boolean,
  isGasLimitLoading: boolean,
|}

const FALLBACK_GAS_AMOUNT = 21000

class StepOneForm extends PureComponent<Props, ComponentState> {
  static defaultProps = {
    initialValues: {
      assetAddress: 'Ethereum',
      recipientAddress: '',
      amountValue: '',
      isPriorityOpen: false,
      gasPriceValue: '',
      gasLimitValue: '21000',
    },
  }

  state = {
    isGasPriceLoading: false,
    isGasLimitLoading: false,
  }

  handleSendFormSubmit = (values: SendFormValues) => {
    this.props.onSubmit(values)
  }

  validate = (values: SendFormValues) => {
    const {
      amountValue,
      assetAddress,
    } = values

    const {
      getAssetByAddress,
      getAssetBalanceByAddress,
    } = this.props

    const {
      blockchainParams: {
        decimals,
      },
    } = getAssetByAddress(assetAddress)

    const selectedAssetBalance = getAssetBalanceByAddress(assetAddress)

    const amountError = amountValue &&
      (toBigNumber(amountValue).gt(divDecimals(selectedAssetBalance, decimals)))
      ? {
        amountValue: t`Invalid amount value`,
      }
      : undefined

    return {
      ...amountError,
    }
  }

  requestGasPrice = async () => {
    const { network } = this.props

    this.setState({
      isGasPriceLoading: true,
    })

    try {
      const gasPrice = await getGasPrice(network)

      this.setState({
        isGasPriceLoading: false,
      })

      return fromWeiToGWei(gasPrice)
    } catch (err) {
      alert('#TODO: Fixme / Network error, can\'t request gasPrice')

      return ''
    }
  }

  requestGasLimit = async ({
    assetAddress,
    amountValue,
    recipientAddress,
  }: SendFormValues) => {
    const {
      network,
      ownerAddress,
      getAssetByAddress,
    } = this.props

    const {
      blockchainParams: {
        staticGasAmount,
      },
    } = getAssetByAddress(assetAddress)

    if (!isValidNumeric(amountValue) || !recipientAddress) {
      return String(staticGasAmount || FALLBACK_GAS_AMOUNT)
    }

    try {
      this.setState({ isGasLimitLoading: true })

      if (checkETH(assetAddress)) {
        const requestedGasLimit = await estimateETHGas(
          network,
          recipientAddress,
          toBigNumber(amountValue),
        )

        const gasLimit = String(max([requestedGasLimit, staticGasAmount || FALLBACK_GAS_AMOUNT]))

        this.setState({
          isGasLimitLoading: false,
        })

        return gasLimit
      } else {
        const requestedGasLimit = await estimateContractGas(
          network,
          assetAddress,
          ownerAddress,
          recipientAddress,
          toBigNumber(amountValue),
        )

        const gasLimit = String(max([requestedGasLimit, staticGasAmount || FALLBACK_GAS_AMOUNT]))

        this.setState({
          isGasLimitLoading: false,
        })

        return gasLimit
      }
    } catch (err) {
      this.setState({ isGasLimitLoading: false })
      // #TODO: check network error, and show toast
      // alert(`#TODO: Fixme when toast notifications will be ready\n
      // Network error, can\'t request gasPrice`)

      return String(staticGasAmount || FALLBACK_GAS_AMOUNT)
    }
  }

  renderSendStepForm = (props: FormRenderProps) => {
    console.log(props)

    const {
      handleSubmit,
      submitting: isSubmitting,
      valid: isValid,
      values,
    } = props

    const {
      isGasPriceLoading,
      isGasLimitLoading,
    } = this.state

    const {
      recipientAddress,
      assetAddress,
      amountValue,
      gasPriceValue,
      gasLimitValue,
    } = values || {}

    const isPriorityEnabled = !!recipientAddress &&
      !!assetAddress &&
      !!amountValue

    const isFormDisabled = !recipientAddress ||
      !assetAddress ||
      !amountValue ||
      isGasLimitLoading ||
      isGasPriceLoading ||
      !isValid

    const isEthereumAsset = checkETH(assetAddress)

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
          component={ConnectedSendAmountField}
          assetAddress={assetAddress}
          gasPrice={gasPriceValue}
          gasLimit={gasLimitValue}
          name='amountValue'
        />
        <Field
          isLoading={isGasPriceLoading}
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

  calculate = createCaluclateDecorator({
    field: 'assetAddress',
    updates: {
      amountValue: () => '',
      isPriorityOpen: () => false,
      gasPriceValue: () => this.requestGasPrice(),
      gasLimitValue: (_, allValues: ?SendFormValues) => allValues
        ? this.requestGasLimit(allValues)
        : String(FALLBACK_GAS_AMOUNT),
    },
  }, {
    field: 'isPriorityOpen',
    updates: {
      gasPriceValue: () => this.requestGasPrice(),
      gasLimitValue: (_, allValues: ?SendFormValues) => allValues
        ? this.requestGasLimit(allValues)
        : String(FALLBACK_GAS_AMOUNT),
    },
  }, {
    field: 'recipientAddress',
    updates: {
      gasPriceValue: () => this.requestGasPrice(),
      isPriorityOpen: () => false,
      gasLimitValue: (_, allValues: ?SendFormValues) => allValues
        ? this.requestGasLimit(allValues)
        : String(FALLBACK_GAS_AMOUNT),
    },
  })

  render() {
    const { initialValues } = this.props

    return (
      <Form
        onSubmit={this.handleSendFormSubmit}
        validate={this.validate}
        render={this.renderSendStepForm}
        initialValues={initialValues}
        decorators={[this.calculate]}
      />
    )
  }
}

const getAssetByAddress = (state: AppState) => (assetAddress: string) => {
  const asset = selectDigitalAssetOrThrow(state, assetAddress)

  return asset
}

const getAssetBalanceByAddress = (state: AppState) => (assetAddress: string) => {
  const { value: assetBalance } = selectBalanceByAssetAddressToCurrentBlock(
    state,
    assetAddress,
  ) || {}

  return assetBalance
}

function mapStateToProps(state: AppState) {
  const network = selectCurrentNetworkOrThrow(state)
  const ownerAddress = selectActiveWalletAddressOrThrow(state)

  return {
    network,
    ownerAddress,
    getAssetByAddress: getAssetByAddress(state),
    getAssetBalanceByAddress: getAssetBalanceByAddress(state),
  }
}

export const ConnectedStepOneForm = connect<Props, OwnProps, _, _, _, _>(
  mapStateToProps,
)(StepOneForm)
