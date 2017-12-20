export const OPEN_MODAL = 'NEW_DERIVATION_PATH_OPEN_MODAL'
export const CLOSE_MODAL = 'NEW_DERIVATION_PATH_CLOSE_MODAL'
export const SET_PASSWORD = 'NEW_DERIVATION_PATH_SET_PASSWORD'
export const SET_KNOWN_PATH = 'NEW_DERIVATION_PATH_SET_KNOWN_PATH'
export const SET_CUSTOM_PATH = 'NEW_DERIVATION_PATH_SET_CUSTOM_PATH'
export const SET_INVALID_FIELD = 'NEW_DERIVATION_PATH_SET_INVALID_FIELD'

export function openNewDerivationPathModal(
  accountId,
  derivationPath,
  isOpenedFromKeystoreModal = false,
) {
  return {
    type: OPEN_MODAL,
    accountId,
    derivationPath,
    isOpenedFromKeystoreModal,
  }
}

export function closeNewDerivationPathModal() {
  return {
    type: CLOSE_MODAL,
  }
}

export function setDerivationPathPassword(password) {
  return {
    type: SET_PASSWORD,
    password,
  }
}

export function setKnownDerivationPath(knownDerivationPath) {
  return {
    type: SET_KNOWN_PATH,
    knownDerivationPath,
  }
}

export function setCustomDerivationPath(customDerivationPath) {
  return {
    type: SET_CUSTOM_PATH,
    customDerivationPath,
  }
}

export function setNewDerivationPathInvalidField(fieldName, message) {
  return {
    type: SET_INVALID_FIELD,
    fieldName,
    message,
  }
}

const ACTION_HANDLERS = {
  [OPEN_MODAL]: (state, action) => ({
    ...state,
    accountId: action.accountId,
    currentDerivationPath: action.derivationPath,
    isOpenedFromKeystoreModal: action.isOpenedFromKeystoreModal,
    isOpen: true,
  }),
  [CLOSE_MODAL]: state => ({
    ...initialState,
    isOpenedFromKeystoreModal: state.isOpenedFromKeystoreModal,
  }),
  [SET_PASSWORD]: (state, action) => ({
    ...state,
    password: action.password,
    invalidFields: {
      ...state.invalidFields,
      password: '',
    },
  }),
  [SET_KNOWN_PATH]: (state, action) => ({
    ...state,
    knownDerivationPath: action.knownDerivationPath,
  }),
  [SET_CUSTOM_PATH]: (state, action) => ({
    ...state,
    customDerivationPath: action.customDerivationPath,
    invalidFields: {
      ...state.invalidFields,
      customDerivationPath: '',
    },
  }),
  [SET_INVALID_FIELD]: (state, action) => ({
    ...state,
    invalidFields: {
      ...state.invalidFields,
      [action.fieldName]: action.message,
    },
  }),
}

const initialState = {
  invalidFields: {},
  password: '',
  accountId: '',
  currentDerivationPath: '',
  knownDerivationPath: '',
  customDerivationPath: '',
  isOpen: false,
  isOpenedFromKeystoreModal: false,
}

export default function newDerivationPathModal(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
