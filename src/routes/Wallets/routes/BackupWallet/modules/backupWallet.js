// @flow

import { assoc, assocPath, compose } from 'ramda'

export const OPEN = '@@backupWallet/OPEN'
export const CLOSE = '@@backupWallet/CLOSE'
export const SET_PASSWORD = '@@backupWallet/SET_PASSWORD'
export const SET_NEXT_STEP = '@@backupWallet/SET_NEXT_STEP'
export const SET_CURRENT_STEP = '@@backupWallet/SET_CURRENT_STEP'
export const SET_VALID_FIELD = '@@backupWallet/SET_VALID_FIELD'
export const SET_INVALID_FIELD = '@@backupWallet/SET_INVALID_FIELD'
export const BACKUP_SUCCESS = '@@backupWallet/BACKUP_SUCCESS'
export const BACKUP_ERROR = '@@backupWallet/BACKUP_ERROR'
export const CLEAN = '@@backupWallet/CLEAN'

export const STEPS = {
  FORM: 0,
  PASSWORD: 1,
}

export const open = (): { type: string } => ({
  type: OPEN,
})

export const close = (): { type: string } => ({
  type: CLOSE,
})

export const setPassword = (password: Password): {
  type: string,
  payload: {
    password: Password,
  },
} => ({
  type: SET_PASSWORD,
  payload: {
    password,
  },
})

export const setNextStep = (): { type: string } => ({
  type: SET_NEXT_STEP,
})

export const setCurrentStep = (currentStep: Index, walletType?: WalletType): {
  type: string,
  payload: {
    currentStep: Index,
    walletType?: WalletType,
  },
} => ({
  type: SET_CURRENT_STEP,
  payload: {
    currentStep,
    walletType,
  },
})

export const backupSuccess = (walletType: WalletType): {
  type: string,
  payload: {
    walletType: WalletType,
  },
} => ({
  type: BACKUP_SUCCESS,
  payload: { walletType },
})

export const backupError = (err: Object): { type: string, payload: Object, error: boolean } => ({
  type: BACKUP_ERROR,
  payload: err,
  error: true,
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

export const clean = (): { type: string } => ({
  type: CLEAN,
})

const initialState: BackupWalletData = {
  validFields: {},
  invalidFields: {},
  password: '',
  currentStep: STEPS.FORM,
}

const backupWallet = (
  state: BackupWalletData = initialState,
  action: FSA,
): Object => {
  const { type, payload }: FSA = action

  switch (type) {
    case SET_PASSWORD: {
      return compose(
        assoc('password', payload.password),
        assocPath(['validFields', 'password'], null),
        assocPath(['invalidFields', 'password'], null),
      )(state)
    }

    case SET_CURRENT_STEP: {
      return assoc('currentStep', payload.currentStep)(state)
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

export default backupWallet
