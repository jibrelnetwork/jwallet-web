// @flow

import Promise from 'bluebird'
import { t } from 'ttag'
import { connect } from 'react-redux'

import { walletsPlugin } from 'store/plugins'
import { checkMnemonicType } from 'utils/wallets'

import {
  checkMnemonicValid,
  checkDerivationPathValid,
} from 'utils/mnemonic'

import {
  checkNormalizedAddress,
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
const RE_HEX_PREFIX: RegExp = /^0x/i
const RE_XPRV_PREFIX: RegExp = /^xprv/i
const RE_XPUB_PREFIX: RegExp = /^xpub/i

async function importWallet(values: FormFields): ?FormFields {
  return walletsPlugin.importWallet(values)
}

async function submitWalletsImportForm({
  currentStep,
  goToPasswordStep,
  values,
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

  return null
}

function validateMnemonic(mnemonic: string): ?FormFields {
  const words: string[] = mnemonic.split(' ')
  const wordsLen: number = words.length

  if ((wordsLen < 3) || (wordsLen > 24)) {
    return null
  }

  const hasInvalidSymbols: boolean = /[^a-z ]/i.test(mnemonic)

  if (hasInvalidSymbols) {
    return {
      data: t`BIP39 mnemonic should be in English`,
    }
  }

  const isFinalLen: boolean = !(wordsLen % 3)

  if (!isFinalLen) {
    return {
      mnemonic: t`Seems like you are entering BIP39 mnemonic`,
    }
  }

  const isMnemonicValid: boolean = checkMnemonicValid(mnemonic)

  if (!isMnemonicValid) {
    return {
      data: t`Incorrect BIP39 mnemonic`,
    }
  }

  return {
    mnemonic: t`You have entered BIP39 mnemonic`,
  }
}

function validateXPRV(xprv: string): ?FormFields {
  const isXPRV: boolean = RE_XPRV_PREFIX.test(xprv)

  if (!isXPRV) {
    return null
  }

  const cleanedXPRV: string = xprv.replace(RE_XPRV_PREFIX, '')
  const hasInvalidSymbols: boolean = /[^a-z1-9]/i.test(cleanedXPRV)

  if (hasInvalidSymbols) {
    return {
      data: t`BIP32 XPRV should be in base58 encoding`,
    }
  }

  const xprvLen: number = xprv.length

  if (xprvLen < XKEY_LENGTH) {
    return {
      xprv: t`Seems like you are entering BIP32 XPRV`,
    }
  }

  if (xprvLen > XKEY_LENGTH) {
    return {
      data: t`Length of BIP32 XPRV can't be greater than ${XKEY_LENGTH} symbols`,
    }
  }

  return {
    xprv: t`You have entered BIP32 XPRV`,
  }
}

function validateXPUB(xpub: string): ?FormFields {
  const isXPUB: boolean = RE_XPUB_PREFIX.test(xpub)

  if (!isXPUB) {
    return null
  }

  const cleanedXPUB: string = xpub.replace(RE_XPUB_PREFIX, '')
  const hasInvalidSymbols: boolean = /[^a-z1-9]/i.test(cleanedXPUB)

  if (hasInvalidSymbols) {
    return {
      data: t`BIP32 XPUB should be in base58 encoding`,
    }
  }

  const xpubLen: number = xpub.length

  if (xpubLen < XKEY_LENGTH) {
    return {
      xpub: t`Seems like you are entering BIP32 XPUB`,
    }
  }

  if (xpubLen > XKEY_LENGTH) {
    return {
      data: t`Length of BIP32 XPUB can't be greater than ${XKEY_LENGTH} symbols`,
    }
  }

  return {
    xpub: t`You have entered BIP32 XPUB`,
  }
}

function validatePrivateKey(privateKey: string): ?FormFields {
  if (privateKey.length < 41) {
    return null
  }

  const hasInvalidSymbols: boolean = /[^a-f0-9]/i.test(privateKey)

  if (hasInvalidSymbols) {
    return {
      data: t`Incorrect Ethereum private key`,
    }
  }

  if (privateKey.length < 64) {
    return {
      privateKey: t`Seems like you are entering Ethereum private key`,
    }
  }

  if (privateKey.length > 64) {
    return {
      data: t`Length of private key can't be greater than 64 symbols`,
    }
  }

  return {
    privateKey: t`You have entered Ethereum private key`,
  }
}

function validateAddress(address: string): FormFields {
  if (address.length < 40) {
    const isPartialAddress: boolean = /[0-9a-f]{1,39}$/i.test(address)

    if (address.length && !isPartialAddress) {
      return {
        data: t`Incorrect Ethereum address`,
      }
    }

    return {
      address: t`Seems like you are entering Ethereum address`,
    }
  }

  const isValidNormalizedAddress: boolean = checkNormalizedAddress(address)

  if (!isValidNormalizedAddress) {
    return {
      data: t`Incorrect Ethereum address`,
    }
  }

  const isValidChecksumAddress: boolean = checkAddressWithChecksumValid(address)

  if (!isValidChecksumAddress) {
    return {
      data: t`Seems you made a typo in Ethereum address`,
    }
  }

  return {
    address: t`You have entered Ethereum address`,
  }
}

function validateWalletData(data: ?string): ?FormFields {
  const trimmedData: string = (data || '').trim()

  if (!trimmedData) {
    return {
      data: t`The field should not be empty`,
    }
  }

  const validateMnemonicResult: ?FormFields = validateMnemonic(trimmedData)

  if (validateMnemonicResult) {
    return validateMnemonicResult
  }

  const validateXPRVResult: ?FormFields = validateXPRV(trimmedData)

  if (validateXPRVResult) {
    return validateXPRVResult
  }

  const validateXPUBResult: ?FormFields = validateXPUB(trimmedData)

  if (validateXPUBResult) {
    return validateXPUBResult
  }

  if (data && RE_HEX_PREFIX.test(data)) {
    const cleanedData: string = data.replace(RE_HEX_PREFIX, '')

    const validatePrivateKeyResult: ?FormFields = validatePrivateKey(trimmedData)

    if (validatePrivateKeyResult) {
      return validatePrivateKeyResult
    }

    return validateAddress(cleanedData)
  }

  return {
    data: t`Unable to recognize your input`,
  }
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

      const validateWalletDataResult: ?FormFields = validateWalletData(data)

      if (validateWalletDataResult) {
        // eslint-disable-next-line fp/no-mutating-assign
        Object.assign(formErrors, validateWalletDataResult)
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

function mapStateToProps() {
  return {
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
