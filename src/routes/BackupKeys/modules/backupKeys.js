// @flow

export const SET_PASSWORD = '@@backupKeys/SET_PASSWORD'
export const SET_INVALID_FIELD = '@@backupKeys/SET_INVALID_FIELD'
export const CLEAN = '@@backupKeys/CLEAN'
export const BACKUP = '@@backupKeys/BACKUP'

export function setPassword(password: string = '') {
  return {
    type: SET_PASSWORD,
    password,
  }
}

export function setInvalidField(fieldName: string, message: string) {
  return {
    type: SET_INVALID_FIELD,
    fieldName,
    message,
  }
}

const ACTION_HANDLERS = {
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
  [CLEAN]: () => initialState,
}

const initialState = {
  invalidFields: {},
  password: '',
}

export default function backupKeys(state: any = initialState, action: any) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
