// @flow

export const OPEN = '@@importKey/OPEN'
export const CLOSE = '@@importKey/CLOSE'
export const SET_KEY_DATA = '@@importKey/SET_KEY_DATA'
export const SET_IS_MNEMONIC = '@@importKey/SET_IS_MNEMONIC'
export const SET_KNOWN_DERIVATION_PATH = '@@importKey/SET_KNOWN_DERIVATION_PATH'
export const SET_CUSTOM_DERIVATION_PATH = '@@importKey/SET_CUSTOM_DERIVATION_PATH'
export const SET_NAME = '@@importKey/SET_NAME'
export const SET_PASSWORD = '@@importKey/SET_PASSWORD'
export const SET_PASSWORD_CONFIRM = '@@importKey/SET_PASSWORD_CONFIRM'
export const SET_NEXT_STEP = '@@importKey/SET_NEXT_STEP'
export const SET_PREV_STEP = '@@importKey/SET_PREV_STEP'
export const SET_CURRENT_STEP = '@@importKey/SET_CURRENT_STEP'
export const SET_TOTAL_STEPS = '@@importKey/SET_TOTAL_STEPS'
export const SET_VALID_FIELD = '@@createKey/SET_VALID_FIELD'
export const SET_INVALID_FIELD = '@@importKey/SET_INVALID_FIELD'
export const CLEAN = '@@importKey/CLEAN'

export const STEPS = {
  DATA: 0,
  NAME: 1,
  PASSWORD: 2,
  ASSETS: 3,
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

export function setKeyData(data: string): { type: string, data: string } {
  return {
    type: SET_KEY_DATA,
    data,
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

export function setPrevStep(): { type: string } {
  return {
    type: SET_PREV_STEP,
  }
}

export function setNextStep(): { type: string } {
  return {
    type: SET_NEXT_STEP,
  }
}

const ACTION_HANDLERS = {
  [SET_KEY_DATA]: (state, action) => ({
    ...state,
    data: action.data,
    validFields: {
      ...state.validFields,
      data: '',
    },
    invalidFields: {
      ...state.invalidFields,
      data: '',
    },
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
  data: '',
  name: '',
  password: '',
  passwordConfirm: '',
  knownDerivationPath: 'm/44\'/60\'/0\'/0',
  customDerivationPath: '',
  currentStep: STEPS.DATA,
  totalSteps: 0,
  isMnemonic: false,
}

export default function importKey(state: any = initialState, action: any) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
