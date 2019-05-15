// @flow

import Promise from 'bluebird'
import { t } from 'ttag'
import { connect } from 'react-redux'

import { walletsPlugin } from 'store/plugins'
import { checkMnemonicType } from 'utils/wallets'
import { selectPasswordHint } from 'store/selectors/password'

import {
  checkXkeyValid,
  getXPUBFromXPRV,
  checkMnemonicValid,
  getXPUBFromMnemonic,
  checkDerivationPathValid,
} from 'utils/mnemonic'

import {
  add0x,
  strip0x,
  checkAddressValid,
  checkPrivateKeyValid,
  checkNormalizedAddress,
  getAddressFromPrivateKey,
  checkAddressWithChecksumValid,
} from 'utils/address'

import {
  STEPS,
  WalletsImportView,
  type WalletsImportStep,
  /* ::
  type WalletsImportBackHandler,
  */
  type WalletsImportSubmitPayload,
} from './WalletsImportView'

const XKEY_LENGTH: number = 111
const RE_XPRV_PREFIX: RegExp = /^xprv/i
const RE_XPUB_PREFIX: RegExp = /^xpub/i

function getSuccessDataMessage(data: ?string): ?string {
  const trimmedData: string = (data || '').trim()

  // Order is important
  if (checkMnemonicValid(trimmedData)) {
    return t`You have entered BIP39 mnemonic`
  } else if (checkXkeyValid(trimmedData, 'prv')) {
    return t`You have entered BIP32 XPRV`
  } else if (checkXkeyValid(trimmedData, 'pub')) {
    return t`You have entered BIP32 XPUB`
  } else if (checkPrivateKeyValid(trimmedData)) {
    return t`You have entered Ethereum private key`
  } else if (checkAddressValid(trimmedData)) {
    return t`You have entered Ethereum address`
  }

  return null
}

function checkMnemonicInput(data: string): boolean {
  const words: string[] = data.split(' ')
  const wordsLen: number = words.length

  if ((wordsLen < 3) || (wordsLen > 24)) {
    return false
  }

  return true
}

function getInfoMnemonicMessage(data: string): ?string {
  if (!checkMnemonicInput(data)) {
    return null
  }

  const words: string[] = data.split(' ')
  const wordsLen: number = words.length

  const hasInvalidSymbols: boolean = /[^a-z ]/i.test(data)

  if (hasInvalidSymbols) {
    return t`BIP39 mnemonic should be in English`
  }

  const isFinalLen: boolean = !(wordsLen % 3)

  if (!isFinalLen) {
    return t`Seems like you are entering BIP39 mnemonic`
  }

  return null
}

function getInfoXPRVMessage(data: string): ?string {
  if (!RE_XPRV_PREFIX.test(data)) {
    return null
  }

  const cleanedData: string = data.replace(RE_XPRV_PREFIX, '')
  const hasInvalidSymbols: boolean = /[^a-z1-9]/i.test(cleanedData)

  if (hasInvalidSymbols) {
    return t`BIP32 XPRV should be in base58 encoding`
  }

  const dataLen: number = data.length

  if (dataLen < XKEY_LENGTH) {
    return t`Seems like you are entering BIP32 XPRV`
  }

  if (dataLen > XKEY_LENGTH) {
    return t`Length of BIP32 XPRV can't be greater than ${XKEY_LENGTH} symbols`
  }

  return null
}

function getInfoXPUBMessage(data: string): ?string {
  if (!RE_XPUB_PREFIX.test(data)) {
    return null
  }

  const cleanedData: string = data.replace(RE_XPUB_PREFIX, '')
  const hasInvalidSymbols: boolean = /[^a-z1-9]/i.test(cleanedData)

  if (hasInvalidSymbols) {
    return t`BIP32 XPUB should be in base58 encoding`
  }

  const dataLen: number = data.length

  if (dataLen < XKEY_LENGTH) {
    return t`Seems like you are entering BIP32 XPUB`
  }

  if (dataLen > XKEY_LENGTH) {
    return t`Length of BIP32 XPUB can't be greater than ${XKEY_LENGTH} symbols`
  }

  return null
}

function getInfoPrivateKeyMessage(data: string): ?string {
  const cleanedData: string = strip0x(data)

  if (cleanedData.length <= 40) {
    return null
  }

  const hasInvalidSymbols: boolean = /[^a-f0-9]/i.test(cleanedData)

  if (hasInvalidSymbols) {
    return t`Ethereum private key should be in hex encoding`
  }

  if (cleanedData.length < 64) {
    return t`Seems like you are entering Ethereum private key`
  }

  if (cleanedData.length > 64) {
    return t`Length of private key can't be greater than 64 symbols`
  }

  return null
}

function getInfoAddressMessage(data: string): ?string {
  const cleanedData: string = strip0x(data)

  if (cleanedData.length > 40) {
    return null
  }

  if (cleanedData.length < 40) {
    const isPartialAddress: boolean = /[0-9a-f]{1,39}$/i.test(cleanedData)

    if (cleanedData.length && !isPartialAddress) {
      return t`Ethereum address should be in hex encoding`
    }

    return t`Seems like you are entering Ethereum address`
  }

  const isValidNormalizedAddress: boolean = checkNormalizedAddress(cleanedData)
  const isValidChecksumAddress: boolean = checkAddressWithChecksumValid(cleanedData)

  if (!(isValidNormalizedAddress || isValidChecksumAddress)) {
    return t`Seems you made a typo in Ethereum address`
  }

  return null
}

function getUniquenessMessage(
  data: string,
  passphrase: ?string,
  derivationPath: ?string,
  walletType: ?string,
): ?string {
  try {
    switch (walletType) {
      case 'address': {
        walletsPlugin.checkWalletUniqueness(data, 'address')

        break
      }

      case 'privateKey': {
        const address: string = getAddressFromPrivateKey(strip0x(data))
        walletsPlugin.checkWalletUniqueness(address, 'address')

        break
      }

      case 'xpub': {
        walletsPlugin.checkWalletUniqueness(data, 'xpub')

        break
      }

      case 'xprv': {
        const xpub: string = getXPUBFromXPRV(data)
        walletsPlugin.checkWalletUniqueness(xpub, 'xpub')

        break
      }

      case 'mnemonic': {
        const xpub: string = getXPUBFromMnemonic(data, passphrase, derivationPath)
        walletsPlugin.checkWalletUniqueness(xpub, 'xpub')

        break
      }

      default: break
    }
  } catch (err) {
    return err.message
  }

  return null
}

function getInfoDataMessage(
  data: ?string,
  passphrase: ?string,
  derivationPath: ?string,
  walletType: ?string,
): ?string {
  const trimmedData: string = (data || '').trim()

  if (!trimmedData) {
    return null
  }

  const uniqMessage: ?string = getUniquenessMessage(
    trimmedData,
    passphrase,
    derivationPath,
    walletType,
  )

  if (walletType && !uniqMessage) {
    return null
  }

  return (
    // Order is important
    uniqMessage ||
    getInfoMnemonicMessage(trimmedData) ||
    getInfoXPRVMessage(trimmedData) ||
    getInfoXPUBMessage(trimmedData) ||
    getInfoPrivateKeyMessage(trimmedData) ||
    getInfoAddressMessage(trimmedData)
  )
}

async function importWallet(values: FormFields): ?FormFields {
  return walletsPlugin.importWallet(values)
}

async function submitWalletsImportForm({
  goToPasswordStep,
  values,
  currentStep,
}: WalletsImportSubmitPayload): Promise<?FormFields> {
  switch (currentStep) {
    case STEPS.DATA:
      return goToPasswordStep()

    case STEPS.PASSWORD:
      return importWallet(values)

    default:
      return null
  }
}

function validateWalletName(name: ?string): ?string {
  if (!name) {
    return t`Name should not be empty`
  } else if (name.length > 32) {
    return t`Length of name should not be greater than 32 symbols`
  }

  const hasInvalidSymbols: boolean = /[/]/i.test(name)

  if (hasInvalidSymbols) {
    return t`Name should not include invalid symbols`
  }

  return null
}

function validateMnemonic(
  data: string,
  passphrase: ?string,
  derivationPath: ?string,
): ?string {
  if (!checkMnemonicInput(data)) {
    return null
  }

  const isMnemonicValid: boolean = checkMnemonicValid(data)

  if (!isMnemonicValid) {
    return t`Incorrect BIP39 mnemonic`
  }

  if (derivationPath && !checkDerivationPathValid(derivationPath)) {
    return null
  }

  const xpub: string = getXPUBFromMnemonic(data, passphrase, derivationPath)

  try {
    walletsPlugin.checkWalletUniqueness(xpub, 'xpub')
  } catch (err) {
    return err.message
  }

  return null
}

function validateXPRV(data: string): ?string {
  if (!RE_XPRV_PREFIX.test(data)) {
    return null
  }

  const xpub: string = getXPUBFromXPRV(data)

  try {
    walletsPlugin.checkWalletUniqueness(xpub, 'xpub')
  } catch (err) {
    return err.message
  }

  return null
}

function validateXPUB(data: string): ?string {
  if (!RE_XPUB_PREFIX.test(data)) {
    return null
  }

  try {
    walletsPlugin.checkWalletUniqueness(data, 'xpub')
  } catch (err) {
    return err.message
  }

  return null
}

function validatePrivateKey(data: string): ?string {
  const cleanedData: string = strip0x(data)

  if (cleanedData.length <= 40) {
    return null
  }

  const address: string = getAddressFromPrivateKey(cleanedData)

  try {
    walletsPlugin.checkWalletUniqueness(address, 'address')
  } catch (err) {
    return err.message
  }

  return null
}

function validateAddress(data: string): ?string {
  const cleanedData: string = strip0x(data)

  if (cleanedData.length > 40) {
    return null
  }

  try {
    walletsPlugin.checkWalletUniqueness(add0x(data), 'address')
  } catch (err) {
    return err.message
  }

  return null
}

function validateWalletData(
  data: ?string,
  passphrase: ?string,
  derivationPath: ?string,
  walletType: ?string,
): ?string {
  const trimmedData: string = (data || '').trim()

  if (!trimmedData) {
    return t`The field should not be empty`
  }

  const infoDataMessage: ?string = getInfoDataMessage(
    trimmedData,
    passphrase,
    derivationPath,
    walletType,
  )

  if (infoDataMessage) {
    return infoDataMessage
  }

  const errorDataMessage: ?string = (
    // Order is important
    validateMnemonic(
      trimmedData,
      passphrase,
      derivationPath,
    ) ||
    validateXPRV(trimmedData) ||
    validateXPUB(trimmedData) ||
    validatePrivateKey(trimmedData) ||
    validateAddress(trimmedData)
  )

  if (errorDataMessage) {
    return errorDataMessage
  }

  const successDataMessage: ?string = getSuccessDataMessage(trimmedData)

  if (!successDataMessage) {
    return t`Unable to recognize your input`
  }

  return null
}

function validateDerivationPath(derivationPath: ?string): ?string {
  return (!derivationPath || checkDerivationPathValid(derivationPath))
    ? null
    : t`Derivation path is not valid`
}

function validatePassword(password: ?string): ?string {
  if (password) {
    return null
  }

  return t`Password can't be empty`
}

function validateWalletsImportForm(
  values: FormFields,
  currentStep: WalletsImportStep,
): ?FormFields {
  const {
    name,
    data,
    password,
    passphrase,
    derivationPath,
    walletType,
  }: FormFields = values

  const formErrors: FormFields = {}

  switch (currentStep) {
    case STEPS.DATA: {
      const validateWalletNameResult: ?string = validateWalletName(name)

      if (validateWalletNameResult) {
        formErrors.name = validateWalletNameResult
      }

      const validateWalletDataResult: ?string = validateWalletData(
        data,
        passphrase,
        derivationPath,
        walletType,
      )

      if (validateWalletDataResult) {
        formErrors.data = validateWalletDataResult
      }

      if (checkMnemonicType(walletType)) {
        const validateDerivationPathResult: ?string = validateDerivationPath(derivationPath)

        if (validateDerivationPathResult) {
          formErrors.derivationPath = validateDerivationPathResult
        }
      }

      return formErrors
    }

    case STEPS.PASSWORD: {
      const validatePasswordResult: ?string = validatePassword(password)

      if (validatePasswordResult) {
        return {
          password: validatePasswordResult,
        }
      }

      return null
    }

    default:
      return null
  }
}

function mapStateToProps(state: AppState) {
  return {
    getInfoDataMessage,
    getSuccessDataMessage,
    hint: selectPasswordHint(state),
    submit: submitWalletsImportForm,
    validate: validateWalletsImportForm,
  }
}

/* ::
type OwnProps = {|
  +onBack?: ?WalletsImportBackHandler,
|}
*/

export const WalletsImport = connect/* :: < AppState, null, OwnProps, _, _ > */(
  mapStateToProps,
)(WalletsImportView)
