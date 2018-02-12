// @flow

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
export const GO_TO_PASSWORD_STEP = '@@sendFunds/GO_TO_PASSWORD_STEP'
export const CLEAN = '@@sendFunds/CLEAN'
export const SEND = '@@sendFunds/SEND'

export const STEPS = {
  FORM: 0,
  PASSWORD: 1,
}

export function setAsset(symbol: string): { type: string, symbol: string } {
  return {
    type: SET_ASSET,
    symbol,
  }
}

export function setAmount(amount: string): { type: string, amount: string } {
  return {
    type: SET_AMOUNT,
    amount,
  }
}

export function setRecipient(recipient: Address): {
  type: string,
  recipient: Address,
} {
  return {
    type: SET_RECIPIENT,
    recipient,
  }
}

export function setGas(gas: string): { type: string, gas: string } {
  return {
    type: SET_GAS,
    gas,
  }
}

export function setGasPrice(gasPrice: string): { type: string, gasPrice: string } {
  return {
    type: SET_GAS_PRICE,
    gasPrice,
  }
}

export function setNonce(nonce: string): { type: string, nonce: string } {
  return {
    type: SET_NONCE,
    nonce,
  }
}

export function setPassword(password: string): { type: string, password: string } {
  return {
    type: SET_PASSWORD,
    password,
  }
}

export function goToPasswordStep(): { type: string } {
  return {
    type: GO_TO_PASSWORD_STEP,
  }
}

export function send() {
  return {
    type: SEND,
  }
}

const ACTION_HANDLERS = {
  [SET_ALERT]: (state, action) => ({
    ...state,
    alert: action.alert,
  }),
  [SET_ASSET]: (state, action) => ({
    ...state,
    symbol: action.symbol,
    invalidFields: {
      ...state.invalidFields,
      symbol: '',
    },
  }),
  [SET_AMOUNT]: (state, action) => ({
    ...state,
    amount: action.amount,
    invalidFields: {
      ...state.invalidFields,
      amount: '',
    },
  }),
  [SET_RECIPIENT]: (state, action) => ({
    ...state,
    recipient: action.recipient,
    invalidFields: {
      ...state.invalidFields,
      recipient: '',
    },
  }),
  [SET_GAS]: (state, action) => ({
    ...state,
    gas: action.gas,
    invalidFields: {
      ...state.invalidFields,
      gas: '',
    },
  }),
  [SET_GAS_PRICE]: (state, action) => ({
    ...state,
    gasPrice: action.gasPrice,
    invalidFields: {
      ...state.invalidFields,
      gasPrice: '',
    },
  }),
  [SET_NONCE]: (state, action) => ({
    ...state,
    nonce: action.nonce,
    invalidFields: {
      ...state.invalidFields,
      nonce: '',
    },
  }),
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
  [SET_CURRENT_STEP]: (state, action) => ({
    ...state,
    currentStep: action.currentStep,
  }),
  [CLEAN]: () => initialState,
}

const initialState = {
  invalidFields: {},
  alert: '',
  symbol: 'ETH',
  amount: '',
  recipient: '',
  gas: '',
  gasPrice: '',
  nonce: '',
  password: '',
  currentStep: STEPS.FORM,
}

export default function sendFunds(state: any = initialState, action: any) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
