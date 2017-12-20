export const OPEN_MODAL = 'NEW_KEYSTORE_ACCOUNT_OPEN_MODAL'
export const CLOSE_MODAL = 'NEW_KEYSTORE_ACCOUNT_CLOSE_MODAL'
export const SET_MNEMONIC = 'NEW_KEYSTORE_ACCOUNT_SET_MNEMONIC'
export const SET_MNEMONIC_CONFIRM = 'NEW_KEYSTORE_ACCOUNT_SET_MNEMONIC_CONFIRM'
export const SET_PASSWORD = 'NEW_KEYSTORE_ACCOUNT_SET_PASSWORD'
export const SET_PASSWORD_CONFIRM = 'NEW_KEYSTORE_ACCOUNT_SET_PASSWORD_CONFIRM'
export const SET_CURRENT_STEP = 'NEW_KEYSTORE_ACCOUNT_SET_CURRENT_STEP'
export const SET_STEP_DATA = 'NEW_KEYSTORE_ACCOUNT_SET_STEP_DATA'
export const SET_VALID_FIELD = 'NEW_KEYSTORE_ACCOUNT_SET_VALID_FIELD'
export const SET_INVALID_FIELD = 'NEW_KEYSTORE_ACCOUNT_SET_INVALID_FIELD'
export const CLEAR_DATA = 'NEW_KEYSTORE_ACCOUNT_CLEAR_DATA'

export const STEPS = {
  BEFORE: -1,
  FIRST: 0,
  BEFORE_MNEMONIC: 1,
  SAVE_MNEMONIC: 2,
  CHECK_MNEMONIC: 3,
  BEFORE_PASSWORD: 4,
  SET_PASSWORD: 5,
}

export function openNewKeystoreAccountModal(isOpenedFromKeystoreModal = false) {
  return {
    type: OPEN_MODAL,
    isOpenedFromKeystoreModal,
  }
}

export function closeNewKeystoreAccountModal() {
  return {
    type: CLOSE_MODAL,
  }
}

export function setNewKeystoreAccountMnemonicConfirm(mnemonicConfirm) {
  return {
    type: SET_MNEMONIC_CONFIRM,
    mnemonicConfirm,
  }
}

export function setNewKeystoreAccountPassword(password) {
  return {
    type: SET_PASSWORD,
    password,
  }
}

export function setNewKeystoreAccountPasswordConfirm(passwordConfirm) {
  return {
    type: SET_PASSWORD_CONFIRM,
    passwordConfirm,
  }
}

export function setNewKeystoreAccountCurrentStep(currentStep) {
  return {
    type: SET_CURRENT_STEP,
    currentStep,
  }
}

export function setNewKeystoreAccountValidField(fieldName, message) {
  return {
    type: SET_VALID_FIELD,
    fieldName,
    message,
  }
}

export function setNewKeystoreAccountInvalidField(fieldName, message) {
  return {
    type: SET_INVALID_FIELD,
    fieldName,
    message,
  }
}

const ACTION_HANDLERS = {
  [OPEN_MODAL]: (state, action) => ({
    ...state,
    isOpen: true,
    isOpenedFromKeystoreModal: action.isOpenedFromKeystoreModal,
  }),
  [CLOSE_MODAL]: state => ({
    ...state,
    isOpen: false,
    validFields: initialState.validFields,
    invalidFields: initialState.invalidFields,
  }),
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
  [SET_CURRENT_STEP]: (state, action) => ({
    ...state,
    currentStep: action.currentStep,
  }),
  [SET_STEP_DATA]: (state, action) => ({
    ...state,
    alert: action.alert,
    buttonTitle: action.buttonTitle,
    imageName: action.imageName,
    iconName: action.iconName,
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
  [CLEAR_DATA]: () => initialState,
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
  currentStep: STEPS.BEFORE,
  totalSteps: 6,
  isOpen: false,
  isOpenedFromKeystoreModal: false,
}

export default function newKeystoreAccountModal(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
