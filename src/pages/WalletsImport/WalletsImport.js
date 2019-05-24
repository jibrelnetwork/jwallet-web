// @flow strict

import Promise from 'bluebird'
import { t } from 'ttag'
import { connect } from 'react-redux'

import { walletsPlugin } from 'store/plugins'
import { checkMnemonicType } from 'utils/wallets'
import { selectPasswordHint } from 'store/selectors/password'

import {
  checkXkeyValid,
  checkMnemonicValid,
  checkDerivationPathValid,
} from 'utils/mnemonic'

import {
  checkAddressValid,
  checkPrivateKeyValid,
} from 'utils/address'

import {
  STEPS,
  WalletsImportView,
  type WalletsImportStep,
  type WalletsImportBackHandler,
  type WalletsImportSubmitPayload,
  type Props,
} from './WalletsImportView'

import {
  getInfoDataMessage,
  getErrorDataMessage,
} from './dataMessage'

type OwnProps = {|
  +onBack?: ?WalletsImportBackHandler,
|}

const RE_INVALID_NAME: RegExp = /[/]/

function getSuccessDataMessage(data: ?string): ?string {
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

  const hasInvalidSymbols: boolean = RE_INVALID_NAME.test(name)

  if (hasInvalidSymbols) {
    return t`Name should not include invalid symbols`
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

  const errorDataMessage: ?string = getErrorDataMessage(
    trimmedData,
    passphrase,
    derivationPath,
    walletType,
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

function validateWalletsImportForm(
  values: FormFields,
  currentStep: WalletsImportStep,
): ?FormFields {
  const {
    name,
    data,
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

    default:
      return null
  }
}

function mapStateToProps(state: AppState) {
  return {
    getInfoDataMessage,
    getErrorDataMessage,
    getSuccessDataMessage,
    hint: selectPasswordHint(state),
    submit: submitWalletsImportForm,
    validate: validateWalletsImportForm,
  }
}

export const WalletsImport = connect<Props, OwnProps, _, _, _, _>(
  mapStateToProps,
)(WalletsImportView)
