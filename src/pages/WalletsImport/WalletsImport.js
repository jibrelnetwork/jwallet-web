// @flow strict

import Promise from 'bluebird'
import { t } from 'ttag'
import { isEmpty } from 'lodash-es'
import { connect } from 'react-redux'

import { walletsPlugin } from 'store/plugins'
import { checkMnemonicType } from 'utils/wallets'
import { selectPasswordHint } from 'store/selectors/password'

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
  getSuccessDataMessage,
  getErrorDerivationPathMessage,
} from './dataMessage'

type OwnProps = {|
  +onBack?: ?WalletsImportBackHandler,
|}

const RE_INVALID_NAME: RegExp = /[/]/

async function importWallet(values: FormFields): ?FormFields {
  return walletsPlugin.importWallet(values)
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

  return null
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
        const validateDerivationPathResult: ?string = getErrorDerivationPathMessage(derivationPath)

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

async function submitWalletsImportForm({
  goToPasswordStep,
  values,
  currentStep,
}: WalletsImportSubmitPayload): Promise<?FormFields> {
  const errors: ?FormFields = validateWalletsImportForm(values, currentStep)

  if (!isEmpty(errors)) {
    return errors
  }

  switch (currentStep) {
    case STEPS.DATA:
      return goToPasswordStep()

    case STEPS.PASSWORD:
      return importWallet(values)

    default:
      return null
  }
}

function mapStateToProps(state: AppState) {
  return {
    getInfoDataMessage,
    getErrorDataMessage,
    getSuccessDataMessage,
    getErrorDerivationPathMessage,
    hint: selectPasswordHint(state),
    submit: submitWalletsImportForm,
  }
}

export const WalletsImport = connect<Props, OwnProps, _, _, _, _>(
  mapStateToProps,
)(WalletsImportView)
