export const NEW_KEYSTORE_PASSWORD_OPEN_MODAL = 'NEW_KEYSTORE_PASSWORD_OPEN_MODAL'
export const NEW_KEYSTORE_PASSWORD_CLOSE_MODAL = 'NEW_KEYSTORE_PASSWORD_CLOSE_MODAL'
export const NEW_KEYSTORE_PASSWORD_SET_OLD = 'NEW_KEYSTORE_PASSWORD_SET_OLD'
export const NEW_KEYSTORE_PASSWORD_SET_NEW = 'NEW_KEYSTORE_PASSWORD_SET_NEW'
export const NEW_KEYSTORE_PASSWORD_SET_INVALID_FIELD = 'NEW_KEYSTORE_PASSWORD_SET_INVALID_FIELD'

export function openNewKeystorePasswordModal(onClose = null) {
  return {
    type: NEW_KEYSTORE_PASSWORD_OPEN_MODAL,
    onClose,
  }
}

export function closeNewKeystorePasswordModal() {
  return {
    type: NEW_KEYSTORE_PASSWORD_CLOSE_MODAL,
  }
}

export function setOldKeystorePassword(oldPassword = '') {
  return {
    type: NEW_KEYSTORE_PASSWORD_SET_OLD,
    oldPassword,
  }
}

export function setNewKeystorePassword(newPassword = '') {
  return {
    type: NEW_KEYSTORE_PASSWORD_SET_NEW,
    newPassword,
  }
}

export function setNewKeystorePasswordInvalidField(fieldName, message = '') {
  return {
    type: NEW_KEYSTORE_PASSWORD_SET_INVALID_FIELD,
    fieldName,
    message,
  }
}

const ACTION_HANDLERS = {
  [NEW_KEYSTORE_PASSWORD_OPEN_MODAL]: (state, action) => ({
    ...state,
    isOpen: true,
    onClose: action.onClose,
  }),
  [NEW_KEYSTORE_PASSWORD_CLOSE_MODAL]: () => initialState,
  [NEW_KEYSTORE_PASSWORD_SET_OLD]: (state, action) => ({
    ...state,
    oldPassword: action.oldPassword,
    invalidFields: {
      ...state.invalidFields,
      oldPassword: '',
    },
  }),
  [NEW_KEYSTORE_PASSWORD_SET_NEW]: (state, action) => ({
    ...state,
    newPassword: action.newPassword,
    invalidFields: {
      ...state.invalidFields,
      newPassword: '',
    },
  }),
  [NEW_KEYSTORE_PASSWORD_SET_INVALID_FIELD]: (state, action) => ({
    ...state,
    invalidFields: {
      ...state.invalidFields,
      [action.fieldName]: action.message,
    },
  }),
}

const initialState = {
  invalidFields: {},
  oldPassword: '',
  newPassword: '',
  onClose: null,
  isOpen: false,
}

export default function newKeystorePasswordModal(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
