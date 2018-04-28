// @flow

import { assoc, assocPath, compose } from 'ramda'

export const OPEN = '@@createWallet/OPEN'
export const CLOSE = '@@createWallet/CLOSE'
export const SET_NAME = '@@createWallet/SET_NAME'
export const SET_MNEMONIC = '@@createWallet/SET_MNEMONIC'
export const SET_MNEMONIC_CONFIRM = '@@createWallet/SET_MNEMONIC_CONFIRM'
export const COPY_MNEMONIC = '@@createWallet/COPY_MNEMONIC'
export const SAVE_MNEMONIC = '@@createWallet/SAVE_MNEMONIC'
export const SET_PASSWORD = '@@createWallet/SET_PASSWORD'
export const SET_PASSWORD_CONFIRM = '@@createWallet/SET_PASSWORD_CONFIRM'
export const SET_NEXT_STEP = '@@createWallet/SET_NEXT_STEP'
export const SET_PREV_STEP = '@@createWallet/SET_PREV_STEP'
export const SET_CURRENT_STEP = '@@createWallet/SET_CURRENT_STEP'
export const SET_VALID_FIELD = '@@createWallet/SET_VALID_FIELD'
export const SET_INVALID_FIELD = '@@createWallet/SET_INVALID_FIELD'
export const CREATE_SUCCESS = '@@createWallet/CREATE_SUCCESS'
export const CREATE_ERROR = '@@createWallet/CREATE_ERROR'
export const CLEAN = '@@createWallet/CLEAN'

export const STEPS = {
  NAME: 0,
  MNEMONIC: 1,
  CONFIRM: 2,
  PASSWORD: 3,
  ASSETS: 4,
}

export const open = (): { type: string } => ({
  type: OPEN,
})

export const close = (): { type: string } => ({
  type: CLOSE,
})

export const setName = (name: string): {
  type: string,
  payload: {
    name: string,
  },
} => ({
  type: SET_NAME,
  payload: {
    name,
  },
})

export const setMnemonic = (mnemonic: string): {
  type: string,
  payload: {
    mnemonic: string,
  },
} => ({
  type: SET_MNEMONIC,
  payload: {
    mnemonic,
  },
})

export const setMnemonicConfirm = (mnemonicConfirm: string): {
  type: string,
  payload: {
    mnemonicConfirm: string,
  },
} => ({
  type: SET_MNEMONIC_CONFIRM,
  payload: {
    mnemonicConfirm,
  },
})

export const copyMnemonic = (): { type: string } => ({
  type: COPY_MNEMONIC,
})

export const saveMnemonic = (): { type: string } => ({
  type: SAVE_MNEMONIC,
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

export const setPasswordConfirm = (passwordConfirm: Password): {
  type: string,
  payload: {
    passwordConfirm: Password,
  },
} => ({
  type: SET_PASSWORD_CONFIRM,
  payload: {
    passwordConfirm,
  },
})

export const setNextStep = (): { type: string } => ({
  type: SET_NEXT_STEP,
})

export const setPrevStep = (): { type: string } => ({
  type: SET_PREV_STEP,
})

export const setCurrentStep = (currentStep: Index): {
  type: string,
  payload: {
    currentStep: Index,
  },
} => ({
  type: SET_CURRENT_STEP,
  payload: {
    currentStep,
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

export const createSuccess = (): { type: string } => ({
  type: CREATE_SUCCESS,
})

export const createError = (err: Object): {
  type: string,
  payload: Object,
  error: boolean,
} => ({
  type: CREATE_ERROR,
  payload: err,
  error: true,
})

export const clean = (): { type: string } => ({
  type: CLEAN,
})

const initialState: CreateWalletData = {
  validFields: {},
  invalidFields: {},
  name: '',
  mnemonic: '',
  mnemonicConfirm: '',
  password: '',
  passwordConfirm: '',
  currentStep: STEPS.MNEMONIC,
  totalSteps: 4,
}

const createWallet = (
  state: CreateWalletData = initialState,
  action: FSA,
): Object => {
  const { type, payload }: FSA = action

  switch (type) {
    case SET_NAME: {
      return compose(
        assoc('name', payload.name),
        assocPath(['validFields', 'name'], null),
        assocPath(['invalidFields', 'name'], null),
      )(state)
    }

    case SET_MNEMONIC: {
      return compose(
        assoc('mnemonic', payload.mnemonic),
        assocPath(['validFields', 'mnemonic'], null),
        assocPath(['invalidFields', 'mnemonic'], null),
      )(state)
    }

    case SET_MNEMONIC_CONFIRM: {
      return compose(
        assoc('mnemonicConfirm', payload.mnemonicConfirm),
        assocPath(['validFields', 'mnemonicConfirm'], null),
        assocPath(['invalidFields', 'mnemonicConfirm'], null),
      )(state)
    }

    case SET_PASSWORD: {
      return compose(
        assoc('password', payload.password),
        assocPath(['validFields', 'password'], null),
        assocPath(['invalidFields', 'password'], null),
      )(state)
    }

    case SET_PASSWORD_CONFIRM: {
      return compose(
        assoc('passwordConfirm', payload.passwordConfirm),
        assocPath(['validFields', 'passwordConfirm'], null),
        assocPath(['invalidFields', 'passwordConfirm'], null),
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

    case CREATE_SUCCESS: {
      return assocPath(['validFields', 'passwordConfirm'], null)(state)
    }

    case CLEAN: {
      return initialState
    }

    default: return state
  }
}

export default createWallet
