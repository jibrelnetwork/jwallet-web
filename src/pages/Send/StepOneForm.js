// @flow strict

// $FlowFixMe
import BigNumber from 'bignumber.js'
import React, { PureComponent } from 'react'
import createCaluclateDecorator from 'final-form-calculate'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { max } from 'lodash-es'
import { withI18n } from '@lingui/react'
import { type I18n as I18nType } from '@lingui/core'

import {
  Form,
  Field,
  type FormRenderProps,
} from 'react-final-form'

import stylesOffsets from 'styles/offsets.m.scss'

import web3 from 'services/web3'
import checkETH from 'utils/digitalAssets/checkETH'
import getTransactionValue from 'utils/transactions/getTransactionValue'
import { Button } from 'components/base'
import { toastsPlugin } from 'store/plugins'
import { GlobalFormError } from 'components'
import { selectActiveWalletAddress } from 'store/selectors/wallets'
import { selectCurrentNetworkOrThrow } from 'store/selectors/networks'
import { selectBalanceByAssetAddress } from 'store/selectors/balances'
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

export type SendFormValues = {
  +recipientAddress: string,
  +assetAddress: string,
  +amountValue: string,
  +isPriorityOpen?: boolean,
  +gasPriceValue?: string,
  +gasLimitValue?: string,
}

type Props = {|
  +getAssetByAddress: (assetAddress: string) => DigitalAsset,
  +getAssetBalanceByAddress: (assetAddress: string) => ?string,
  +onSubmit: (values: SendFormValues, isValidationFailed: boolean) => any,
  +i18n: I18nType,
  +network: Network,
  +initialValues: SendFormValues,
  +ownerAddress: OwnerAddress,
  +nodeError: ?string,
|}

type OwnProps = {|
  +onSubmit: (values: SendFormValues, isValidationFailed: boolean) => any,
  +initialValues: SendFormValues,
|}

type StateProps = {|
  +isGasPriceLoading: boolean,
  +isGasLimitLoading: boolean,
  +isValidationFailed: boolean,
  +estimatedGasLimit: ?string,
|}

const FALLBACK_GAS_AMOUNT: number = 21000

class StepOneForm extends PureComponent<Props, StateProps> {
  static defaultProps = {
    initialValues: {
      assetAddress: 'Ethereum',
      recipientAddress: '',
      amountValue: '',
      isPriorityOpen: false,
      gasPriceValue: '',
      gasLimitValue: FALLBACK_GAS_AMOUNT.toString(),
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

  checkInsufficientFunds(
    values: ?SendFormValues,
    address: Address,
  ): boolean {
    const { getAssetBalanceByAddress }: Props = this.props
    const balanceWei: ?string = getAssetBalanceByAddress(address)
    const balanceETH: BigNumber = divDecimals(balanceWei)

    const {
      amountValue,
      gasPriceValue,
    }: SendFormValues = values || {}

    if (!(gasPriceValue && amountValue)) {
      return false
    }

    const feeETH: BigNumber = toBigNumber(fromWeiToGWei(gasPriceValue)).times(FALLBACK_GAS_AMOUNT)

    return toBigNumber(amountValue).plus(feeETH).gt(balanceETH)
  }

  validate = async ({
    amountValue,
    assetAddress,
    gasPriceValue,
    gasLimitValue,
    recipientAddress,
  }: SendFormValues) => {
    const {
      getAssetByAddress,
      getAssetBalanceByAddress,
      i18n,
    }: Props = this.props

    const {
      blockchainParams: {
        decimals,
      },
    }: DigitalAsset = getAssetByAddress(assetAddress)

    const selectedAssetBalance: ?string = getAssetBalanceByAddress(assetAddress)

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
      parseInt(gasLimitValue, 10) < FALLBACK_GAS_AMOUNT
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

  requestGasPrice = async (): Promise<string> => {
    this.setState({
      isGasPriceLoading: true,
    })

    try {
      const gasPrice: BigNumber = await web3.getGasPrice(this.props.network)

      this.setState({
        isGasPriceLoading: false,
      })

      return toBigNumber(fromWeiToGWei(gasPrice))
        .toFormat(2, BigNumber.ROUND_FLOOR)
        .toString()
    } catch (error) {
      toastsPlugin.showToast('Network error, can\'t request gasPrice')

      return '0'
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
        const requestedGasLimit = await web3.estimateETHGas(
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
        const requestedGasLimit = await web3.estimateContractGas(
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

  renderInsufficientFundsError = (hasInsufficientFunds: boolean) => {
    const {
      i18n,
      nodeError,
    }: Props = this.props

    if (nodeError || !hasInsufficientFunds) {
      return null
    }

    return (
      <GlobalFormError
        text={i18n._(
          'Send.StepOneForm.global.error.text',
          null,
          {
            // eslint-disable-next-line max-len
            defaults: 'Entered amount + fee exceeds balance. Please correct amount or gas price value.',
          },
        )}
        title={i18n._(
          'Send.StepOneForm.global.error.title',
          null,
          { defaults: 'Insufficient funds' },
        )}
      />
    )
  }

  renderNodeError = () => {
    const {
      i18n,
      nodeError,
    }: Props = this.props

    if (!nodeError) {
      return null
    }

    return (
      <GlobalFormError
        text={nodeError}
        title={i18n._(
          'Send.StepOneForm.node.error.title',
          null,
          { defaults: 'Blockchain error' },
        )}
      />
    )
  }

  renderSendStepForm = ({
    handleSubmit,
    submitting: isSubmitting,
    valid: isValid,
    values,
  }: FormRenderProps) => {
    const { i18n }: Props = this.props

    const {
      isGasPriceLoading,
      isGasLimitLoading,
      estimatedGasLimit,
    }: StateProps = this.state

    const {
      recipientAddress,
      assetAddress,
      amountValue,
      gasPriceValue,
      gasLimitValue,
      isPriorityOpen,
    }: SendFormValues = values || {}

    const isETH: boolean = checkETH(assetAddress)
    const hasInsufficientFunds: boolean = isETH && this.checkInsufficientFunds(values, assetAddress)
    const isAmountValid: boolean = isValidNumeric(amountValue) && toBigNumber(amountValue).gt(0)
    const isPriorityPickerDisabled: boolean = !recipientAddress || !assetAddress || !isAmountValid

    const isFormDisabled: boolean =
      !recipientAddress ||
      !assetAddress ||
      !isAmountValid ||
      isGasLimitLoading ||
      isGasPriceLoading ||
      !isValid ||
      hasInsufficientFunds

    const blockchainFee: ?string = gasPriceValue &&
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
        {this.renderNodeError()}
        {this.renderInsufficientFundsError(hasInsufficientFunds)}
        <Field
          className={stylesOffsets.mb16}
          component={ConnectedAssetPicker}
          name='assetAddress'
          label={i18n._(
            'Send.StepOneForm.assetAddress.title',
            null,
            { defaults: 'Asset' },
          )}
        />
        <Field
          className={stylesOffsets.mb16}
          component={ConnectedRecipientPicker}
          name='recipientAddress'
          label={i18n._(
            'Send.StepOneForm.recipientAddress.title',
            null,
            { defaults: 'Recipient' },
          )}
        />
        <Field
          className={stylesOffsets.mb16}
          component={ConnectedSendAmountField}
          assetAddress={assetAddress}
          gasPrice={gasPriceValue}
          gasLimit={gasLimitValue}
          showBlockchainFee={!isPriorityOpen}
          name='amountValue'
          label={i18n._(
            'Send.StepOneForm.amount.title',
            null,
            { defaults: 'Amount' },
          )}
        />
        <Field
          isLoading={isGasPriceLoading}
          isEth={isETH}
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
      amountValue: (_, allValues: ?SendFormValues) => {
        if (!allValues) {
          return ''
        }

        const {
          amountValue,
          assetAddress,
        }: SendFormValues = allValues

        if (this.props.initialValues.assetAddress !== assetAddress) {
          return ''
        }

        return amountValue
      },
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
    return (
      <Form
        onSubmit={this.handleSendFormSubmit}
        validate={this.validate}
        render={this.renderSendStepForm}
        initialValues={this.props.initialValues}
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
  const { value: assetBalance } = selectBalanceByAssetAddress(
    state,
    assetAddress,
  ) || {}

  return assetBalance
}

function mapStateToProps(state: AppState) {
  return {
    getAssetByAddress: getAssetByAddress(state),
    network: selectCurrentNetworkOrThrow(state),
    ownerAddress: selectActiveWalletAddress(state),
    getAssetBalanceByAddress: getAssetBalanceByAddress(state),
  }
}

export const ConnectedStepOneForm = compose(
  withI18n(),
  connect<Props, OwnProps, _, _, _, _>(mapStateToProps),
)(StepOneForm)
