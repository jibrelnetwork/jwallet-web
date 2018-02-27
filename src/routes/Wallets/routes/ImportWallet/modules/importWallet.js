// @flow

import { assoc, assocPath, compose } from 'ramda'

import config from 'config'

export const OPEN = '@@importWallet/OPEN'
export const CLOSE = '@@importWallet/CLOSE'
export const SET_NAME = '@@importWallet/SET_NAME'
export const SET_DATA = '@@importWallet/SET_DATA'
export const SET_WALLET_TYPE = '@@importWallet/SET_WALLET_TYPE'
export const SET_KNOWN_DERIVATION_PATH = '@@importWallet/SET_KNOWN_DERIVATION_PATH'
export const SET_CUSTOM_DERIVATION_PATH = '@@importWallet/SET_CUSTOM_DERIVATION_PATH'
export const SET_PASSWORD = '@@importWallet/SET_PASSWORD'
export const SET_PASSWORD_CONFIRM = '@@importWallet/SET_PASSWORD_CONFIRM'
export const SET_NEXT_STEP = '@@importWallet/SET_NEXT_STEP'
export const SET_PREV_STEP = '@@importWallet/SET_PREV_STEP'
export const SET_CURRENT_STEP = '@@importWallet/SET_CURRENT_STEP'
export const SET_VALID_FIELD = '@@importWallet/SET_VALID_FIELD'
export const SET_INVALID_FIELD = '@@importWallet/SET_INVALID_FIELD'
export const IMPORT_SUCCESS = '@@importWallet/IMPORT_SUCCESS'
export const IMPORT_ERROR = '@@importWallet/IMPORT_ERROR'
export const CLEAN = '@@importWallet/CLEAN'

export const STEPS = {
  DATA: 0,
  PASSWORD: 1,
  ASSETS: 2,
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

export const setData = (data: string): {
  type: string,
  payload: {
    data: string,
  },
} => ({
  type: SET_DATA,
  payload: {
    data,
  },
})

export const setWalletType = (walletType: WalletType): {
  type: string,
  payload: {
    walletType: WalletType,
  },
} => ({
  type: SET_WALLET_TYPE,
  payload: {
    walletType,
  },
})

export const setKnownDerivationPath = (knownDerivationPath: string): {
  type: string,
  payload: {
    knownDerivationPath: string,
  },
} => ({
  type: SET_KNOWN_DERIVATION_PATH,
  payload: {
    knownDerivationPath,
  },
})

export const setCustomDerivationPath = (customDerivationPath: string): {
  type: string,
  payload: {
    customDerivationPath: string,
  },
} => ({
  type: SET_CUSTOM_DERIVATION_PATH,
  payload: {
    customDerivationPath,
  },
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

export const setPrevStep = (): { type: string } => ({
  type: SET_PREV_STEP,
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

export const importSuccess = (): { type: string } => ({
  type: IMPORT_SUCCESS,
})

export const importError = (err: Object): {
  type: string,
  payload: Object,
  error: boolean,
} => ({
  type: IMPORT_ERROR,
  payload: err,
  error: true,
})

export const clean = (): { type: string } => ({
  type: CLEAN,
})

const initialState: ImportWalletData = {
  validFields: {},
  invalidFields: {},
  name: '',
  data: '',
  password: '',
  passwordConfirm: '',
  knownDerivationPath: config.defaultDerivationPath,
  customDerivationPath: '',
  currentStep: STEPS.DATA,
  totalSteps: 3,
  walletType: undefined,
}

const importWallet = (
  state: ImportWalletData = initialState,
  action: FSA,
): Object => {
  const { type, payload }: FSA = action

  switch (type) {
    case SET_NAME: {
      return compose(
        assoc('name', payload.name),
        assocPath(['validFields', 'name'], ''),
        assocPath(['invalidFields', 'name'], ''),
      )(state)
    }

    case SET_DATA: {
      return compose(
        assoc('data', payload.data),
        assocPath(['validFields', 'data'], ''),
        assocPath(['invalidFields', 'data'], ''),
      )(state)
    }

    case SET_WALLET_TYPE: {
      return assoc('walletType', payload.walletType)(state)
    }

    case SET_KNOWN_DERIVATION_PATH: {
      return compose(
        assoc('knownDerivationPath', payload.knownDerivationPath),
        assocPath(['validFields', 'knownDerivationPath'], ''),
        assocPath(['invalidFields', 'knownDerivationPath'], ''),
      )(state)
    }

    case SET_CUSTOM_DERIVATION_PATH: {
      return compose(
        assoc('customDerivationPath', payload.customDerivationPath),
        assocPath(['validFields', 'customDerivationPath'], ''),
        assocPath(['invalidFields', 'customDerivationPath'], ''),
      )(state)
    }

    case SET_PASSWORD: {
      return compose(
        assoc('password', payload.password),
        assocPath(['validFields', 'password'], ''),
        assocPath(['invalidFields', 'password'], ''),
      )(state)
    }

    case SET_PASSWORD_CONFIRM: {
      return compose(
        assoc('passwordConfirm', payload.passwordConfirm),
        assocPath(['validFields', 'passwordConfirm'], ''),
        assocPath(['invalidFields', 'passwordConfirm'], ''),
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

    case IMPORT_SUCCESS: {
      return assocPath(['validFields', 'passwordConfirm'], '')(state)
    }

    case CLEAN: {
      return initialState
    }

    default: return state
  }
}

export default importWallet
