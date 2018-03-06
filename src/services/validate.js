// @flow

import Keystore from 'jwallet-web-keystore'
import { equals, isEmpty, gt, lt, toLower } from 'ramda'

import ethereum from 'data/assets/ethereum'
import { InvalidFieldError } from 'utils/errors'

const derivationPath = (data: {
  customDerivationPath: string,
  knownDerivationPath: string,
}): void => {
  const path: string = data.customDerivationPath || data.knownDerivationPath

  if (Keystore.isDerivationPathValid(path)) {
    return
  }

  throw new InvalidFieldError('customDerivationPath', i18n('general.error.derivationPath.invalid'))
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

  customAssetAddress(address)
  customAssetPropUniq('address', address, digitalAssets)
  customAssetName(name)
  customAssetPropUniq('name', name, digitalAssets)
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

export default {
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
}
