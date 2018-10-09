// @flow

import type {
  WalletsCreateRequestPayload,
  WalletsSetWalletsActionPayload,
} from 'routes/Wallets/modules/wallets'

/* eslint-disable max-len */
export const GO_TO_START_VIEW: '@@walletsCreate/GO_TO_START_VIEW' = '@@walletsCreate/GO_TO_START_VIEW'

export const OPEN_VIEW: '@@walletsCreate/OPEN_VIEW' = '@@walletsCreate/OPEN_VIEW'
export const CLOSE_VIEW: '@@walletsCreate/CLOSE_VIEW' = '@@walletsCreate/CLOSE_VIEW'

export const CHANGE_NAME_INPUT: '@@walletsCreate/CHANGE_NAME_INPUT' = '@@walletsCreate/CHANGE_NAME_INPUT'
export const CHANGE_PASSWORD_INPUT: '@@walletsCreate/CHANGE_PASSWORD_INPUT' = '@@walletsCreate/CHANGE_PASSWORD_INPUT'
export const CHANGE_PASSWORD_HINT_INPUT: '@@walletsCreate/CHANGE_PASSWORD_HINT_INPUT' = '@@walletsCreate/CHANGE_PASSWORD_HINT_INPUT'
export const CHANGE_PASSWORD_CONFIRM_INPUT: '@@walletsCreate/CHANGE_PASSWORD_CONFIRM_INPUT' = '@@walletsCreate/CHANGE_PASSWORD_CONFIRM_INPUT'

export const GO_TO_NEXT_STEP: '@@walletsCreate/GO_TO_NEXT_STEP' = '@@walletsCreate/GO_TO_NEXT_STEP'
export const GO_TO_PREV_STEP: '@@walletsCreate/GO_TO_PREV_STEP' = '@@walletsCreate/GO_TO_PREV_STEP'
export const SET_CURRENT_STEP: '@@walletsCreate/SET_CURRENT_STEP' = '@@walletsCreate/SET_CURRENT_STEP'

export const CHECK_NAME_ERROR: '@@walletsCreate/CHECK_NAME_ERROR' = '@@walletsCreate/CHECK_NAME_ERROR'
export const CHECK_NAME_SUCCESS: '@@walletsCreate/CHECK_NAME_SUCCESS' = '@@walletsCreate/CHECK_NAME_SUCCESS'
export const CHECK_NAME_REQUEST: '@@walletsCreate/CHECK_NAME_REQUEST' = '@@walletsCreate/CHECK_NAME_REQUEST'

export const CREATE_ERROR: '@@walletsCreate/CREATE_ERROR' = '@@walletsCreate/CREATE_ERROR'
export const CREATE_SUCCESS: '@@walletsCreate/CREATE_SUCCESS' = '@@walletsCreate/CREATE_SUCCESS'
export const CREATE_REQUEST: '@@walletsCreate/CREATE_REQUEST' = '@@walletsCreate/CREATE_REQUEST'

export const SET_INVALID_FIELD: '@@walletsCreate/SET_INVALID_FIELD' = '@@walletsCreate/SET_INVALID_FIELD'

export const CLEAN: '@@walletsCreate/CLEAN' = '@@walletsCreate/CLEAN'
/* eslint-enable max-len */

export const STEPS: WalletsCreateSteps = {
  NAME: 0,
  PASSWORD: 1,
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

export function createError(message: string) {
  return {
    type: CREATE_ERROR,
    payload: {
      message,
    },
    error: true,
  }
}

export function createSuccess(payload: WalletsSetWalletsActionPayload) {
  return {
    type: CREATE_SUCCESS,
    payload,
  }
}

export function createRequest(payload: WalletsCreateRequestPayload) {
  return {
    type: CREATE_REQUEST,
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

export type WalletsCreateAction =
  ExtractReturn<typeof goToStartView> |
  ExtractReturn<typeof openView> |
  ExtractReturn<typeof closeView> |
  ExtractReturn<typeof changeNameInput> |
  ExtractReturn<typeof changePasswordInput> |
  ExtractReturn<typeof changePasswordHintInput> |
  ExtractReturn<typeof changePasswordConfirmInput> |
  ExtractReturn<typeof goToNextStep> |
  ExtractReturn<typeof goToPrevStep> |
  ExtractReturn<typeof setCurrentStep> |
  ExtractReturn<typeof checkNameError> |
  ExtractReturn<typeof checkNameSuccess> |
  ExtractReturn<typeof checkNameRequest> |
  ExtractReturn<typeof createError> |
  ExtractReturn<typeof createSuccess> |
  ExtractReturn<typeof createRequest> |
  ExtractReturn<typeof setInvalidField> |
  ExtractReturn<typeof clean>

const initialState: WalletsCreateState = {
  invalidFields: {},
  name: '',
  password: '',
  passwordHint: '',
  passwordConfirm: '',
  currentStep: STEPS.NAME,
  isLoading: false,
}

function walletsCreate(
  state: WalletsCreateState = initialState,
  action: WalletsCreateAction,
): WalletsCreateState {
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

    case CREATE_ERROR:
    case CREATE_SUCCESS:
    case CHECK_NAME_ERROR:
    case CHECK_NAME_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }

    case SET_INVALID_FIELD: {
      const { message, fieldName } = action.payload

      return {
        ...state,
        invalidFields: {
          ...state.invalidFields,
          [fieldName]: message,
        },
        isLoading: false,
      }
    }

    case CLEAN:
      return initialState

    default:
      return state
  }
}

export default walletsCreate
