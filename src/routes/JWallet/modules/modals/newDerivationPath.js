import pushField from 'utils/pushField'

export const NEW_DERIVATION_PATH_OPEN_MODAL = 'NEW_DERIVATION_PATH_OPEN_MODAL'
export const NEW_DERIVATION_PATH_CLOSE_MODAL = 'NEW_DERIVATION_PATH_CLOSE_MODAL'
export const NEW_DERIVATION_PATH_SET_KNOWN_PATH = 'NEW_DERIVATION_PATH_SET_KNOWN_PATH'
export const NEW_DERIVATION_PATH_SET_CUSTOM_PATH = 'NEW_DERIVATION_PATH_SET_CUSTOM_PATH'
export const NEW_DERIVATION_PATH_SET_INVALID_FIELD = 'NEW_DERIVATION_PATH_SET_INVALID_FIELD'

export function openNewDerivationPathModal(onClose = null, accountId = '', derivationPath = '') {
  return {
    type: NEW_DERIVATION_PATH_OPEN_MODAL,
    onClose,
    accountId,
    derivationPath,
  }
}

export function closeNewDerivationPathModal() {
  return {
    type: NEW_DERIVATION_PATH_CLOSE_MODAL,
  }
}

export function setKnownDerivationPath(knownDerivationPath = '') {
  return {
    type: NEW_DERIVATION_PATH_SET_KNOWN_PATH,
    knownDerivationPath,
  }
}

export function setCustomDerivationPath(customDerivationPath = '') {
  return {
    type: NEW_DERIVATION_PATH_SET_CUSTOM_PATH,
    customDerivationPath,
  }
}

export function setNewDerivationPathInvalidField(fieldName, message = '') {
  return {
    type: NEW_DERIVATION_PATH_SET_INVALID_FIELD,
    fieldName,
    message,
  }
}

const ACTION_HANDLERS = {
  [NEW_DERIVATION_PATH_OPEN_MODAL]: (state, action) => ({
    ...state,
    onClose: action.onClose,
    accountId: action.accountId,
    currentDerivationPath: action.derivationPath,
    isOpen: true,
  }),
  [NEW_DERIVATION_PATH_CLOSE_MODAL]: state => ({
    ...state,
    isOpen: false,
  }),
  [NEW_DERIVATION_PATH_SET_KNOWN_PATH]: (state, action) => ({
    ...state,
    knownDerivationPath: action.knownDerivationPath,
  }),
  [NEW_DERIVATION_PATH_SET_CUSTOM_PATH]: (state, action) => ({
    ...state,
    customDerivationPath: action.customDerivationPath,
    invalidFields: pushField(state.invalidFields, 'customDerivationPath'),
  }),
  [NEW_DERIVATION_PATH_SET_INVALID_FIELD]: (state, action) => ({
    ...state,
    invalidFields: pushField(state.invalidFields, action.fieldName, action.message),
  }),
}

const initialState = {
  invalidFields: [],
  accountId: '',
  currentDerivationPath: '',
  knownDerivationPath: '',
  customDerivationPath: '',
  onClose: null,
  isOpen: false,
}

export default function newDerivationPathModal(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
