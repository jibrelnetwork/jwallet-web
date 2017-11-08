export const NEW_KEYSTORE_ACCOUNT_OPEN_MODAL = 'NEW_KEYSTORE_ACCOUNT_OPEN_MODAL'
export const NEW_KEYSTORE_ACCOUNT_CLOSE_MODAL = 'NEW_KEYSTORE_ACCOUNT_CLOSE_MODAL'
export const NEW_KEYSTORE_ACCOUNT_SET_MNEMONIC = 'NEW_KEYSTORE_ACCOUNT_SET_MNEMONIC'
export const NEW_KEYSTORE_ACCOUNT_SET_MNEMONIC_CONFIRM = 'NEW_KEYSTORE_ACCOUNT_SET_MNEMONIC_CONFIRM'
export const NEW_KEYSTORE_ACCOUNT_SET_PASSWORD = 'NEW_KEYSTORE_ACCOUNT_SET_PASSWORD'
export const NEW_KEYSTORE_ACCOUNT_SET_PASSWORD_CONFIRM = 'NEW_KEYSTORE_ACCOUNT_SET_PASSWORD_CONFIRM'
export const NEW_KEYSTORE_ACCOUNT_SET_CURRENT_STEP = 'NEW_KEYSTORE_ACCOUNT_SET_CURRENT_STEP'
export const NEW_KEYSTORE_ACCOUNT_SET_STEP_DATA = 'NEW_KEYSTORE_ACCOUNT_SET_STEP_DATA'
export const NEW_KEYSTORE_ACCOUNT_SET_VALID_FIELD = 'NEW_KEYSTORE_ACCOUNT_SET_VALID_FIELD'
export const NEW_KEYSTORE_ACCOUNT_SET_INVALID_FIELD = 'NEW_KEYSTORE_ACCOUNT_SET_INVALID_FIELD'
export const NEW_KEYSTORE_ACCOUNT_CLEAR_DATA = 'NEW_KEYSTORE_ACCOUNT_CLEAR_DATA'

export const NEW_KEYSTORE_ACCOUNT_STEPS = {
  BEFORE: -1,
  FIRST: 0,
  BEFORE_MNEMONIC: 1,
  SAVE_MNEMONIC: 2,
  CHECK_MNEMONIC: 3,
  BEFORE_PASSWORD: 4,
  SET_PASSWORD: 5,
}

export function openNewKeystoreAccountModal(onClose = null) {
  return {
    type: NEW_KEYSTORE_ACCOUNT_OPEN_MODAL,
    onClose,
  }
}

export function closeNewKeystoreAccountModal() {
  return {
    type: NEW_KEYSTORE_ACCOUNT_CLOSE_MODAL,
  }
}

export function setNewKeystoreAccountMnemonicConfirm(mnemonicConfirm = '') {
  return {
    type: NEW_KEYSTORE_ACCOUNT_SET_MNEMONIC_CONFIRM,
    mnemonicConfirm,
  }
}

export function setNewKeystoreAccountPassword(password = '') {
  return {
    type: NEW_KEYSTORE_ACCOUNT_SET_PASSWORD,
    password,
  }
}

export function setNewKeystoreAccountPasswordConfirm(passwordConfirm = '') {
  return {
    type: NEW_KEYSTORE_ACCOUNT_SET_PASSWORD_CONFIRM,
    passwordConfirm,
  }
}

export function setNewKeystoreAccountCurrentStep(currentStep = -1, props = {}) {
  return {
    type: NEW_KEYSTORE_ACCOUNT_SET_CURRENT_STEP,
    currentStep,
    props,
  }
}

export function setNewKeystoreAccountValidField(fieldName, message = '') {
  return {
    type: NEW_KEYSTORE_ACCOUNT_SET_VALID_FIELD,
    fieldName,
    message,
  }
}

export function setNewKeystoreAccountInvalidField(fieldName, message = '') {
  return {
    type: NEW_KEYSTORE_ACCOUNT_SET_INVALID_FIELD,
    fieldName,
    message,
  }
}

const ACTION_HANDLERS = {
  [NEW_KEYSTORE_ACCOUNT_OPEN_MODAL]: (state, action) => ({
    ...state,
    isOpen: true,
    onClose: action.onClose,
  }),
  [NEW_KEYSTORE_ACCOUNT_CLOSE_MODAL]: state => ({
    ...state,
    isOpen: false,
  }),
  [NEW_KEYSTORE_ACCOUNT_SET_MNEMONIC]: (state, action) => ({
    ...state,
    mnemonic: action.mnemonic || '',
  }),
  [NEW_KEYSTORE_ACCOUNT_SET_MNEMONIC_CONFIRM]: (state, action) => ({
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
  [NEW_KEYSTORE_ACCOUNT_SET_PASSWORD]: (state, action) => ({
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
  [NEW_KEYSTORE_ACCOUNT_SET_PASSWORD_CONFIRM]: (state, action) => ({
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
  [NEW_KEYSTORE_ACCOUNT_SET_CURRENT_STEP]: (state, action) => ({
    ...state,
    currentStep: action.currentStep,
  }),
  [NEW_KEYSTORE_ACCOUNT_SET_STEP_DATA]: (state, action) => ({
    ...state,
    alert: action.alert || '',
    buttonTitle: action.buttonTitle || '',
    imageName: action.imageName || '',
    iconName: action.iconName || '',
    currentStep: action.nextStep || 0,
  }),
  [NEW_KEYSTORE_ACCOUNT_SET_VALID_FIELD]: (state, action) => ({
    ...state,
    validFields: {
      ...state.validFields,
      [action.fieldName]: action.message,
    },
  }),
  [NEW_KEYSTORE_ACCOUNT_SET_INVALID_FIELD]: (state, action) => ({
    ...state,
    invalidFields: {
      ...state.invalidFields,
      [action.fieldName]: action.message,
    },
  }),
  [NEW_KEYSTORE_ACCOUNT_CLEAR_DATA]: () => initialState,
}

const initialState = {
  validFields: {},
  invalidFields: {},
  alert: '',
  mnemonic: '',
  mnemonicConfirm: '',
  password: '',
  passwordConfirm: '',
  buttonTitle: '',
  imageName: '',
  iconName: '',
  currentStep: NEW_KEYSTORE_ACCOUNT_STEPS.BEFORE,
  totalSteps: 6,
  isOpen: false,
  onClose: null,
}

export default function newKeystoreAccountModal(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
