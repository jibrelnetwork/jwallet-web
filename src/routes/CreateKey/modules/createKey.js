// @flow

export const SET_MNEMONIC = '@@createKey/SET_MNEMONIC'
export const SET_MNEMONIC_CONFIRM = '@@createKey/SET_MNEMONIC_CONFIRM'
export const SET_PASSWORD = '@@createKey/SET_PASSWORD'
export const SET_PASSWORD_CONFIRM = '@@createKey/SET_PASSWORD_CONFIRM'
export const SET_NEXT_STEP = '@@createKey/SET_NEXT_STEP'
export const SET_PREV_STEP = '@@createKey/SET_PREV_STEP'
export const SET_STEP_DATA = '@@createKey/SET_STEP_DATA'
export const SET_VALID_FIELD = '@@createKey/SET_VALID_FIELD'
export const SET_INVALID_FIELD = '@@createKey/SET_INVALID_FIELD'
export const CLEAN = '@@createKey/CLEAN'

export const STEPS = {
  INIT: 0,
  MNEMONIC: 1,
  MNEMONIC_CONFIRM: 2,
  PASSWORD: 3,
  ASSETS: 4,
}

export function setMnemonicConfirm(mnemonicConfirm: string) {
  return {
    type: SET_MNEMONIC_CONFIRM,
    mnemonicConfirm,
  }
}

export function setPassword(password: Password) {
  return {
    type: SET_PASSWORD,
    password,
  }
}

export function setPasswordConfirm(passwordConfirm: Password) {
  return {
    type: SET_PASSWORD_CONFIRM,
    passwordConfirm,
  }
}

export function setNextStep() {
  return {
    type: SET_NEXT_STEP,
  }
}

export function setPrevStep() {
  return {
    type: SET_PREV_STEP,
  }
}

export function setValidField(fieldName: string, message: string) {
  return {
    type: SET_VALID_FIELD,
    fieldName,
    message,
  }
}

export function setInvalidField(fieldName: string, message: string) {
  return {
    type: SET_INVALID_FIELD,
    fieldName,
    message,
  }
}

const ACTION_HANDLERS = {
  [SET_MNEMONIC]: (state, action) => ({
    ...state,
    mnemonic: action.mnemonic,
  }),
  [SET_MNEMONIC_CONFIRM]: (state, action) => ({
    ...state,
    mnemonicConfirm: action.mnemonicConfirm,
    validFields: {
      ...state.validFields,
      mnemonicConfirm: '',
    },
    invalidFields: {
      ...state.invalidFields,
      mnemonicConfirm: '',
    },
  }),
  [SET_PASSWORD]: (state, action) => ({
    ...state,
    password: action.password,
    validFields: {
      ...state.validFields,
      password: '',
    },
    invalidFields: {
      ...state.invalidFields,
      password: '',
      passwordConfirm: '',
    },
  }),
  [SET_PASSWORD_CONFIRM]: (state, action) => ({
    ...state,
    passwordConfirm: action.passwordConfirm,
    validFields: {
      ...state.validFields,
      passwordConfirm: '',
    },
    invalidFields: {
      ...state.invalidFields,
      passwordConfirm: '',
    },
  }),
  [SET_STEP_DATA]: (state, action) => ({
    ...state,
    alert: action.alert,
    currentStep: action.nextStep,
  }),
  [SET_VALID_FIELD]: (state, action) => ({
    ...state,
    validFields: {
      ...state.validFields,
      [action.fieldName]: action.message,
    },
  }),
  [SET_INVALID_FIELD]: (state, action) => ({
    ...state,
    invalidFields: {
      ...state.invalidFields,
      [action.fieldName]: action.message,
    },
  }),
  [CLEAN]: () => initialState,
}

const initialState = {
  validFields: {},
  invalidFields: {},
  alert: '',
  mnemonic: '',
  mnemonicConfirm: '',
  password: '',
  passwordConfirm: '',
  currentStep: STEPS.INIT,
  totalSteps: 4,
}

export default function createKey(state: any = initialState, action: any) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
