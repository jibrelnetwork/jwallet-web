import { gaSendEvent } from 'utils/analytics'

import {
  STEPS as CREATE_STEPS,
  GO_TO_NEXT_STEP as CREATE_GO_TO_NEXT_STEP,
  CREATE_SUCCESS,
} from 'store/modules/walletsCreate'

import {
  STEPS as IMPORT_STEPS,
  GO_TO_NEXT_STEP as IMPORT_GO_TO_NEXT_STEP,
  IMPORT_SUCCESS,
} from 'store/modules/walletsImport'

import {
  selectWalletsCreate,
  selectWalletsImport,
} from 'store/selectors/wallets'

const CREATION_EVENTS = {
  [CREATE_STEPS.NAME]: 'NameCreated',
  [CREATE_STEPS.PASSWORD]: 'PaymentPasswordEntered',
}

const IMPORT_EVENTS = {
  [IMPORT_STEPS.NAME]: 'NameCreated',
  [IMPORT_STEPS.DATA]: 'DataImported',
  [IMPORT_STEPS.PASSWORD]: 'PaymentPasswordEntered',
}

export const newWalletEvents = (state, action) => {
  switch (action.type) {
    case CREATE_GO_TO_NEXT_STEP: {
      const walletsCreate = selectWalletsCreate(state)
      gaSendEvent('CreateWallet', CREATION_EVENTS[walletsCreate.currentStep])

      break
    }
    case CREATE_SUCCESS: {
      gaSendEvent('CreateWallet', 'WalletCreated')

      break
    }
    case IMPORT_GO_TO_NEXT_STEP: {
      const walletsImport = selectWalletsImport(state)
      gaSendEvent('ImportWallet', IMPORT_EVENTS[walletsImport.currentStep])

      break
    }
    case IMPORT_SUCCESS: {
      gaSendEvent('ImportWallet', 'WalletCreated')

      break
    }
    default: {
      // skip
    }
  }
}
