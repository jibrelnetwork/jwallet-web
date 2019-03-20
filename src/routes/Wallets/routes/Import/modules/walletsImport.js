// @flow

export const OPEN_VIEW = '@@walletsImport/OPEN_VIEW'
export const CLOSE_VIEW = '@@walletsImport/CLOSE_VIEW'

export const CHANGE_DATA_INPUT = '@@walletsImport/CHANGE_DATA_INPUT'
export const CHANGE_PASSPHRASE_INPUT = '@@walletsImport/CHANGE_PASSPHRASE_INPUT'
export const CHANGE_DERIVATION_PATH_INPUT = '@@walletsImport/CHANGE_DERIVATION_PATH_INPUT'

export const SET_WALLET_TYPE = '@@walletsImport/SET_WALLET_TYPE'

export const GO_TO_NEXT_STEP = '@@walletsImport/GO_TO_NEXT_STEP'
export const GO_TO_PREV_STEP = '@@walletsImport/GO_TO_PREV_STEP'
export const SET_CURRENT_STEP = '@@walletsImport/SET_CURRENT_STEP'

export const SET_INVALID_FIELD = '@@walletsImport/SET_INVALID_FIELD'

export const CLEAN: '@@walletsImport/CLEAN' = '@@walletsImport/CLEAN'

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

function walletsImport(
  state: WalletsImportState = initialState,
  action: WalletsImportAction,
): WalletsImportState {
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
        invalidFields: initialState.invalidFields,
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
