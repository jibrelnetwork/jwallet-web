export const OPEN_MODAL = 'BACKUP_KEYSTORE_OPEN_MODAL'
export const CLOSE_MODAL = 'BACKUP_KEYSTORE_CLOSE_MODAL'
export const SET_PASSWORD = 'BACKUP_KEYSTORE_SET_PASSWORD'
export const SET_INVALID_FIELD = 'BACKUP_KEYSTORE_SET_INVALID_FIELD'

export function openModal(isOpenedFromKeystoreModal = false) {
  return {
    type: OPEN_MODAL,
    isOpenedFromKeystoreModal,
  }
}

export function closeModal() {
  return {
    type: CLOSE_MODAL,
  }
}

export function setPassword(password = '') {
  return {
    type: SET_PASSWORD,
    password,
  }
}

export function setInvalidField(fieldName, message = '') {
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
  isOpen: false,
}

export default function backupKeystoreModal(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
