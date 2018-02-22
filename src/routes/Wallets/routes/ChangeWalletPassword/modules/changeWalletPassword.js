// @flow

import { assoc, assocPath, compose } from 'ramda'

export const OPEN = '@@changeWalletPassword/OPEN'
export const CLOSE = '@@changeWalletPassword/CLOSE'
export const SET_CURRENT = '@@changeWalletPassword/SET_CURRENT'
export const SET_NEW = '@@changeWalletPassword/SET_NEW'
export const SET_CONFIRM = '@@changeWalletPassword/SET_CONFIRM'
export const SET_VALID_FIELD = '@@changeWalletPassword/SET_VALID_FIELD'
export const SET_INVALID_FIELD = '@@changeWalletPassword/SET_INVALID_FIELD'
export const CLEAN = '@@changeWalletPassword/CLEAN'
export const CHANGE_PASSWORD = '@@changeWalletPassword/CHANGE_PASSWORD'
export const CHANGE_PASSWORD_SUCCESS = '@@changeWalletPassword/CHANGE_PASSWORD_SUCCESS'
export const CHANGE_PASSWORD_ERROR = '@@changeWalletPassword/CHANGE_PASSWORD_ERROR'

export const open = (): { type: string } => ({
  type: OPEN,
})

export const close = (): { type: string } => ({
  type: CLOSE,
})

export const setCurrent = (password: Password): {
  type: string,
  payload: {
    password: Password,
  },
} => ({
  type: SET_CURRENT,
  payload: {
    password,
  },
})

export const setNew = (newPassword: Password): {
  type: string,
  payload: {
    newPassword: Password,
  },
} => ({
  type: SET_NEW,
  payload: {
    newPassword,
  },
})

export const setConfirm = (confirmPassword: Password): {
  type: string,
  payload: {
    confirmPassword: Password,
  },
} => ({
  type: SET_CONFIRM,
  payload: {
    confirmPassword,
  },
})

export const setValidField = (fieldName: string, message: string): {
  type: string,
  payload: {
    fieldName: string,
    message: string,
  },
} => ({
  type: SET_VALID_FIELD,
  payload: {
    fieldName,
    message,
  },
})

export const setInvalidField = (fieldName: string, message: string): {
  type: string,
  payload: {
    fieldName: string,
    message: string,
  },
} => ({
  type: SET_INVALID_FIELD,
  payload: {
    fieldName,
    message,
  },
})

export const changePassword = (): { type: string } => ({
  type: CHANGE_PASSWORD,
})

export const changePasswordSuccess = (walletType: WalletType): {
  type: string,
  payload: {
    walletType: WalletType,
  },
} => ({
  type: CHANGE_PASSWORD_SUCCESS,
  payload: {
    walletType,
  },
})

export const changePasswordError = (err: Object): {
  type: string,
  payload: Object,
  error: boolean,
} => ({
  type: CHANGE_PASSWORD_ERROR,
  payload: err,
  error: true,
})

export const clean = (): { type: string } => ({
  type: CLEAN,
})

const initialState: ChangeWalletPasswordData = {
  validFields: {},
  invalidFields: {},
  password: '',
  newPassword: '',
  confirmPassword: '',
}

const changeWalletPassword = (
  state: ChangeWalletPasswordData = initialState,
  action: FSA,
): Object => {
  const { type, payload }: FSA = action

  switch (type) {
    case SET_CURRENT: {
      return compose(
        assoc('password', payload.password),
        assocPath(['validFields', 'password'], ''),
        assocPath(['invalidFields', 'password'], ''),
      )(state)
    }

    case SET_NEW: {
      return compose(
        assoc('newPassword', payload.newPassword),
        assocPath(['validFields', 'newPassword'], ''),
        assocPath(['invalidFields', 'newPassword'], ''),
      )(state)
    }

    case SET_CONFIRM: {
      return compose(
        assoc('confirmPassword', payload.confirmPassword),
        assocPath(['validFields', 'confirmPassword'], ''),
        assocPath(['invalidFields', 'confirmPassword'], ''),
      )(state)
    }

    case SET_VALID_FIELD: {
      return assocPath(['validFields', payload.fieldName], payload.message)(state)
    }

    case SET_INVALID_FIELD: {
      return assocPath(['invalidFields', payload.fieldName], payload.message)(state)
    }

    case CLEAN: return initialState

    default: return state
  }
}

export default changeWalletPassword
