// @flow strict

import Promise from 'bluebird'
import { isEmpty } from 'lodash-es'
import { connect } from 'react-redux'

import { validateName } from 'utils/wallets'
import { walletsPlugin } from 'store/plugins'
import { selectPasswordHint } from 'store/selectors/password'
import { blockNumbersRequest } from 'store/modules/walletsCreate'
import { selectWalletsCreatedBlockNumber } from 'store/selectors/wallets'

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

async function createWallet(
  values: FormFields,
  createdBlockNumber: ?WalletCreatedBlockNumber,
): ?FormFields {
  return walletsPlugin.importWallet(
    values,
    createdBlockNumber,
  )
}

function validateWalletsCreateForm(
  values: FormFields,
  currentStep: WalletsCreateStep,
): ?FormFields {
  const formErrors: FormFields = {}

  switch (currentStep) {
    case STEPS.NAME: {
      const validateWalletNameResult: ?string = validateName(values.name)

      if (validateWalletNameResult) {
        formErrors.name = validateWalletNameResult
      }

      return formErrors
    }

    default:
      return null
  }
}

async function submitWalletsCreateForm({
  setCurrentStep,
  values,
  currentStep,
  createdBlockNumber,
}: WalletsCreateSubmitPayload): Promise<?FormFields> {
  const errors: ?FormFields = validateWalletsCreateForm(values, currentStep)

  if (!isEmpty(errors)) {
    return errors
  }

  switch (currentStep) {
    case STEPS.NAME:
      return setCurrentStep(STEPS.BACKUP_TICKS)()

    case STEPS.BACKUP_TICKS:
      return setCurrentStep(STEPS.BACKUP_FORM)()

    case STEPS.BACKUP_FORM:
      return setCurrentStep(STEPS.PASSWORD)()

    case STEPS.PASSWORD:
      return createWallet(
        values,
        createdBlockNumber,
      )

    default:
      return null
  }
}

function mapStateToProps(state: AppState) {
  return {
    hint: selectPasswordHint(state),
    submit: submitWalletsCreateForm,
    createdBlockNumber: selectWalletsCreatedBlockNumber(state),
  }
}

const mapDispatchToProps = {
  requestBlockNumbers: blockNumbersRequest,
}

export const WalletsCreate = connect<Props, OwnProps, _, _, _, _>(
  mapStateToProps,
  mapDispatchToProps,
)(WalletsCreateView)
