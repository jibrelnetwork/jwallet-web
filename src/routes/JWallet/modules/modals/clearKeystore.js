export const CLEAR_KEYSTORE_OPEN_MODAL = 'CLEAR_KEYSTORE_OPEN_MODAL'
export const CLEAR_KEYSTORE_CLOSE_MODAL = 'CLEAR_KEYSTORE_CLOSE_MODAL'
export const CLEAR_KEYSTORE_SET_PASSWORD = 'CLEAR_KEYSTORE_SET_PASSWORD'
export const CLEAR_KEYSTORE_SET_INVALID_FIELD = 'CLEAR_KEYSTORE_SET_INVALID_FIELD'

export function openClearKeystoreModal(onClose) {
  return {
    type: CLEAR_KEYSTORE_OPEN_MODAL,
    onClose,
  }
}

export function closeClearKeystoreModal() {
  return {
    type: CLEAR_KEYSTORE_CLOSE_MODAL,
  }
}

export function setClearKeystorePassword(password) {
  return {
    type: CLEAR_KEYSTORE_SET_PASSWORD,
    password,
  }
}

const ACTION_HANDLERS = {
  [CLEAR_KEYSTORE_OPEN_MODAL]: (state, action) => ({
    ...state,
    isOpen: true,
    onClose: action.onClose,
  }),
  [CLEAR_KEYSTORE_CLOSE_MODAL]: state => ({
    ...state,
    isOpen: false,
  }),
  [CLEAR_KEYSTORE_SET_PASSWORD]: (state, action) => ({
    ...state,
    password: action.password,
    invalidFields: {
      ...state.invalidFields,
      password: '',
    },
  }),
  [CLEAR_KEYSTORE_SET_INVALID_FIELD]: (state, action) => ({
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
  isOpen: false,
  onClose: null,
}

export default function clearKeystoreModal(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
