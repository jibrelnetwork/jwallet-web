// @flow strict

import React, { PureComponent } from 'react'
import createCaluclateDecorator from 'final-form-calculate'
import { connect } from 'react-redux'
import { max } from 'lodash-es'
import { i18n } from 'i18n/lingui'
import {
  Form,
  Field,
  type FormRenderProps,
} from 'react-final-form'

// $FlowFixMe
import BigNumber from 'bignumber.js'

import stylesOffsets from 'styles/offsets.m.scss'

import web3 from 'services/web3'
import checkETH from 'utils/digitalAssets/checkETH'
import getTransactionValue from 'utils/transactions/getTransactionValue'

import { Button } from 'components/base'
import { selectCurrentNetworkOrThrow } from 'store/selectors/networks'
import { selectActiveWalletAddressOrThrow } from 'store/selectors/wallets'
import { selectBalanceByAssetAddressToCurrentBlock } from 'store/selectors/balances'
import { selectDigitalAssetOrThrow } from 'store/selectors/digitalAssets'
import {
  toBigNumber,
  fromWeiToGWei,
  fromGweiToWei,
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
  isPriorityOpen?: boolean,
  gasPriceValue?: string,
  gasLimitValue?: string,
|}

type Props = {|
  +network: Network,
  +ownerAddress: OwnerAddress,
  +initialValues: SendFormValues,
  +onSubmit: (values: SendFormValues, isValidationFailed: boolean) => any,
  +getAssetByAddress: (assetAddress: string) => DigitalAsset,
  +getAssetBalanceByAddress: (assetAddress: string) => ?string,
|}

type OwnProps = {|
  +onSubmit: (values: SendFormValues, isValidationFailed: boolean) => any,
  +initialValues: SendFormValues,
|}

type ComponentState = {|
  isGasPriceLoading: boolean,
  isGasLimitLoading: boolean,
  isValidationFailed: boolean,
  estimatedGasLimit: ?string,
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
    isValidationFailed: false,
    estimatedGasLimit: null,
  }

  handleSendFormSubmit = (values: SendFormValues) => {
    this.props.onSubmit(values, this.state.isValidationFailed)
  }

  validate = async (values: SendFormValues) => {
    const {
      amountValue,
      assetAddress,
      gasPriceValue,
      gasLimitValue,
      recipientAddress,
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

    const amountFormatError = !isValidNumeric(amountValue)
      ? {
        amountValue: i18n._(
          'Send.StepOneForm.input.amountValue.error.invalid',
          null,
          { defaults: 'Invalid amount value' },
        ),
      }
      : undefined

    const amountBalanceError = isValidNumeric(amountValue) &&
      (toBigNumber(amountValue).gt(divDecimals(selectedAssetBalance, decimals)))
      ? {
        amountValue: i18n._(
          'Send.StepOneForm.input.amountValue.error.tooMuch',
          null,
          { defaults: 'Amount exceeds current balance' },
        ),
      }
      : undefined

    const isAmountValid = !(amountFormatError && amountBalanceError)

    if (assetAddress && isAmountValid && recipientAddress) {
      await this.requestGasLimit({
        assetAddress,
        amountValue,
        recipientAddress,
      })
    }

    const gasPriceError =
      !gasPriceValue ||
      !isValidNumeric(gasPriceValue) ||
      toBigNumber(gasPriceValue).lt(1) ||
      toBigNumber(gasPriceValue).gt(1000)
        ? {
          gasPriceValue: i18n._(
            'Send.StepOneForm.input.gasPriceValue.error.invalid',
            null,
            { defaults: 'Invalid gas price value' },
          ),
        }
        : undefined

    const gasLimitError = !gasLimitValue ||
      !isValidNumeric(gasLimitValue) ||
      parseInt(gasLimitValue, 10) < 21000
      ? {
        gasLimitValue: i18n._(
          'Send.StepOneForm.input.gasLimitValue.error.invalid',
          null,
          { defaults: 'Invalid gas limit' },
        ),
      }
      : undefined

    return {
      ...amountFormatError,
      ...amountBalanceError,
      ...gasPriceError,
      ...gasLimitError,
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

      return toBigNumber(fromWeiToGWei(gasPrice))
        .toFormat(2, BigNumber.ROUND_FLOOR)
        .toString()
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
        decimals,
      },
    } = getAssetByAddress(assetAddress)

    if (!isValidNumeric(amountValue) || !recipientAddress) {
      return String(staticGasAmount || FALLBACK_GAS_AMOUNT)
    }

    const amount = getTransactionValue(amountValue, decimals)

    try {
      this.setState({
        isGasLimitLoading: true,
        isValidationFailed: false,
        estimatedGasLimit: null,
      })

      if (checkETH(assetAddress)) {
        const requestedGasLimit = await estimateETHGas(
          network,
          recipientAddress,
          amount,
        )

        const gasLimit = String(max([requestedGasLimit, staticGasAmount || FALLBACK_GAS_AMOUNT]))

        this.setState({
          isGasLimitLoading: false,
          estimatedGasLimit: gasLimit,
        })

        return gasLimit
      } else {
        const requestedGasLimit = await estimateContractGas(
          network,
          assetAddress,
          ownerAddress,
          recipientAddress,
          amount,
        )

        const gasLimit = String(max([requestedGasLimit, staticGasAmount || FALLBACK_GAS_AMOUNT]))

        this.setState({
          isGasLimitLoading: false,
          estimatedGasLimit: gasLimit,
        })

        return gasLimit
      }
    } catch (err) {
      this.setState({
        isGasLimitLoading: false,
        isValidationFailed: true,
      })
      // #TODO: check network error, and show toast
      // alert(`#TODO: Fixme when toast notifications will be ready\n
      // Network error, can\'t request gasPrice`)

      return String(staticGasAmount || FALLBACK_GAS_AMOUNT)
    }
  }

  renderSendStepForm = (props: FormRenderProps) => {
    const {
      handleSubmit,
      submitting: isSubmitting,
      valid: isValid,
      values,
    } = props

    const {
      isGasPriceLoading,
      isGasLimitLoading,
      estimatedGasLimit,
    } = this.state

    const {
      recipientAddress,
      assetAddress,
      amountValue,
      gasPriceValue,
      gasLimitValue,
      isPriorityOpen,
    } = values || {}

    const isAmountValid = isValidNumeric(amountValue) &&
      toBigNumber(amountValue).gt(0)

    const isPriorityPickerDisabled = !recipientAddress ||
      !assetAddress ||
      !isAmountValid

    const isFormDisabled = !recipientAddress ||
      !assetAddress ||
      !isAmountValid ||
      isGasLimitLoading ||
      isGasPriceLoading ||
      !isValid

    const isEthereumAsset = checkETH(assetAddress)

    const blockchainFee = gasPriceValue &&
      gasLimitValue &&
      isValidNumeric(gasPriceValue) &&
      isValidNumeric(gasLimitValue)
      ? divDecimals(
        toBigNumber(fromGweiToWei(gasPriceValue))
          .times(gasLimitValue),
      )
        .toFormat(6, BigNumber.ROUND_FLOOR)
      : undefined

    return (
      <form
        onSubmit={handleSubmit}
        className={styles.form}
      >
        <Field
          className={stylesOffsets.mb16}
          component={ConnectedAssetPicker}
          name='assetAddress'
        />
        <Field
          className={stylesOffsets.mb16}
          component={ConnectedRecipientPicker}
          name='recipientAddress'
        />
        <Field
          className={stylesOffsets.mb16}
          component={ConnectedSendAmountField}
          assetAddress={assetAddress}
          gasPrice={gasPriceValue}
          gasLimit={gasLimitValue}
          showBlockchainFee={!isPriorityOpen}
          name='amountValue'
        />
        <Field
          isLoading={isGasPriceLoading}
          isEth={isEthereumAsset}
          isDisabled={isPriorityPickerDisabled}
          className={stylesOffsets.mb32}
          component={PriorityField}
          blockchainFee={blockchainFee}
          name='isPriorityOpen'
          gasPriceFieldName='gasPriceValue'
          gasLimitFieldName='gasLimitValue'
          estimatedGasLimit={estimatedGasLimit}
        />
        <Button
          type='submit'
          name='send'
          isLoading={isSubmitting}
          isDisabled={isFormDisabled}
        >
          {i18n._(
            'Send.StepOneForm.form.actions.submit',
            null,
            { defaults: 'Send' },
          )}
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
