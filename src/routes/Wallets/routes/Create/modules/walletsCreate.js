// @flow

import type { WalletsSetWalletsActionPayload } from 'routes/Wallets/modules/wallets'

type WalletsCreateGoToStartViewConstant = '@@walletsCreate/GO_TO_START_VIEW'

type WalletsCreateOpenViewConstant = '@@walletsCreate/OPEN_VIEW'
type WalletsCreateCloseViewConstant = '@@walletsCreate/CLOSE_VIEW'

type WalletsCreateChangeNameInputConstant = '@@walletsCreate/CHANGE_NAME_INPUT'
type WalletsCreateChangePasswordConstant = '@@walletsCreate/CHANGE_PASSWORD_INPUT'
type WalletsCreateChangePasswordHintConstant = '@@walletsCreate/CHANGE_PASSWORD_HINT_INPUT'
type WalletsCreateChangePasswordConfirmConstant = '@@walletsCreate/CHANGE_PASSWORD_CONFIRM_INPUT'

type WalletsCreateGoToNextStepConstant = '@@walletsCreate/GO_TO_NEXT_STEP'
type WalletsCreateGoToPrevStepConstant = '@@walletsCreate/GO_TO_PREV_STEP'
type WalletsCreateSetCurrentStepConstant = '@@walletsCreate/SET_CURRENT_STEP'

type WalletsCreateCheckNameErrorConstant = '@@walletsCreate/CHECK_NAME_ERROR'
type WalletsCreateCheckNameSuccessConstant = '@@walletsCreate/CHECK_NAME_SUCCESS'
type WalletsCreateCheckNameRequestConstant = '@@walletsCreate/CHECK_NAME_REQUEST'

type WalletsCreateCreateErrorConstant = '@@walletsCreate/CREATE_ERROR'
type WalletsCreateCreateSuccessConstant = '@@walletsCreate/CREATE_SUCCESS'
type WalletsCreateCreateRequestConstant = '@@walletsCreate/CREATE_REQUEST'

type WalletsCreateSetInvalidFieldConstant = '@@walletsCreate/SET_INVALID_FIELD'

type WalletsCreateCleanConstant = '@@walletsCreate/CLEAN'

type WalletsCreateGoToStartViewAction = {|
  +type: WalletsCreateGoToStartViewConstant
|}

type WalletsCreateOpenViewAction = {|
  +type: WalletsCreateOpenViewConstant
|}

type WalletsCreateCloseViewAction = {|
  +type: WalletsCreateCloseViewConstant,
|}

type WalletsCreateChangeNameInputAction = {|
  +type: WalletsCreateChangeNameInputConstant,
  +payload: {|
    +name: string,
  |},
|}

type WalletsCreateChangePasswordAction = {|
  +type: WalletsCreateChangePasswordConstant,
  +payload: {|
    +password: string,
  |},
|}

type WalletsCreateChangePasswordHintAction = {|
  +type: WalletsCreateChangePasswordHintConstant,
  +payload: {|
    +passwordHint: string,
  |},
|}

type WalletsCreateChangePasswordConfirmAction = {|
  +type: WalletsCreateChangePasswordConfirmConstant,
  +payload: {|
    +passwordConfirm: string,
  |},
|}

type WalletsCreateGoToNextStepAction = {|
  +type: WalletsCreateGoToNextStepConstant,
|}

type WalletsCreateGoToPrevStepAction = {|
  +type: WalletsCreateGoToPrevStepConstant,
|}

type WalletsCreateSetCurrentStepAction = {|
  +type: WalletsCreateSetCurrentStepConstant,
  +payload: {|
    +currentStep: WalletsCreateStepIndex,
  |},
|}

type WalletsCreateCheckNameErrorAction = {|
  +type: WalletsCreateCheckNameErrorConstant,
  +payload: WorkerError,
  +error: boolean,
|}

type WalletsCreateCheckNameRequestAction = {|
  +type: WalletsCreateCheckNameRequestConstant,
  +payload: {|
    +wallets: Wallets,
    +name: string,
  |},
|}

type WalletsCreateCheckNameSuccessAction = {|
  +type: WalletsCreateCheckNameSuccessConstant,
|}

type WalletsCreateCreateErrorAction = {|
  +type: WalletsCreateCreateErrorConstant,
  +payload: WorkerError,
  +error: boolean,
|}

type WalletsCreateCreateRequestPayload = {|
  +wallets: Wallets,
  +testPasswordData: ?EncryptedData,
  +passwordOptions: ?PasswordOptionsUser | PasswordOptions,
  +mnemonicOptions: ?MnemonicOptionsUser | MnemonicOptions,
  +name: string,
  +password: string,
  +passwordHint: string,
|}

type WalletsCreateCreateRequestAction = {|
  +type: WalletsCreateCreateRequestConstant,
  +payload: WalletsCreateCreateRequestPayload,
|}

type WalletsCreateCreateSuccessAction = {|
  +type: WalletsCreateCreateSuccessConstant,
  +payload: WalletsSetWalletsActionPayload,
|}

type WalletsCreateSetInvalidFieldAction = {|
  +type: WalletsCreateSetInvalidFieldConstant,
  +payload: {|
    +fieldName: string,
    +message: string,
  |},
|}

type WalletsCreateCleanAction = {|
  +type: WalletsCreateCleanConstant,
|}

export type WalletsCreateAction =
  WalletsCreateGoToStartViewAction |
  WalletsCreateOpenViewAction |
  WalletsCreateCloseViewAction |
  WalletsCreateChangeNameInputAction |
  WalletsCreateChangePasswordAction |
  WalletsCreateChangePasswordHintAction |
  WalletsCreateChangePasswordConfirmAction |
  WalletsCreateGoToNextStepAction |
  WalletsCreateGoToPrevStepAction |
  WalletsCreateSetCurrentStepAction |
  WalletsCreateCheckNameErrorAction |
  WalletsCreateCheckNameSuccessAction |
  WalletsCreateCheckNameRequestAction |
  WalletsCreateCreateErrorAction |
  WalletsCreateCreateSuccessAction |
  WalletsCreateCreateRequestAction |
  WalletsCreateSetInvalidFieldAction |
  WalletsCreateCleanAction

/* eslint-disable max-len */
export const GO_TO_START_VIEW: WalletsCreateGoToStartViewConstant = '@@walletsCreate/GO_TO_START_VIEW'

export const OPEN_VIEW: WalletsCreateOpenViewConstant = '@@walletsCreate/OPEN_VIEW'
export const CLOSE_VIEW: WalletsCreateCloseViewConstant = '@@walletsCreate/CLOSE_VIEW'

export const CHANGE_NAME_INPUT: WalletsCreateChangeNameInputConstant = '@@walletsCreate/CHANGE_NAME_INPUT'
export const CHANGE_PASSWORD_INPUT: WalletsCreateChangePasswordConstant = '@@walletsCreate/CHANGE_PASSWORD_INPUT'
export const CHANGE_PASSWORD_HINT_INPUT: WalletsCreateChangePasswordHintConstant = '@@walletsCreate/CHANGE_PASSWORD_HINT_INPUT'
export const CHANGE_PASSWORD_CONFIRM_INPUT: WalletsCreateChangePasswordConfirmConstant = '@@walletsCreate/CHANGE_PASSWORD_CONFIRM_INPUT'

export const GO_TO_NEXT_STEP: WalletsCreateGoToNextStepConstant = '@@walletsCreate/GO_TO_NEXT_STEP'
export const GO_TO_PREV_STEP: WalletsCreateGoToPrevStepConstant = '@@walletsCreate/GO_TO_PREV_STEP'
export const SET_CURRENT_STEP: WalletsCreateSetCurrentStepConstant = '@@walletsCreate/SET_CURRENT_STEP'

export const CHECK_NAME_ERROR: WalletsCreateCheckNameErrorConstant = '@@walletsCreate/CHECK_NAME_ERROR'
export const CHECK_NAME_SUCCESS: WalletsCreateCheckNameSuccessConstant = '@@walletsCreate/CHECK_NAME_SUCCESS'
export const CHECK_NAME_REQUEST: WalletsCreateCheckNameRequestConstant = '@@walletsCreate/CHECK_NAME_REQUEST'

export const CREATE_ERROR: WalletsCreateCreateErrorConstant = '@@walletsCreate/CREATE_ERROR'
export const CREATE_SUCCESS: WalletsCreateCreateSuccessConstant = '@@walletsCreate/CREATE_SUCCESS'
export const CREATE_REQUEST: WalletsCreateCreateRequestConstant = '@@walletsCreate/CREATE_REQUEST'

export const SET_INVALID_FIELD: WalletsCreateSetInvalidFieldConstant = '@@walletsCreate/SET_INVALID_FIELD'

export const CLEAN: WalletsCreateCleanConstant = '@@walletsCreate/CLEAN'
/* eslint-enable max-len */

export const STEPS: WalletsCreateSteps = {
  NAME: 0,
  PASSWORD: 1,
}

export const goToStartView = (): WalletsCreateGoToStartViewAction => ({
  type: GO_TO_START_VIEW,
})

export const openView = (): WalletsCreateOpenViewAction => ({
  type: OPEN_VIEW,
})

export const closeView = (): WalletsCreateCloseViewAction => ({
  type: CLOSE_VIEW,
})

export const changeNameInput = (name: string): WalletsCreateChangeNameInputAction => ({
  type: CHANGE_NAME_INPUT,
  payload: {
    name,
  },
})

export const changePasswordInput = (password: string): WalletsCreateChangePasswordAction => ({
  type: CHANGE_PASSWORD_INPUT,
  payload: {
    password,
  },
})

export const changePasswordHintInput = (
  passwordHint: string,
): WalletsCreateChangePasswordHintAction => ({
  type: CHANGE_PASSWORD_HINT_INPUT,
  payload: {
    passwordHint,
  },
})

export const changePasswordConfirmInput = (
  passwordConfirm: string,
): WalletsCreateChangePasswordConfirmAction => ({
  type: CHANGE_PASSWORD_CONFIRM_INPUT,
  payload: {
    passwordConfirm,
  },
})

export const goToNextStep = (): WalletsCreateGoToNextStepAction => ({
  type: GO_TO_NEXT_STEP,
})

export const goToPrevStep = (): WalletsCreateGoToPrevStepAction => ({
  type: GO_TO_PREV_STEP,
})

export const setCurrentStep = (
  currentStep: WalletsCreateStepIndex,
): WalletsCreateSetCurrentStepAction => ({
  type: SET_CURRENT_STEP,
  payload: {
    currentStep,
  },
})

export const checkNameError = (message: string): WalletsCreateCheckNameErrorAction => ({
  type: CHECK_NAME_ERROR,
  payload: {
    message,
  },
  error: true,
})

export const checkNameSuccess = (): WalletsCreateCheckNameSuccessAction => ({
  type: CHECK_NAME_SUCCESS,
})

export const checkNameRequest = (
  wallets: Wallets,
  name: string,
): WalletsCreateCheckNameRequestAction => ({
  type: CHECK_NAME_REQUEST,
  payload: {
    wallets,
    name,
  },
})

export const createError = (message: string): WalletsCreateCreateErrorAction => ({
  type: CREATE_ERROR,
  payload: {
    message,
  },
  error: true,
})

export const createSuccess = (
  payload: WalletsSetWalletsActionPayload,
): WalletsCreateCreateSuccessAction => ({
  type: CREATE_SUCCESS,
  payload,
})

export const createRequest = (
  payload: WalletsCreateCreateRequestPayload,
): WalletsCreateCreateRequestAction => ({
  type: CREATE_REQUEST,
  payload,
})

export const setInvalidField = (
  fieldName: string,
  message: string,
): WalletsCreateSetInvalidFieldAction => ({
  type: SET_INVALID_FIELD,
  payload: {
    fieldName,
    message,
  },
})

export const clean = (): WalletsCreateCleanAction => ({
  type: CLEAN,
})

const initialState: WalletsCreateState = {
  invalidFields: {},
  name: '',
  password: '',
  passwordHint: '',
  passwordConfirm: '',
  currentStep: STEPS.NAME,
  isLoading: false,
}

const walletsCreate = (
  state: WalletsCreateState = initialState,
  action: WalletsCreateAction,
): WalletsCreateState => {
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

export default walletsCreate
