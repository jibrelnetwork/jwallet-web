import pushField from 'utils/pushField'

export const BACKUP_KEYSTORE_OPEN_MODAL = 'BACKUP_KEYSTORE_OPEN_MODAL'
export const BACKUP_KEYSTORE_CLOSE_MODAL = 'BACKUP_KEYSTORE_CLOSE_MODAL'
export const BACKUP_KEYSTORE_SET_PASSWORD = 'BACKUP_KEYSTORE_SET_PASSWORD'
export const BACKUP_KEYSTORE_SET_INVALID_FIELD = 'BACKUP_KEYSTORE_SET_INVALID_FIELD'

export function openBackupKeystoreModal(onClose = null) {
  return {
    type: BACKUP_KEYSTORE_OPEN_MODAL,
    onClose,
  }
}

export function closeBackupKeystoreModal() {
  return {
    type: BACKUP_KEYSTORE_CLOSE_MODAL,
  }
}

export function setBackupKeystorePassword(password = '') {
  return {
    type: BACKUP_KEYSTORE_SET_PASSWORD,
    password,
  }
}

export function setBackupKeystoreInvalidField(fieldName, message = '') {
  return {
    type: BACKUP_KEYSTORE_SET_INVALID_FIELD,
    fieldName,
    message,
  }
}

const ACTION_HANDLERS = {
  [BACKUP_KEYSTORE_OPEN_MODAL]: (state, action) => ({
    ...state,
    isOpen: true,
    onClose: action.onClose,
  }),
  [BACKUP_KEYSTORE_CLOSE_MODAL]: state => ({
    ...state,
    isOpen: false,
  }),
  [BACKUP_KEYSTORE_SET_PASSWORD]: (state, action) => ({
    ...state,
    password: action.password,
    invalidFields: pushField(state.invalidFields, 'password'),
  }),
  [BACKUP_KEYSTORE_SET_INVALID_FIELD]: (state, action) => ({
    ...state,
    invalidFields: pushField(state.invalidFields, action.fieldName, action.message),
  }),
}

const initialState = {
  invalidFields: [],
  password: '',
  onClose: null,
  isOpen: false,
}

export default function backupKeystoreModal(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
