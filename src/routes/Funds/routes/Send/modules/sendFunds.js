// @flow

import { assoc, assocPath, compose, identity } from 'ramda'

import ethereum from 'data/assets/ethereum'

export const OPEN = '@@sendFunds/OPEN'
export const CLOSE = '@@sendFunds/CLOSE'
export const SET_ALERT = '@@sendFunds/SET_ALERT'
export const SET_ASSET = '@@sendFunds/SET_ASSET'
export const SET_AMOUNT = '@@sendFunds/SET_AMOUNT'
export const SET_RECIPIENT = '@@sendFunds/SET_RECIPIENT'
export const SET_GAS = '@@sendFunds/SET_GAS'
export const SET_GAS_PRICE = '@@sendFunds/SET_GAS_PRICE'
export const SET_NONCE = '@@sendFunds/SET_NONCE'
export const SET_PASSWORD = '@@sendFunds/SET_PASSWORD'
export const SET_INVALID_FIELD = '@@sendFunds/SET_INVALID_FIELD'
export const SET_CURRENT_STEP = '@@sendFunds/SET_CURRENT_STEP'
export const SET_NEXT_STEP = '@@sendFunds/SET_NEXT_STEP'
export const SET_IS_SENDING = '@@sendFunds/SET_IS_SENDING'
export const SEND_SUCCESS = '@@sendFunds/SEND_SUCCESS'
export const SEND_ERROR = '@@sendFunds/SEND_ERROR'
export const CLEAN = '@@sendFunds/CLEAN'

export const STEPS = {
  FORM: 0,
  PASSWORD: 1,
}

export const open = (recipient: ?Address, amount: number, assetAddress: ?Address): {
  type: string,
  payload: {
    recipient: ?Address,
    amount: number,
    assetAddress: ?Address,
  },
} => ({
  type: OPEN,
  payload: {
    recipient,
    amount,
    assetAddress,
  },
})

export const close = (): { type: string } => ({
  type: CLOSE,
})

export const setAlert = (alert: string): {
  type: string,
  payload: {
    alert: string,
  },
} => ({
  type: SET_ALERT,
  payload: {
    alert,
  },
})

export const setAsset = (assetAddress: Address): {
  type: string,
  payload: {
    assetAddress: Address,
  },
} => ({
  type: SET_ASSET,
  payload: {
    assetAddress,
  },
})

export const setAmount = (amount: string): {
  type: string,
  payload: {
    amount: string,
  },
} => ({
  type: SET_AMOUNT,
  payload: {
    amount,
  },
})

export const setRecipient = (recipient: Address): {
  type: string,
  payload: {
    recipient: Address,
  },
} => ({
  type: SET_RECIPIENT,
  payload: {
    recipient,
  },
})

export const setGas = (gas: string): {
  type: string,
  payload: {
    gas: string,
  },
} => ({
  type: SET_GAS,
  payload: {
    gas,
  },
})

export const setGasPrice = (gasPrice: string): {
  type: string,
  payload: {
    gasPrice: string,
  },
} => ({
  type: SET_GAS_PRICE,
  payload: {
    gasPrice,
  },
})

export const setNonce = (nonce: string): {
  type: string,
  payload: {
    nonce: string,
  },
} => ({
  type: SET_NONCE,
  payload: {
    nonce,
  },
})

export const setPassword = (password: string): {
  type: string,
  payload: {
    password: string,
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

export const setIsSending = (isSending: boolean): {
  type: string,
  payload: {
    isSending: boolean,
  },
} => ({
  type: SET_IS_SENDING,
  payload: {
    isSending,
  },
})

export const sendSuccess = (assetAddress: Address): {
  type: string,
  payload: {
    assetAddress: Address,
  },
} => ({
  type: SEND_SUCCESS,
  payload: {
    assetAddress,
  },
})

export const sendError = (err: Object): {
  type: string,
  payload: Object,
  error: boolean,
} => ({
  type: SEND_ERROR,
  payload: err,
  error: true,
})

export const clean = (): { type: string } => ({
  type: CLEAN,
})

const initialState: SendFundsData = {
  invalidFields: {},
  alert: '',
  assetAddress: ethereum.address,
  amount: '',
  recipient: '',
  gas: '',
  gasPrice: '',
  nonce: '',
  password: '',
  currentStep: STEPS.FORM,
  isSending: false,
}

const sendFunds = (
  state: SendFundsData = initialState,
  action: Object,
): Object => {
  const { type, payload }: Object = action

  switch (type) {
    case OPEN: {
      return compose(
        payload.assetAddress ? assoc('assetAddress', payload.assetAddress) : identity,
        payload.amount ? assoc('amount', payload.amount.toString()) : identity,
        payload.recipient ? assoc('recipient', payload.recipient) : identity,
      )(state)
    }

    case SET_ALERT: {
      return assoc('alert', payload.alert)(state)
    }

    case SET_ASSET: {
      return assoc('assetAddress', payload.assetAddress)(state)
    }

    case SET_AMOUNT: {
      return compose(
        assoc('amount', payload.amount),
        assocPath(['invalidFields', 'amount'], null),
      )(state)
    }

    case SET_RECIPIENT: {
      return compose(
        assoc('recipient', payload.recipient),
        assocPath(['invalidFields', 'recipient'], null),
      )(state)
    }

    case SET_GAS: {
      return compose(
        assoc('gas', payload.gas),
        assocPath(['invalidFields', 'gas'], null),
      )(state)
    }

    case SET_GAS_PRICE: {
      return compose(
        assoc('gasPrice', payload.gasPrice),
        assocPath(['invalidFields', 'gasPrice'], null),
      )(state)
    }

    case SET_NONCE: {
      return compose(
        assoc('nonce', payload.nonce),
        assocPath(['invalidFields', 'nonce'], null),
      )(state)
    }

    case SET_PASSWORD: {
      return compose(
        assoc('password', payload.password),
        assocPath(['invalidFields', 'password'], null),
      )(state)
    }

    case SET_CURRENT_STEP: {
      return compose(
        assoc('password', ''),
        assoc('currentStep', payload.currentStep),
      )(state)
    }

    case SET_INVALID_FIELD: {
      return assocPath(['invalidFields', payload.fieldName], payload.message)(state)
    }

    case SET_IS_SENDING: {
      return assoc('isSending', payload.isSending)(state)
    }

    case CLEAN: return initialState

    default: return state
  }
}

export default sendFunds
