// @flow

// $FlowFixMe
import BigNumber from 'bignumber.js'
import { connect } from 'react-redux'
import { isFinite } from 'lodash-es'

import { selectSettingsFiatCurrencyData } from 'store/selectors/settings'
import { selectDigitalAssetOrThrow } from 'store/selectors/digitalAssets'
import { selectBalanceByAssetAddressToCurrentBlock } from 'store/selectors/balances'
import { selectTickerItemCourseByCurrency } from 'store/selectors/ticker'
import {
  toBigNumber,
  divDecimals,
  fromGweiToWei,
} from 'utils/numbers'

import {
  SendAmountField,
  type Props,
} from './SendAmountField'

export type OwnProps = {|
  +className: string,
  +infoMessage: string,
  +label: string,
  +input: FinalFormInput,
  +meta: FinalFormMeta,
  +validateType: FinalFormValidateType,

  // extra
  +assetAddress: string,
  +gasPrice: string,
  +gasLimit: string,
|}

function getMaxValueForEthereum(balance, gasPrice, gasLimit) {
  return divDecimals(
    toBigNumber(balance).minus(
      toBigNumber(gasPrice).times(gasLimit),
    ),
  ).toFormat(4, BigNumber.ROUND_FLOOR)
}

function mapStateToProps(state: AppState, ownProps: OwnProps) {
  const {
    assetAddress,
    gasPrice: gasPriceGWei,
    gasLimit,
    input: {
      value: amountValue,
    },
  } = ownProps

  const gasPrice = fromGweiToWei(gasPriceGWei)

  const isEthereumAsset = (assetAddress === 'Ethereum')

  const {
    symbol: fiatCurrencySymbol,
    code: fiatCurrencyCode,
  } = selectSettingsFiatCurrencyData(state)

  const {
    symbol: assetSymbol,
    blockchainParams: {
      decimals,
    },
    priceFeed = {},
  } = selectDigitalAssetOrThrow(state, assetAddress)

  const {
    value: assetBalance,
  } = selectBalanceByAssetAddressToCurrentBlock(
    state,
    assetAddress,
  ) || {}

  const blockchainFee =
    gasPrice &&
    gasLimit &&
    isFinite(parseFloat(gasPrice)) &&
    isFinite(parseFloat(gasLimit))
      ? toBigNumber(gasPrice).times(gasLimit).toString()
      : ''

  const maxValue = isEthereumAsset
    ? getMaxValueForEthereum(assetBalance, gasPrice, gasLimit)
    : divDecimals(assetBalance, decimals).toFormat(2, BigNumber.ROUND_FLOOR)

  const latestFiatCourse = priceFeed.currencyID
    ? selectTickerItemCourseByCurrency(
      state,
      String(priceFeed.currencyID),
      fiatCurrencyCode,
    )
    : {}

  const fiatAmount =
    amountValue &&
    latestFiatCourse &&
    isFinite(parseFloat(amountValue)) &&
    isFinite(parseFloat(latestFiatCourse))
      ? toBigNumber(amountValue).times(latestFiatCourse).toString()
      : ''

  return {
    maxValue,
    fiatCurrency: fiatCurrencySymbol,
    currency: assetSymbol,
    fiatAmount,
    blockchainFee,
    // seems, not implemented now in ticker module
    isFetchingFiatAmount: false,
  }
}

export const ConnectedSendAmountField = connect<Props, OwnProps, _, _, _, _>(
  mapStateToProps,
)(SendAmountField)
