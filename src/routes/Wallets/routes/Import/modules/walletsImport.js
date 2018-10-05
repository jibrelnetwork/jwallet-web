// @flow

import type { WalletsSetWalletsActionPayload } from 'routes/Wallets/modules/wallets'

/* eslint-disable max-len */
export const GO_TO_START_VIEW: '@@walletsCreate/GO_TO_START_VIEW' = '@@walletsCreate/GO_TO_START_VIEW'

export const OPEN_VIEW: '@@walletsImport/OPEN_VIEW' = '@@walletsImport/OPEN_VIEW'
export const CLOSE_VIEW: '@@walletsImport/CLOSE_VIEW' = '@@walletsImport/CLOSE_VIEW'

export const CHANGE_NAME_INPUT: '@@walletsImport/CHANGE_NAME_INPUT' = '@@walletsImport/CHANGE_NAME_INPUT'
export const CHANGE_DATA_INPUT: '@@walletsImport/CHANGE_DATA_INPUT' = '@@walletsImport/CHANGE_DATA_INPUT'
export const CHANGE_PASSPHRASE_INPUT: '@@walletsImport/CHANGE_PASSPHRASE_INPUT' = '@@walletsImport/CHANGE_PASSPHRASE_INPUT'
export const CHANGE_DERIVATION_PATH_INPUT: '@@walletsImport/CHANGE_DERIVATION_PATH_INPUT' = '@@walletsImport/CHANGE_DERIVATION_PATH_INPUT'

export const CHANGE_PASSWORD_INPUT: '@@walletsImport/CHANGE_PASSWORD_INPUT' = '@@walletsImport/CHANGE_PASSWORD_INPUT'
export const CHANGE_PASSWORD_HINT_INPUT: '@@walletsImport/CHANGE_PASSWORD_HINT_INPUT' = '@@walletsImport/CHANGE_PASSWORD_HINT_INPUT'
export const CHANGE_PASSWORD_CONFIRM_INPUT: '@@walletsImport/CHANGE_PASSWORD_CONFIRM_INPUT' = '@@walletsImport/CHANGE_PASSWORD_CONFIRM_INPUT'

export const GO_TO_NEXT_STEP: '@@walletsImport/GO_TO_NEXT_STEP' = '@@walletsImport/GO_TO_NEXT_STEP'
export const GO_TO_PREV_STEP: '@@walletsImport/GO_TO_PREV_STEP' = '@@walletsImport/GO_TO_PREV_STEP'
export const SET_CURRENT_STEP: '@@walletsImport/SET_CURRENT_STEP' = '@@walletsImport/SET_CURRENT_STEP'

export const CHECK_NAME_ERROR: '@@walletsImport/CHECK_NAME_ERROR' = '@@walletsImport/CHECK_NAME_ERROR'
export const CHECK_NAME_SUCCESS: '@@walletsImport/CHECK_NAME_SUCCESS' = '@@walletsImport/CHECK_NAME_SUCCESS'
export const CHECK_NAME_REQUEST: '@@walletsImport/CHECK_NAME_REQUEST' = '@@walletsImport/CHECK_NAME_REQUEST'

export const CHECK_DATA_ERROR: '@@walletsImport/CHECK_DATA_ERROR' = '@@walletsImport/CHECK_DATA_ERROR'
export const CHECK_DATA_SUCCESS: '@@walletsImport/CHECK_DATA_SUCCESS' = '@@walletsImport/CHECK_DATA_SUCCESS'
export const CHECK_DATA_REQUEST: '@@walletsImport/CHECK_DATA_REQUEST' = '@@walletsImport/CHECK_DATA_REQUEST'

export const IMPORT_ERROR: '@@walletsImport/IMPORT_ERROR' = '@@walletsImport/IMPORT_ERROR'
export const IMPORT_SUCCESS: '@@walletsImport/IMPORT_SUCCESS' = '@@walletsImport/IMPORT_SUCCESS'
export const IMPORT_REQUEST: '@@walletsImport/IMPORT_REQUEST' = '@@walletsImport/IMPORT_REQUEST'

export const SET_INVALID_FIELD: '@@walletsImport/SET_INVALID_FIELD' = '@@walletsImport/SET_INVALID_FIELD'

export const CLEAN: '@@walletsImport/CLEAN' = '@@walletsImport/CLEAN'
/* eslint-enable max-len */

export const STEPS = {
  NAME: 0,
  DATA: 1,
  PASSWORD: 2,
}

export function goToStartView() {
  return {
    type: GO_TO_START_VIEW,
  }
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

export function changeNameInput(name: string) {
  return {
    type: CHANGE_NAME_INPUT,
    payload: {
      name,
    },
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

export function changePasswordInput(password: string) {
  return {
    type: CHANGE_PASSWORD_INPUT,
    payload: {
      password,
    },
  }
}

export function changePasswordHintInput(passwordHint: string) {
  return {
    type: CHANGE_PASSWORD_HINT_INPUT,
    payload: {
      passwordHint,
    },
  }
}

export function changePasswordConfirmInput(passwordConfirm: string) {
  return {
    type: CHANGE_PASSWORD_CONFIRM_INPUT,
    payload: {
      passwordConfirm,
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

export function setCurrentStep(currentStep: WalletsCreateStepIndex) {
  return {
    type: SET_CURRENT_STEP,
    payload: {
      currentStep,
    },
  }
}

export function checkNameError(message: string) {
  return {
    type: CHECK_NAME_ERROR,
    payload: {
      message,
    },
    error: true,
  }
}

export function checkNameSuccess() {
  return {
    type: CHECK_NAME_SUCCESS,
  }
}

export function checkNameRequest(wallets: Wallets, name: string) {
  return {
    type: CHECK_NAME_REQUEST,
    payload: {
      wallets,
      name,
    },
  }
}

export function checkDataError(message: string) {
  return {
    type: CHECK_DATA_ERROR,
    payload: {
      message,
    },
    error: true,
  }
}

export function checkDataSuccess() {
  return {
    type: CHECK_DATA_SUCCESS,
  }
}

export function checkDataRequest(data: string, derivationPath: string, passphrase: string) {
  return {
    type: CHECK_DATA_REQUEST,
    payload: {
      data,
      passphrase,
      derivationPath,
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

export function importRequest(payload: WalletsCreateCreateRequestPayload) {
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
  ExtractReturn<typeof goToStartView> |
  ExtractReturn<typeof openView> |
  ExtractReturn<typeof closeView> |
  ExtractReturn<typeof changeNameInput> |
  ExtractReturn<typeof changePassphraseInput> |
  ExtractReturn<typeof changeDerivationPathInput> |
  ExtractReturn<typeof changePasswordInput> |
  ExtractReturn<typeof changePasswordHintInput> |
  ExtractReturn<typeof changePasswordConfirmInput> |
  ExtractReturn<typeof goToNextStep> |
  ExtractReturn<typeof goToPrevStep> |
  ExtractReturn<typeof setCurrentStep> |
  ExtractReturn<typeof checkNameError> |
  ExtractReturn<typeof checkNameSuccess> |
  ExtractReturn<typeof checkNameRequest> |
  ExtractReturn<typeof checkDataError> |
  ExtractReturn<typeof checkDataSuccess> |
  ExtractReturn<typeof checkDataRequest> |
  ExtractReturn<typeof importError> |
  ExtractReturn<typeof importSuccess> |
  ExtractReturn<typeof importRequest> |
  ExtractReturn<typeof setInvalidField> |
  ExtractReturn<typeof clean>

const initialState: WalletsImportState = {
  invalidFields: {},
  data: '',
  name: '',
  password: '',
  passphrase: '',
  passwordHint: '',
  derivationPath: '',
  passwordConfirm: '',
  currentStep: STEPS.NAME,
  isLoading: false,
}

const walletsImport = (
  state: ImportWalletData = initialState,
  action: WalletsImportAction,
): WalletsImportAction => {
  switch (action.type) {
    case CHANGE_NAME_INPUT:
      return {
        ...state,
        name: action.payload.name,
        invalidFields: {
          ...state.invalidFields,
          name: null,
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

    case CHANGE_PASSWORD_INPUT:
      return {
        ...state,
        password: action.payload.password,
        invalidFields: {
          ...state.invalidFields,
          password: null,
        },
      }

    case CHANGE_PASSWORD_HINT_INPUT:
      return {
        ...state,
        passwordHint: action.payload.passwordHint,
        invalidFields: {
          ...state.invalidFields,
          passwordHint: null,
        },
      }

    case CHANGE_PASSWORD_CONFIRM_INPUT:
      return {
        ...state,
        passwordConfirm: action.payload.passwordConfirm,
        invalidFields: {
          ...state.invalidFields,
          passwordConfirm: null,
        },
      }

    case GO_TO_NEXT_STEP:
      return {
        ...state,
        isLoading: true,
      }

    case SET_CURRENT_STEP:
      return {
        ...state,
        currentStep: action.payload.currentStep,
      }

    case IMPORT_ERROR:
    case IMPORT_SUCCESS:
    case CHECK_DATA_ERROR:
    case CHECK_DATA_SUCCESS:
    case CHECK_NAME_ERROR:
    case CHECK_NAME_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }

    case SET_INVALID_FIELD:
      return {
        ...state,
        invalidFields: {
          ...state.invalidFields,
          [action.payload.fieldName]: action.payload.message,
        },
        isLoading: false,
      }

    case CLEAN:
      return initialState

    default:
      return state
  }
}

export default walletsImport
