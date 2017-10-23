import pushField from 'utils/pushField'

export const IMPORT_KEYSTORE_ACCOUNT_OPEN_MODAL = 'IMPORT_KEYSTORE_ACCOUNT_OPEN_MODAL'
export const IMPORT_KEYSTORE_ACCOUNT_CLOSE_MODAL = 'IMPORT_KEYSTORE_ACCOUNT_CLOSE_MODAL'
export const IMPORT_KEYSTORE_ACCOUNT_SET_DATA = 'IMPORT_KEYSTORE_ACCOUNT_SET_DATA'
export const IMPORT_KEYSTORE_ACCOUNT_SET_PASSWORD = 'IMPORT_KEYSTORE_ACCOUNT_SET_PASSWORD'
export const IMPORT_KEYSTORE_ACCOUNT_SET_PASSWORD_CONFIRM = 'IMPORT_KEYSTORE_ACCOUNT_SET_PASSWORD_CONFIRM' // eslint-disable-line max-len
export const IMPORT_KEYSTORE_ACCOUNT_SET_KNOWN_DERIVATION_PATH = 'IMPORT_KEYSTORE_ACCOUNT_SET_KNOWN_DERIVATION_PATH' // eslint-disable-line max-len
export const IMPORT_KEYSTORE_ACCOUNT_SET_CUSTOM_DERIVATION_PATH = 'IMPORT_KEYSTORE_ACCOUNT_SET_CUSTOM_DERIVATION_PATH' // eslint-disable-line max-len
export const IMPORT_KEYSTORE_ACCOUNT_SET_CURRENT_STEP = 'IMPORT_KEYSTORE_ACCOUNT_SET_CURRENT_STEP'
export const IMPORT_KEYSTORE_ACCOUNT_SET_ALERT = 'IMPORT_KEYSTORE_ACCOUNT_SET_ALERT'
export const IMPORT_KEYSTORE_ACCOUNT_SET_INVALID_FIELD = 'IMPORT_KEYSTORE_ACCOUNT_SET_INVALID_FIELD'
export const IMPORT_KEYSTORE_ACCOUNT_CLEAR_DATA = 'IMPORT_KEYSTORE_ACCOUNT_CLEAR_DATA'

export function openImportKeystoreAccountModal(onClose = null) {
  return {
    type: IMPORT_KEYSTORE_ACCOUNT_OPEN_MODAL,
    onClose,
  }
}

export function closeImportKeystoreAccountModal() {
  return {
    type: IMPORT_KEYSTORE_ACCOUNT_CLOSE_MODAL,
  }
}

export function setImportKeystoreAccountData(data = '') {
  return {
    type: IMPORT_KEYSTORE_ACCOUNT_SET_DATA,
    data,
  }
}

export function setImportKeystoreAccountPassword(password = '') {
  return {
    type: IMPORT_KEYSTORE_ACCOUNT_SET_PASSWORD,
    password,
  }
}

export function setImportKeystoreAccountPasswordConfirm(passwordConfirm = '') {
  return {
    type: IMPORT_KEYSTORE_ACCOUNT_SET_PASSWORD_CONFIRM,
    passwordConfirm,
  }
}

export function setImportKeystoreAccountKnownDerivationPath(knownDerivationPath = '') {
  return {
    type: IMPORT_KEYSTORE_ACCOUNT_SET_KNOWN_DERIVATION_PATH,
    knownDerivationPath,
  }
}

export function setImportKeystoreAccountCustomDerivationPath(customDerivationPath = '') {
  return {
    type: IMPORT_KEYSTORE_ACCOUNT_SET_CUSTOM_DERIVATION_PATH,
    customDerivationPath,
  }
}

export function setImportKeystoreAccountCurrentStep(currentStep = 0) {
  return {
    type: IMPORT_KEYSTORE_ACCOUNT_SET_CURRENT_STEP,
    currentStep,
  }
}

export function setImportKeystoreAccountAlert(alert = '') {
  return {
    type: IMPORT_KEYSTORE_ACCOUNT_SET_ALERT,
    alert,
  }
}

export function setImportKeystoreAccountInvalidField(fieldName, message = '') {
  return {
    type: IMPORT_KEYSTORE_ACCOUNT_SET_INVALID_FIELD,
    fieldName,
    message,
  }
}

export function clearImportKeystoreAccountData() {
  return {
    type: IMPORT_KEYSTORE_ACCOUNT_CLEAR_DATA,
  }
}

const ACTION_HANDLERS = {
  [IMPORT_KEYSTORE_ACCOUNT_OPEN_MODAL]: (state, action) => ({
    ...state,
    isOpen: true,
    onClose: action.onClose,
  }),
  [IMPORT_KEYSTORE_ACCOUNT_CLOSE_MODAL]: state => ({
    ...state,
    isOpen: false,
  }),
  [IMPORT_KEYSTORE_ACCOUNT_SET_DATA]: (state, action) => ({
    ...state,
    data: action.data,
    invalidFields: pushField(state.invalidFields, 'data'),
  }),
  [IMPORT_KEYSTORE_ACCOUNT_SET_PASSWORD]: (state, action) => ({
    ...state,
    password: action.password,
    invalidFields: pushField(state.invalidFields, 'password'),
  }),
  [IMPORT_KEYSTORE_ACCOUNT_SET_KNOWN_DERIVATION_PATH]: (state, action) => ({
    ...state,
    knownDerivationPath: action.knownDerivationPath,
    invalidFields: pushField(state.invalidFields, 'knownDerivationPath'),
  }),
  [IMPORT_KEYSTORE_ACCOUNT_SET_CUSTOM_DERIVATION_PATH]: (state, action) => ({
    ...state,
    customDerivationPath: action.customDerivationPath,
    invalidFields: pushField(state.invalidFields, 'customDerivationPath'),
  }),
  [IMPORT_KEYSTORE_ACCOUNT_SET_PASSWORD_CONFIRM]: (state, action) => ({
    ...state,
    passwordConfirm: action.passwordConfirm,
  }),
  [IMPORT_KEYSTORE_ACCOUNT_SET_CURRENT_STEP]: (state, action) => ({
    ...state,
    currentStep: action.currentStep,
  }),
  [IMPORT_KEYSTORE_ACCOUNT_SET_ALERT]: (state, action) => ({
    ...state,
    alert: action.alert,
  }),
  [IMPORT_KEYSTORE_ACCOUNT_SET_INVALID_FIELD]: (state, action) => ({
    ...state,
    invalidFields: pushField(state.invalidFields, action.fieldName, action.message),
  }),
  [IMPORT_KEYSTORE_ACCOUNT_CLEAR_DATA]: () => initialState,
}

const initialState = {
  invalidFields: [],
  alert: '',
  data: '',
  password: '',
  passwordConfirm: '',
  knownDerivationPath: "m/44'/60'/0'/0'",
  customDerivationPath: '',
  totalSteps: 4,
  currentStep: 1,
  isOpen: false,
  onClose: null,
}

export default function importKeystoreAccountModal(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
