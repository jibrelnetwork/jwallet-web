// @flow

import Keystore from 'jwallet-web-keystore'
import { equals, isEmpty, gt, lt, toLower } from 'ramda'

import config from 'config'
import ethereum from 'data/assets/ethereum'
import InvalidFieldError from 'utils/errors/InvalidFieldError'
import { getTransactionValue, toBigNumber } from 'utils/transactions'

function customNetworkRPC(customRPC: string, items: Networks) {
  // check validity
  if (!config.urlRe.test(customRPC)) {
    throw new Error('Invalid RPC address')
  }

  // check uniqueness
  items.forEach(({ title }) => {
    if (title.toLowerCase() === customRPC.toLowerCase()) {
      throw new Error('This RPC address already exists')
    }
  })
}

const derivationPath = (path: string): void => {
  if (isEmpty(path) || !Keystore.isDerivationPathValid(path)) {
    throw new InvalidFieldError(
      'customDerivationPath',
      i18n('general.error.derivationPath.invalid')
    )
  }
}

const walletName = (name: string, wallets: Wallets) => {
  if (!name) {
    throw new InvalidFieldError('name', i18n('general.error.walletName.empty'))
  }

  if (/[^a-z0-9 ]/ig.test(name)) {
    throw new InvalidFieldError('name', i18n('general.error.walletName.invalid'))
  }

  walletNameUniq(name, wallets)
}

const walletNameUniq = (name: string, wallets: Wallets) => {
  if (isEmpty(wallets)) {
    return
  }

  wallets.forEach((wallet: Wallet) => {
    const newKeyName: string = toLower(name.trim())
    const isEqual: boolean = equals(newKeyName, toLower(wallet.name))

    if (isEqual) {
      throw new InvalidFieldError('name', i18n('general.error.walletName.exists'))
    }
  })
}

const walletPassword = (password: Password, passwordConfirm: Password) => {
  testKeystorePassword(password)

  if (password !== passwordConfirm) {
    throw new InvalidFieldError('passwordConfirm', i18n('general.error.passwordConfirm.notMatched'))
  }
}

const testKeystorePassword = (password: Password) => {
  const error = Keystore.testPassword(password).errors[0]

  if (error) {
    throw new InvalidFieldError('password', error)
  }
}

function customAssetData(assetData: CustomAssetData, digitalAssets: DigitalAssets) {
  const { address, name, symbol, decimals }: CustomAssetData = assetData

  customAssetName(name)
  customAssetPropUniq('name', name, digitalAssets)
  customAssetAddress(address)
  customAssetPropUniq('address', address, digitalAssets)
  customAssetSymbol(symbol)
  customAssetPropUniq('symbol', symbol, digitalAssets)
  customAssetDecimals(decimals)
}

function customAssetAddress(address: Address) {
  if (address === ethereum.address) {
    return
  }

  if (!Keystore.isAddressValid(address)) {
    throw new InvalidFieldError('address', i18n('general.error.address.invalid'))
  }
}

function customAssetName(name: string) {
  const isInvalid: boolean = /[^a-z0-9. ]/ig.test(name)
  const isShort: boolean = lt(name.length, 3)
  const isLong: boolean = gt(name.length, 100)

  if (isInvalid || isShort || isLong) {
    throw new InvalidFieldError('name', i18n('general.error.name.invalid'))
  }
}

function customAssetSymbol(symbol: string) {
  const isInvalid: boolean = /[^a-z0-9 ]/ig.test(symbol)
  const isShort: boolean = lt(symbol.length, 3)
  const isLong: boolean = gt(symbol.length, 6)

  if (isInvalid || isShort || isLong) {
    throw new InvalidFieldError('symbol', i18n('general.error.symbol.invalid'))
  }
}

function customAssetDecimals(decimals: string) {
  const decimalsInt: number = parseInt(decimals, 10) || 0
  const isLess: boolean = lt(decimalsInt, 1)
  const isGreater: boolean =  gt(decimalsInt, 18)

  if (isLess || isGreater) {
    throw new InvalidFieldError('decimals', i18n('general.error.decimals.invalid'))
  }
}

function customAssetPropUniq(propName: string, propValue: string, digitalAssets: DigitalAssets) {
  digitalAssets.forEach((digitalAsset: DigitalAsset) => {
    const isEqual: boolean = equals(toLower(propValue), toLower(digitalAsset[propName]))

    if (isEqual) {
      throw new InvalidFieldError(propName, i18n(`general.error.${propName}.exists`))
    }
  })
}

function searchQuery(query: string) {
  if (/[^a-z0-9 \-.,]/ig.test(query)) {
    throw new InvalidFieldError('searchQuery', i18n('general.error.searchQuery.invalid'))
  }
}

function txData(
  sendFundsData: SendFundsData,
  ethBal: number,
  assetBal: number,
  decimals: Decimals,
): void {
  const { amount, recipient, gas, gasPrice, nonce }: SendFundsData = sendFundsData

  ethBalance(ethBal)

  txAmount(amount)
  txValueGreaterThan0(amount, decimals)
  txValueLessThanAssetBalance(amount, decimals, assetBal)

  txRecipient(recipient)
  txGas(gas)
  txGasPrice(gasPrice)
  txNonce(nonce)
}

function ethBalance(ethBal: number): void {
  if (!ethBal) {
    throw new InvalidFieldError('amount', i18n('general.error.amount.emptyETHBalance'))
  }
}

function txAmount(amount: string): void {
  if (/[^\d.]/.test(amount)) {
    throw new InvalidFieldError('amount', i18n('general.error.amount.invalid'))
  }
}

function txValueGreaterThan0(amount: string, decimals: Decimals): void {
  const value: Bignumber = getTransactionValue(amount, decimals)

  if (value.lt(0)) {
    throw new InvalidFieldError('amount', i18n('general.error.amount.lessThan0'))
  }
}

function txValueLessThanAssetBalance(amount: string, decimals: Decimals, assetBal: number): void {
  const value: Bignumber = getTransactionValue(amount, decimals)
  const balance: Bignumber = getTransactionValue(assetBal, decimals)

  if (value.gt(balance)) {
    throw new InvalidFieldError('amount', i18n('general.error.amount.exceedsBalance'))
  }
}

function txRecipient(address: Address): void {
  if (!Keystore.isAddressValid(address)) {
    throw new InvalidFieldError('recipient', i18n('general.error.recipient.invalid'))
  }
}

function txGas(gas: ?string): void {
  if (gas && /\D/.test(gas)) {
    throw new InvalidFieldError('gas', i18n('general.error.gas.invalid'))
  }

  if (gas && toBigNumber(gas).lte(0)) {
    throw new InvalidFieldError('gas', i18n('general.error.gas.lessThan0'))
  }
}

function txGasPrice(gasPrice: ?string): void {
  if (gasPrice && /\D/.test(gasPrice)) {
    throw new InvalidFieldError('gasPrice', i18n('general.error.gasPrice.invalid'))
  }

  if (gasPrice && toBigNumber(gasPrice).lessThanOrEqualTo(0)) {
    throw new InvalidFieldError('gasPrice', i18n('general.error.gasPrice.lessThan0'))
  }
}

function txNonce(nonce: ?string): void {
  if (nonce && /\D/.test(nonce)) {
    throw new InvalidFieldError('nonce', i18n('general.error.nonce.invalid'))
  }

  if (nonce && toBigNumber(nonce).lessThan(0)) {
    throw new InvalidFieldError('nonce', i18n('general.error.nonce.lessThan0'))
  }
}

export default {
  customNetworkRPC,
  derivationPath,
  walletName,
  walletNameUniq,
  walletPassword,
  testKeystorePassword,
  customAssetData,
  customAssetAddress,
  customAssetName,
  customAssetSymbol,
  customAssetDecimals,
  customAssetPropUniq,
  searchQuery,
  txData,
  txAmount,
  txValueGreaterThan0,
  txValueLessThanAssetBalance,
  txRecipient,
  txGas,
  txGasPrice,
  txNonce,
}
