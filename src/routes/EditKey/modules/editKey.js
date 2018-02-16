// @flow

import config from 'config'

export const OPEN = '@@editKey/OPEN'
export const CLOSE = '@@editKey/CLOSE'
export const SET_KEY_ID = '@@editKey/SET_KEY_ID'
export const SET_IS_MNEMONIC = '@@editKey/SET_IS_MNEMONIC'
export const SET_NAME = '@@editKey/SET_NAME'
export const SET_KNOWN_DERIVATION_PATH = '@@editKey/SET_KNOWN_DERIVATION_PATH'
export const SET_CUSTOM_DERIVATION_PATH = '@@editKey/SET_CUSTOM_DERIVATION_PATH'
export const SET_PASSWORD = '@@editKey/SET_PASSWORD'
export const GO_TO_PASSWORD_STEP = '@@editKey/GO_TO_PASSWORD_STEP'
export const SET_CURRENT_STEP = '@@editKey/SET_CURRENT_STEP'
export const SET_VALID_FIELD = '@@editKey/SET_VALID_FIELD'
export const SET_INVALID_FIELD = '@@editKey/SET_INVALID_FIELD'
export const SAVE = '@@editKey/SAVE'
export const REMOVE = '@@editKey/REMOVE'
export const CLEAN = '@@editKey/CLEAN'

export const STEPS = {
  FORM: 0,
  PASSWORD: 1,
}

export function open(keyId: AccountId): { type: string, keyId: string } {
  return {
    type: OPEN,
    keyId,
  }
}

export function close(): { type: string } {
  return {
    type: CLOSE,
  }
}

export function setName(name: string): { type: string, name: string } {
  return {
    type: SET_NAME,
    name,
  }
}

export function setKnownDerivationPath(knownDerivationPath: string): {
  type: string,
  knownDerivationPath: string,
} {
  return {
    type: SET_KNOWN_DERIVATION_PATH,
    knownDerivationPath,
  }
}

export function setCustomDerivationPath(customDerivationPath: string): {
  type: string,
  customDerivationPath: string,
} {
  return {
    type: SET_CUSTOM_DERIVATION_PATH,
    customDerivationPath,
  }
}

export function setPassword(password: Password): { type: string, password: Password } {
  return {
    type: SET_PASSWORD,
    password,
  }
}

export function goToPasswordStep(): { type: string } {
  return {
    type: GO_TO_PASSWORD_STEP,
  }
}

export function save(): { type: string } {
  return {
    type: SAVE,
  }
}

export function remove(): { type: string } {
  return {
    type: REMOVE,
  }
}

const ACTION_HANDLERS = {
  [SET_KEY_ID]: (state, action) => ({
    ...state,
    keyId: action.keyId,
  }),
  [SET_IS_MNEMONIC]: (state, action) => ({
    ...state,
    isMnemonic: action.isMnemonic,
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
    },
  }),
  [SET_KNOWN_DERIVATION_PATH]: (state, action) => ({
    ...state,
    knownDerivationPath: action.knownDerivationPath,
    validFields: {
      ...state.validFields,
      knownDerivationPath: '',
    },
    invalidFields: {
      ...state.invalidFields,
      knownDerivationPath: '',
    },
  }),
  [SET_CUSTOM_DERIVATION_PATH]: (state, action) => ({
    ...state,
    customDerivationPath: action.customDerivationPath,
    validFields: {
      ...state.validFields,
      customDerivationPath: '',
    },
    invalidFields: {
      ...state.invalidFields,
      customDerivationPath: '',
    },
  }),
  [SET_CURRENT_STEP]: (state, action) => ({
    ...state,
    currentStep: action.currentStep,
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
  keyId: '',
  name: '',
  password: '',
  knownDerivationPath: config.defaultDerivationPath,
  customDerivationPath: '',
  currentStep: STEPS.FORM,
  isMnemonic: false,
}

export default function editKey(state: any = initialState, action: any) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
