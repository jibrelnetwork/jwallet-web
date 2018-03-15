export const OPEN_MODAL = 'IMPORT_KEYSTORE_ACCOUNT_OPEN_MODAL'
export const CLOSE_MODAL = 'IMPORT_KEYSTORE_ACCOUNT_CLOSE_MODAL'
export const SET_DATA = 'IMPORT_KEYSTORE_ACCOUNT_SET_DATA'
export const SET_PASSWORD = 'IMPORT_KEYSTORE_ACCOUNT_SET_PASSWORD'
export const SET_PASSWORD_CONFIRM = 'IMPORT_KEYSTORE_ACCOUNT_SET_PASSWORD_CONFIRM' // eslint-disable-line max-len
export const SET_KNOWN_DERIVATION_PATH = 'IMPORT_KEYSTORE_ACCOUNT_SET_KNOWN_DERIVATION_PATH' // eslint-disable-line max-len
export const SET_CUSTOM_DERIVATION_PATH = 'IMPORT_KEYSTORE_ACCOUNT_SET_CUSTOM_DERIVATION_PATH' // eslint-disable-line max-len
export const SET_CURRENT_STEP = 'IMPORT_KEYSTORE_ACCOUNT_SET_CURRENT_STEP'
export const SET_STEP_DATA = 'IMPORT_KEYSTORE_ACCOUNT_SET_STEP_DATA'
export const SET_INVALID_FIELD = 'IMPORT_KEYSTORE_ACCOUNT_SET_INVALID_FIELD'
export const SET_ACCOUNT_DATA = 'IMPORT_KEYSTORE_ACCOUNT_SET_ACCOUNT_DATA'
export const CLEAR_DATA = 'IMPORT_KEYSTORE_ACCOUNT_CLEAR_DATA'

export const STEPS = {
  BEFORE: -1,
  DATA: 0,
  MNEMONIC_OPTIONS: 1,
  SET_PASSWORD: 2,
  SUCCESS: 3,
}

export function openImportKeystoreAccountModal(isOpenedFromKeystoreModal: boolean = false) {
  return {
    type: OPEN_MODAL,
    isOpenedFromKeystoreModal,
  }
}

export function closeImportKeystoreAccountModal() {
  return {
    type: CLOSE_MODAL,
  }
}

export function setImportKeystoreAccountData(data: any) {
  return {
    type: SET_DATA,
    data,
  }
}

export function setImportKeystoreAccountPassword(password: string) {
  return {
    type: SET_PASSWORD,
    password,
  }
}

export function setImportKeystoreAccountPasswordConfirm(passwordConfirm: string) {
  return {
    type: SET_PASSWORD_CONFIRM,
    passwordConfirm,
  }
}

export function setImportKeystoreAccountKnownDerivationPath(knownDerivationPath: string) {
  return {
    type: SET_KNOWN_DERIVATION_PATH,
    knownDerivationPath,
  }
}

export function setImportKeystoreAccountCustomDerivationPath(customDerivationPath: string) {
  return {
    type: SET_CUSTOM_DERIVATION_PATH,
    customDerivationPath,
  }
}

export function setImportKeystoreAccountCurrentStep(currentStep: number) {
  return {
    type: SET_CURRENT_STEP,
    currentStep,
  }
}

export function setImportKeystoreAccountInvalidField(fieldName: string, message: string) {
  return {
    type: SET_INVALID_FIELD,
    fieldName,
    message,
  }
}

export function clearImportKeystoreAccountData() {
  return {
    type: CLEAR_DATA,
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
    invalidFields: initialState.invalidFields,
  }),
  [SET_DATA]: (state, action) => ({
    ...state,
    data: action.data,
    invalidFields: {
      ...state.invalidFields,
      data: '',
    },
  }),
  [SET_PASSWORD]: (state, action) => ({
    ...state,
    password: action.password,
    invalidFields: {
      ...state.invalidFields,
      password: '',
      passwordConfirm: '',
    },
  }),
  [SET_KNOWN_DERIVATION_PATH]: (state, action) => ({
    ...state,
    knownDerivationPath: action.knownDerivationPath,
    invalidFields: {
      ...state.invalidFields,
      knownDerivationPath: '',
    },
  }),
  [SET_CUSTOM_DERIVATION_PATH]: (state, action) => ({
    ...state,
    customDerivationPath: action.customDerivationPath,
    invalidFields: {
      ...state.invalidFields,
      customDerivationPath: '',
    },
  }),
  [SET_PASSWORD_CONFIRM]: (state, action) => ({
    ...state,
    passwordConfirm: action.passwordConfirm,
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
    currentStep: action.nextStep,
  }),
  [SET_INVALID_FIELD]: (state, action) => ({
    ...state,
    invalidFields: {
      ...state.invalidFields,
      [action.fieldName]: action.message,
    },
  }),
  [SET_ACCOUNT_DATA]: (state, action) => ({
    ...state,
    accountData: action.accountData,
  }),
  [CLEAR_DATA]: () => initialState,
}

const initialState = {
  accountData: {},
  invalidFields: {},
  alert: '',
  data: '',
  password: '',
  passwordConfirm: '',
  knownDerivationPath: 'm/44\'/60\'/0\'/0',
  customDerivationPath: '',
  buttonTitle: '',
  imageName: '',
  totalSteps: 4,
  currentStep: -1,
  isOpen: false,
  isOpenedFromKeystoreModal: false,
}

export default function importKeystoreAccountModal(state: any = initialState, action: any) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
