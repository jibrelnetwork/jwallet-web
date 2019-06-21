// @flow strict

import Promise from 'bluebird'
import { t } from 'ttag'
import { isEmpty } from 'lodash-es'
import { connect } from 'react-redux'

import { walletsPlugin } from 'store/plugins'
import { selectPasswordHint } from 'store/selectors/password'

import {
  validateName,
  validateDerivationPath,
} from 'utils/wallets'

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

async function importWallet(values: FormFields): ?FormFields {
  return walletsPlugin.importWallet(values)
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
      const validateWalletNameResult: ?string = validateName(name)

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

      if (walletType === 'mnemonic') {
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

async function submitWalletsImportForm({
  goToPasswordStep,
  values,
  currentStep,
}: WalletsImportSubmitPayload): Promise<?FormFields> {
  const errors: ?FormFields = validateWalletsImportForm(values, currentStep)

  if (!isEmpty(errors)) {
    return errors
  }

  const { walletType }: FormFields = values
  const isReadOnly: boolean = ['address', 'xpub'].includes(walletType)

  if ((currentStep === STEPS.PASSWORD) || isReadOnly) {
    return importWallet(values)
  } else if (currentStep === STEPS.DATA) {
    return goToPasswordStep()
  }

  return null
}

function mapStateToProps(state: AppState) {
  return {
    hint: selectPasswordHint(state),
    submit: submitWalletsImportForm,
  }
}

export const WalletsImport = connect<Props, OwnProps, _, _, _, _>(
  mapStateToProps,
)(WalletsImportView)
