// @flow

import type {
  WalletsImportRequestPayload,
  WalletsSetWalletsActionPayload,
} from 'routes/Wallets/modules/wallets'

/* eslint-disable max-len */
export const OPEN_VIEW: '@@walletsImport/OPEN_VIEW' = '@@walletsImport/OPEN_VIEW'
export const CLOSE_VIEW: '@@walletsImport/CLOSE_VIEW' = '@@walletsImport/CLOSE_VIEW'

export const CHANGE_DATA_INPUT: '@@walletsImport/CHANGE_DATA_INPUT' = '@@walletsImport/CHANGE_DATA_INPUT'
export const CHANGE_PASSPHRASE_INPUT: '@@walletsImport/CHANGE_PASSPHRASE_INPUT' = '@@walletsImport/CHANGE_PASSPHRASE_INPUT'
export const CHANGE_DERIVATION_PATH_INPUT: '@@walletsImport/CHANGE_DERIVATION_PATH_INPUT' = '@@walletsImport/CHANGE_DERIVATION_PATH_INPUT'

export const SET_WALLET_TYPE: '@@walletsImport/SET_WALLET_TYPE' = '@@walletsImport/SET_WALLET_TYPE'

export const GO_TO_NEXT_STEP: '@@walletsImport/GO_TO_NEXT_STEP' = '@@walletsImport/GO_TO_NEXT_STEP'
export const GO_TO_PREV_STEP: '@@walletsImport/GO_TO_PREV_STEP' = '@@walletsImport/GO_TO_PREV_STEP'
export const SET_CURRENT_STEP: '@@walletsImport/SET_CURRENT_STEP' = '@@walletsImport/SET_CURRENT_STEP'

export const IMPORT_ERROR: '@@walletsImport/IMPORT_ERROR' = '@@walletsImport/IMPORT_ERROR'
export const IMPORT_SUCCESS: '@@walletsImport/IMPORT_SUCCESS' = '@@walletsImport/IMPORT_SUCCESS'
export const IMPORT_REQUEST: '@@walletsImport/IMPORT_REQUEST' = '@@walletsImport/IMPORT_REQUEST'

export const SET_INVALID_FIELD: '@@walletsImport/SET_INVALID_FIELD' = '@@walletsImport/SET_INVALID_FIELD'

export const CLEAN: '@@walletsImport/CLEAN' = '@@walletsImport/CLEAN'
/* eslint-enable max-len */

export const STEPS: WalletsImportSteps = {
  NAME: 0,
  DATA: 1,
  PASSWORD: 2,
}

export function openView() {
  return {
    type: OPEN_VIEW,
  }
}

export function closeView() {
  return {
    type: CLOSE_VIEW,
  }
}

export function changeDataInput(data: string) {
  return {
    type: CHANGE_DATA_INPUT,
    payload: {
      data,
    },
  }
}

export function changeDerivationPathInput(derivationPath: string) {
  return {
    type: CHANGE_DERIVATION_PATH_INPUT,
    payload: {
      derivationPath,
    },
  }
}

export function changePassphraseInput(passphrase: string) {
  return {
    type: CHANGE_PASSPHRASE_INPUT,
    payload: {
      passphrase,
    },
  }
}

export function setWalletType(walletType: ?WalletCustomType) {
  return {
    type: SET_WALLET_TYPE,
    payload: {
      walletType,
    },
  }
}

export function goToNextStep() {
  return {
    type: GO_TO_NEXT_STEP,
  }
}

export function goToPrevStep() {
  return {
    type: GO_TO_PREV_STEP,
  }
}

export function setCurrentStep(currentStep: WalletsImportStepIndex) {
  return {
    type: SET_CURRENT_STEP,
    payload: {
      currentStep,
    },
  }
}

export function importError(message: string) {
  return {
    type: IMPORT_ERROR,
    payload: {
      message,
    },
    error: true,
  }
}

export function importSuccess(payload: WalletsSetWalletsActionPayload) {
  return {
    type: IMPORT_SUCCESS,
    payload,
  }
}

export function importRequest(payload: WalletsImportRequestPayload) {
  return {
    type: IMPORT_REQUEST,
    payload,
  }
}

export function setInvalidField(fieldName: string, message: string) {
  return {
    type: SET_INVALID_FIELD,
    payload: {
      fieldName,
      message,
    },
  }
}

export function clean() {
  return {
    type: CLEAN,
  }
}

export type WalletsImportAction =
  ExtractReturn<typeof openView> |
  ExtractReturn<typeof closeView> |
  ExtractReturn<typeof changePassphraseInput> |
  ExtractReturn<typeof changeDerivationPathInput> |
  ExtractReturn<typeof setWalletType> |
  ExtractReturn<typeof goToNextStep> |
  ExtractReturn<typeof goToPrevStep> |
  ExtractReturn<typeof setCurrentStep> |
  ExtractReturn<typeof importError> |
  ExtractReturn<typeof importSuccess> |
  ExtractReturn<typeof importRequest> |
  ExtractReturn<typeof setInvalidField> |
  ExtractReturn<typeof clean>

const initialState: WalletsImportState = {
  invalidFields: {},
  data: '',
  passphrase: '',
  walletType: null,
  derivationPath: '',
  currentStep: STEPS.NAME,
}

const walletsImport = (
  state: WalletsImportState = initialState,
  action: WalletsImportAction,
): WalletsImportAction => {
  switch (action.type) {
    case CHANGE_DATA_INPUT:
      return {
        ...state,
        data: action.payload.data,
        invalidFields: {
          ...state.invalidFields,
          data: null,
        },
      }

    case CHANGE_PASSPHRASE_INPUT:
      return {
        ...state,
        passphrase: action.payload.passphrase,
        invalidFields: {
          ...state.invalidFields,
          passphrase: null,
        },
      }

    case CHANGE_DERIVATION_PATH_INPUT:
      return {
        ...state,
        derivationPath: action.payload.derivationPath,
        invalidFields: {
          ...state.invalidFields,
          derivationPath: null,
        },
      }

    case SET_WALLET_TYPE:
      return {
        ...state,
        walletType: action.payload.walletType,
      }

    case SET_CURRENT_STEP:
      return {
        ...state,
        currentStep: action.payload.currentStep,
      }

    case SET_INVALID_FIELD: {
      const { message, fieldName } = action.payload

      return {
        ...state,
        invalidFields: {
          ...state.invalidFields,
          [fieldName]: message,
        },
      }
    }

    case CLEAN:
      return initialState

    default:
      return state
  }
}

export default walletsImport
