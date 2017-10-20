export const IMPORT_KEYSTORE_ACCOUNT_OPEN_MODAL = 'IMPORT_KEYSTORE_ACCOUNT_OPEN_MODAL'
export const IMPORT_KEYSTORE_ACCOUNT_CLOSE_MODAL = 'IMPORT_KEYSTORE_ACCOUNT_CLOSE_MODAL'
export const IMPORT_KEYSTORE_ACCOUNT_SET_DATA = 'IMPORT_KEYSTORE_ACCOUNT_SET_DATA'
export const IMPORT_KEYSTORE_ACCOUNT_SET_PASSWORD = 'IMPORT_KEYSTORE_ACCOUNT_SET_PASSWORD'
export const IMPORT_KEYSTORE_ACCOUNT_SET_PASSWORD_CONFIRM =
  'IMPORT_KEYSTORE_ACCOUNT_SET_PASSWORD_CONFIRM'
export const IMPORT_KEYSTORE_ACCOUNT_SET_CURRENT_STEP = 'IMPORT_KEYSTORE_ACCOUNT_SET_CURRENT_STEP'
export const IMPORT_KEYSTORE_ACCOUNT_SET_ALERT = 'IMPORT_KEYSTORE_ACCOUNT_SET_ALERT'

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
  }),
  [IMPORT_KEYSTORE_ACCOUNT_SET_PASSWORD]: (state, action) => ({
    ...state,
    password: action.password,
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
}

const initialState = {
  disabledFields: [],
  validFields: [],
  invalidFields: [],
  alert: '',
  data: '',
  password: '',
  passwordConfirm: '',
  totalSteps: 4,
  currentStep: 1,
  isOpen: false,
  onClose: null,
}

export default function importKeystoreAccount(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
