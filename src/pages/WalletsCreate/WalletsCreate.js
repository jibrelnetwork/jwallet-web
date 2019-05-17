// @flow strict

import Promise from 'bluebird'
import { t } from 'ttag'
import { connect } from 'react-redux'

import { walletsPlugin } from 'store/plugins'
import { selectPasswordHint } from 'store/selectors/password'

import {
  STEPS,
  WalletsCreateView,
  type Props,
  type WalletsCreateStep,
  type WalletsCreateBackHandler,
  type WalletsCreateSubmitPayload,
} from './WalletsCreateView'

type OwnProps = {|
  +onBack?: ?WalletsCreateBackHandler,
|}

async function createWallet(values: FormFields): ?FormFields {
  return walletsPlugin.importWallet(values)
}

async function submitWalletsCreateForm({
  setCurrentStep,
  values,
  currentStep,
}: WalletsCreateSubmitPayload): Promise<?FormFields> {
  switch (currentStep) {
    case STEPS.NAME:
      return setCurrentStep(STEPS.BACKUP_TICKS)()

    case STEPS.BACKUP_TICKS:
      return setCurrentStep(STEPS.BACKUP_FORM)()

    case STEPS.BACKUP_FORM:
      return setCurrentStep(STEPS.PASSWORD)()

    case STEPS.PASSWORD:
      return createWallet(values)

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

function validatePassword(password: ?string): ?string {
  if (password) {
    return null
  }

  return t`Password can't be empty`
}

function validateWalletsCreateForm(
  values: FormFields,
  currentStep: WalletsCreateStep,
): ?FormFields {
  const {
    name,
    password,
  }: FormFields = values

  const formErrors: FormFields = {}

  switch (currentStep) {
    case STEPS.NAME: {
      const validateWalletNameResult: ?string = validateWalletName(name)

      if (validateWalletNameResult) {
        formErrors.name = validateWalletNameResult
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
    hint: selectPasswordHint(state),
    submit: submitWalletsCreateForm,
    validate: validateWalletsCreateForm,
  }
}

export const WalletsCreate = connect<Props, OwnProps, _, _, _, _>(
  mapStateToProps,
)(WalletsCreateView)
