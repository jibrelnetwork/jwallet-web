// @flow strict

import { t } from 'ttag'

import { walletsPlugin } from 'store/plugins'

import {
  checkXkeyValid,
  getXPUBFromXPRV,
  checkMnemonicValid,
  getXPUBFromMnemonic,
  checkDerivationPathValid,
} from 'utils/mnemonic'

import {
  strip0x,
  checkAddressValid,
  checkPrivateKeyValid,
  checkNormalizedAddress,
  getAddressFromPrivateKey,
  checkAddressWithChecksumValid,
} from 'utils/address'

const XKEY_LENGTH: number = 111
const RE_HEX_PREFIX: RegExp = /^0x/i
const RE_XPRV_PREFIX: RegExp = /^xprv/i
const RE_XPUB_PREFIX: RegExp = /^xpub/i
const RE_INVALID_HEX: RegExp = /[^a-f0-9]/i
const RE_INVALID_BASE: RegExp = /[^a-z1-9]/i
const RE_INVALID_MNEMONIC: RegExp = /[^a-z ]/i

export function getSuccessDataMessage(data: ?string): ?string {
  const trimmedData: string = (data || '').trim()

  // Order is important
  if (checkMnemonicValid(trimmedData)) {
    const wordsLen: number = trimmedData.split(' ').length

    return t`You have entered ${wordsLen} BIP39 mnemonic`
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
        if (derivationPath && !checkDerivationPathValid(derivationPath)) {
          return null
        }

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

function getInfoMnemonicMessage(
  data: string,
  passphrase: ?string,
  derivationPath: ?string,
): ?string {
  if (!checkMnemonicInput(data) || RE_INVALID_MNEMONIC.test(data)) {
    return null
  }

  const words: string[] = data.split(' ')
  const wordsLen: number = words.length
  const isFinalLen: boolean = !(wordsLen % 3)

  if (!isFinalLen) {
    return t`Seems like you are entering BIP39 mnemonic`
  } else if (!checkMnemonicValid(data)) {
    return null
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

function getInfoXPRVMessage(data: string): ?string {
  if (!RE_XPRV_PREFIX.test(data) || RE_INVALID_BASE.test(data)) {
    return null
  } else if (data.length < XKEY_LENGTH) {
    return t`Seems like you are entering BIP32 XPRV`
  } else if (!checkXkeyValid(data, 'prv')) {
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

function getInfoXPUBMessage(data: string): ?string {
  if (!RE_XPUB_PREFIX.test(data) || RE_INVALID_BASE.test(data)) {
    return null
  } else if (data.length < XKEY_LENGTH) {
    return t`Seems like you are entering BIP32 XPUB`
  }

  return null
}

function getInfoPrivateKeyMessage(data: string): ?string {
  const cleanedData: string = strip0x(data)

  if ((cleanedData.length <= 40) || RE_INVALID_HEX.test(cleanedData)) {
    return null
  } else if (cleanedData.length < 64) {
    return t`Seems like you are entering Ethereum private key`
  } else if (cleanedData.length > 64) {
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

function getInfoAddressMessage(data: string): ?string {
  const cleanedData: string = strip0x(data)

  if ((cleanedData.length > 40) || RE_INVALID_HEX.test(cleanedData)) {
    return null
  } else if (cleanedData.length < 40) {
    return t`Seems like you are entering Ethereum address`
  }

  return null
}

export function getInfoDataMessage(
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
    getInfoMnemonicMessage(
      trimmedData,
      passphrase,
      derivationPath,
    ) ||
    getInfoXPRVMessage(trimmedData) ||
    getInfoXPUBMessage(trimmedData) ||
    getInfoPrivateKeyMessage(trimmedData) ||
    getInfoAddressMessage(trimmedData)
  )
}

function getErrorMnemonicMessage(data: string): ?string {
  if (!checkMnemonicInput(data)) {
    return null
  }

  const words: string[] = data.split(' ')
  const wordsLen: number = words.length
  const isFinalLen: boolean = !(wordsLen % 3)

  if (!isFinalLen) {
    return null
  } else if (!checkMnemonicValid(data)) {
    return t`Incorrect BIP39 mnemonic`
  } else if (RE_INVALID_MNEMONIC.test(data)) {
    return t`BIP39 mnemonic should be in English`
  }

  return null
}

function getErrorXPRVMessage(data: string): ?string {
  if (!RE_XPRV_PREFIX.test(data)) {
    return null
  } else if (RE_INVALID_BASE.test(data)) {
    return t`Incorrect BIP32 XPRV`
  }

  const dataLen: number = data.length

  if (dataLen < XKEY_LENGTH) {
    return null
  } else if (dataLen > XKEY_LENGTH) {
    return t`BIP32 XPRV shouldn't be longer than ${XKEY_LENGTH} characters`
  } else if (!checkXkeyValid(data, 'prv')) {
    return t`Incorrect BIP32 XPRV`
  }

  return null
}

function getErrorXPUBMessage(data: string): ?string {
  if (!RE_XPUB_PREFIX.test(data)) {
    return null
  } else if (RE_INVALID_BASE.test(data)) {
    return t`Incorrect BIP32 XPUB`
  }

  const dataLen: number = data.length

  if (dataLen < XKEY_LENGTH) {
    return null
  } else if (dataLen > XKEY_LENGTH) {
    return t`BIP32 XPUB shouldn't be longer than ${XKEY_LENGTH} characters`
  } else if (!checkXkeyValid(data, 'pub')) {
    return t`Incorrect BIP32 XPUB`
  }

  return null
}

function getErrorPrivateKeyMessage(data: string): ?string {
  const cleanedData: string = strip0x(data)

  if (cleanedData.length <= 40) {
    return null
  }

  const hasHexPrefix: boolean = RE_HEX_PREFIX.test(data)
  const isValidPKLength: boolean = (cleanedData.length <= 64)
  const hasInvalidSymbols: boolean = RE_INVALID_HEX.test(cleanedData)

  if (isValidPKLength) {
    if (hasHexPrefix && hasInvalidSymbols) {
      return t`Incorrect Ethereum private key`
    }
  } else {
    if (hasInvalidSymbols) {
      return null
    }

    return t`Ethereum private key shouldn't be longer than 64 characters`
  }

  return null
}

function getErrorAddressMessage(data: string): ?string {
  const cleanedData: string = strip0x(data)
  const hasHexPrefix: boolean = RE_HEX_PREFIX.test(data)
  const hasInvalidSymbols: boolean = RE_INVALID_HEX.test(cleanedData)

  if (cleanedData.length > 40) {
    return null
  } else if (cleanedData.length <= 40) {
    if (hasHexPrefix && hasInvalidSymbols) {
      return t`Incorrect Ethereum address`
    }

    return null
  }

  if (hasInvalidSymbols) {
    return null
  }

  const isValidNormalizedAddress: boolean = checkNormalizedAddress(cleanedData)
  const isValidChecksumAddress: boolean = checkAddressWithChecksumValid(cleanedData)

  if (!(isValidNormalizedAddress || isValidChecksumAddress)) {
    return t`Seems you made a typo in Ethereum address`
  }

  return null
}

export function getErrorDataMessage(
  data: ?string,
  passphrase: ?string,
  derivationPath: ?string,
  walletType: ?string,
): ?string {
  const trimmedData: string = (data || '').trim()

  if (!trimmedData) {
    return null
  }

  if (walletType) {
    return null
  }

  const errorDataMessage: ?string = (
    // Order is important
    getErrorMnemonicMessage(trimmedData) ||
    getErrorXPRVMessage(trimmedData) ||
    getErrorXPUBMessage(trimmedData) ||
    getErrorPrivateKeyMessage(trimmedData) ||
    getErrorAddressMessage(trimmedData)
  )

  if (errorDataMessage) {
    return errorDataMessage
  }

  const infoDataMessage: ?string = getInfoDataMessage(trimmedData)
  const successDataMessage: ?string = getSuccessDataMessage(trimmedData)

  if (!(successDataMessage || infoDataMessage)) {
    return t`Unable to recognize your input`
  }

  return null
}
