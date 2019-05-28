// @flow strict

import { gaSendEvent } from 'utils/analytics'
import { CREATE_SUCCESS } from 'store/modules/wallets'
import { selectWalletsImport } from 'store/selectors/wallets'

import {
  STEPS as IMPORT_STEPS,
  GO_TO_NEXT_STEP as IMPORT_GO_TO_NEXT_STEP,
} from 'store/modules/walletsImport'

const IMPORT_EVENTS = {
  [IMPORT_STEPS.NAME]: 'NameCreated',
  [IMPORT_STEPS.DATA]: 'DataImported',
  [IMPORT_STEPS.PASSWORD]: 'PaymentPasswordEntered',
}

export const newWalletEvents = (state: AppState, action: any) => {
  switch (action.type) {
    case CREATE_SUCCESS: {
      const walletsImport = selectWalletsImport(state)

      if (walletsImport.currentStep !== IMPORT_STEPS.NAME) {
        gaSendEvent('ImportWallet', 'WalletCreated')
      }

      break
    }

    case IMPORT_GO_TO_NEXT_STEP: {
      const walletsImport = selectWalletsImport(state)
      gaSendEvent('ImportWallet', IMPORT_EVENTS[walletsImport.currentStep])

      break
    }

    default: {
      // skip
    }
  }
}
