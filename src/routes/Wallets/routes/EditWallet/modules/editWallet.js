// @flow

import { assoc, assocPath, compose } from 'ramda'

import config from 'config'

export const OPEN = '@@editWallet/OPEN'
export const CLOSE = '@@editWallet/CLOSE'
export const SET_WALLET_TYPE = '@@editWallet/SET_WALLET_TYPE'
export const SET_NAME = '@@editWallet/SET_NAME'
export const SET_KNOWN_DERIVATION_PATH = '@@editWallet/SET_KNOWN_DERIVATION_PATH'
export const SET_CUSTOM_DERIVATION_PATH = '@@editWallet/SET_CUSTOM_DERIVATION_PATH'
export const SET_PASSWORD = '@@editWallet/SET_PASSWORD'
export const SET_PREV_STEP = '@@editWallet/SET_PREV_STEP'
export const SET_NEXT_STEP = '@@editWallet/SET_NEXT_STEP'
export const SET_CURRENT_STEP = '@@editWallet/SET_CURRENT_STEP'
export const SET_VALID_FIELD = '@@editWallet/SET_VALID_FIELD'
export const SET_INVALID_FIELD = '@@editWallet/SET_INVALID_FIELD'
export const EDIT_SUCCESS = '@@editWallet/EDIT_SUCCESS'
export const EDIT_ERROR = '@@editWallet/EDIT_ERROR'
export const CLEAN = '@@editWallet/CLEAN'

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

export const editSuccess = (walletType?: WalletType): {
  type: string,
  payload: {
    walletType?: WalletType,
  },
} => ({
  type: EDIT_SUCCESS,
  payload: {
    walletType,
  },
})

export const editError = (err: Object): {
  type: string,
  payload: Object,
  error: boolean,
} => ({
  type: EDIT_ERROR,
  payload: err,
  error: true,
})

export const clean = (): { type: string } => ({
  type: CLEAN,
})

const initialState: EditWalletData = {
  validFields: {},
  invalidFields: {},
  name: '',
  knownDerivationPath: config.defaultDerivationPath,
  customDerivationPath: '',
  password: '',
  currentStep: STEPS.FORM,
  walletType: undefined,
}

const editWallet = (
  state: EditWalletData = initialState,
  action: FSA,
): Object => {
  const { type, payload }: FSA = action

  switch (type) {
    case SET_WALLET_TYPE: {
      return assoc('walletType', payload.walletType)(state)
    }

    case SET_NAME: {
      return compose(
        assoc('name', payload.name),
        assocPath(['validFields', 'name'], null),
        assocPath(['invalidFields', 'name'], null),
      )(state)
    }

    case SET_KNOWN_DERIVATION_PATH: {
      return compose(
        assoc('knownDerivationPath', payload.knownDerivationPath),
        assocPath(['validFields', 'knownDerivationPath'], null),
        assocPath(['invalidFields', 'knownDerivationPath'], null),
        assoc('selectedDerivationPathType', 'known'),
      )(state)
    }

    case SET_CUSTOM_DERIVATION_PATH: {
      return compose(
        assoc('customDerivationPath', payload.customDerivationPath),
        assocPath(['validFields', 'customDerivationPath'], null),
        assocPath(['invalidFields', 'customDerivationPath'], null),
        assoc('selectedDerivationPathType', 'custom'),
      )(state)
    }

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

    case EDIT_SUCCESS: {
      return assocPath(['validFields', 'passwordConfirm'], null)(state)
    }

    case CLEAN: {
      return initialState
    }

    default: return state
  }
}

export default editWallet
