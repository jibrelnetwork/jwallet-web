// @flow

export const OPEN = '@@createKey/OPEN'
export const CLOSE = '@@createKey/CLOSE'
export const SET_MNEMONIC = '@@createKey/SET_MNEMONIC'
export const SET_MNEMONIC_CONFIRM = '@@createKey/SET_MNEMONIC_CONFIRM'
export const SET_NAME = '@@createKey/SET_NAME'
export const SET_PASSWORD = '@@createKey/SET_PASSWORD'
export const SET_PASSWORD_CONFIRM = '@@createKey/SET_PASSWORD_CONFIRM'
export const SET_NEXT_STEP = '@@createKey/SET_NEXT_STEP'
export const SET_PREV_STEP = '@@createKey/SET_PREV_STEP'
export const SET_CURRENT_STEP = '@@createKey/SET_CURRENT_STEP'
export const SET_TOTAL_STEPS = '@@createKey/SET_TOTAL_STEPS'
export const SET_VALID_FIELD = '@@createKey/SET_VALID_FIELD'
export const SET_INVALID_FIELD = '@@createKey/SET_INVALID_FIELD'
export const CLEAN = '@@createKey/CLEAN'

export const STEPS = {
  MNEMONIC: 0,
  MNEMONIC_CONFIRM: 1,
  NAME: 2,
  PASSWORD: 3,
  ASSETS: 4,
}

export function open(): { type: string } {
  return {
    type: OPEN,
  }
}

export function close(): { type: string } {
  return {
    type: CLOSE,
  }
}

export function setMnemonicConfirm(mnemonicConfirm: string): {
  type: string,
  mnemonicConfirm: string,
} {
  return {
    type: SET_MNEMONIC_CONFIRM,
    mnemonicConfirm,
  }
}

export function setName(name: string): { type: string, name: string } {
  return {
    type: SET_NAME,
    name,
  }
}

export function setPassword(password: Password): { type: string, password: Password } {
  return {
    type: SET_PASSWORD,
    password,
  }
}

export function setPasswordConfirm(passwordConfirm: Password): {
  type: string,
  passwordConfirm: Password,
} {
  return {
    type: SET_PASSWORD_CONFIRM,
    passwordConfirm,
  }
}

export function setNextStep(): { type: string } {
  return {
    type: SET_NEXT_STEP,
  }
}

export function setPrevStep(): { type: string } {
  return {
    type: SET_PREV_STEP,
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
  [SET_NAME]: (state, action) => ({
    ...state,
    name: action.name,
    validFields: {
      ...state.validFields,
      name: '',
    },
    invalidFields: {
      ...state.invalidFields,
      name: '',
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
  [SET_CURRENT_STEP]: (state, action) => ({
    ...state,
    currentStep: action.currentStep,
  }),
  [SET_TOTAL_STEPS]: (state, action) => ({
    ...state,
    totalSteps: action.totalSteps,
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
  mnemonic: '',
  mnemonicConfirm: '',
  name: '',
  password: '',
  passwordConfirm: '',
  currentStep: STEPS.MNEMONIC,
  totalSteps: 0,
}

export default function createKey(state: any = initialState, action: any) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
