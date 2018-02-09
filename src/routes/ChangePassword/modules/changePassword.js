// @flow

export const SET_CURRENT = '@@changePassword/SET_CURRENT'
export const SET_NEW = '@@changePassword/SET_NEW'
export const SET_CONFIRM = '@@changePassword/SET_CONFIRM'
export const SET_INVALID_FIELD = '@@changePassword/SET_INVALID_FIELD'
export const CLEAN = '@@changePassword/CLEAN'
export const CHANGE = '@@changePassword/CHANGE'

export function setPassword(password: string): { type: string, password: string } {
  return {
    type: SET_CURRENT,
    password,
  }
}

export function setNewPassword(newPassword: string): { type: string, newPassword: string } {
  return {
    type: SET_NEW,
    newPassword,
  }
}

export function setConfirmPassword(confirmPassword: string): {
  type: string,
  confirmPassword: string,
} {
  return {
    type: SET_CONFIRM,
    confirmPassword,
  }
}

export function setInvalidField(fieldName: string, message: string): {
  type: string,
  fieldName: string,
  message: string,
} {
  return {
    type: SET_INVALID_FIELD,
    fieldName,
    message,
  }
}

export function change(): { type: string } {
  return {
    type: CHANGE,
  }
}

const ACTION_HANDLERS = {
  [SET_CURRENT]: (state, action) => ({
    ...state,
    password: action.password,
    invalidFields: {
      ...state.invalidFields,
      password: '',
    },
  }),
  [SET_NEW]: (state, action) => ({
    ...state,
    newPassword: action.newPassword,
    invalidFields: {
      ...state.invalidFields,
      newPassword: '',
    },
  }),
  [SET_CONFIRM]: (state, action) => ({
    ...state,
    confirmPassword: action.confirmPassword,
    invalidFields: {
      ...state.invalidFields,
      confirmPassword: '',
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
  newPassword: '',
  confirmPassword: '',
}

export default function changePassword(state: any = initialState, action: any) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
