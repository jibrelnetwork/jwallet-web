// @flow

export const SET_OLD = '@@changePassword/SET_OLD'
export const SET_NEW = '@@changePassword/SET_NEW'
export const SET_CONFIRM = '@@changePassword/SET_CONFIRM'
export const SET_INVALID_FIELD = '@@changePassword/SET_INVALID_FIELD'
export const CLEAN = '@@changePassword/CLEAN'
export const CHANGE = '@@changePassword/CHANGE'

export function setOldPassword(oldPassword: Password) {
  return {
    type: SET_OLD,
    oldPassword,
  }
}

export function setNewPassword(newPassword: Password) {
  return {
    type: SET_NEW,
    newPassword,
  }
}

export function setConfirmPassword(confirmPassword: Password) {
  return {
    type: SET_CONFIRM,
    confirmPassword,
  }
}

export function setInvalidField(fieldName: string, message: string) {
  return {
    type: SET_INVALID_FIELD,
    fieldName,
    message,
  }
}

export function change(oldPassword: Password, newPassword: Password) {
  return {
    type: CHANGE,
    oldPassword,
    newPassword,
  }
}

const ACTION_HANDLERS = {
  [SET_OLD]: (state, action) => ({
    ...state,
    oldPassword: action.oldPassword,
    invalidFields: {
      ...state.invalidFields,
      oldPassword: '',
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
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
}

export default function changePassword(state: any = initialState, action: any) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
