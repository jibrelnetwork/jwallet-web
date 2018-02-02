// @flow

export const SET_PASSWORD = '@@clearKeys/SET_PASSWORD'
export const SET_INVALID_FIELD = '@@clearKeys/SET_INVALID_FIELD'
export const CLEAN = '@@clearKeys/CLEAN'
export const CLEAR = '@@clearKeys/CLEAR'

export function setPassword(password: Password) {
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

export function clear(password: Password) {
  return {
    type: CLEAR,
    password,
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

export default function clearKeys(state: any = initialState, action: any) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
