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
export const CLEAN = '@@sendFunds/CLEAN'
export const SEND = '@@sendFunds/SEND'

export function setAsset(assetAddress: Address) {
  return {
    type: SET_ASSET,
    assetAddress,
  }
}

export function setAmount(amount: string) {
  return {
    type: SET_AMOUNT,
    amount,
  }
}

export function setRecipient(recipientAddress: Address) {
  return {
    type: SET_RECIPIENT,
    recipientAddress,
  }
}

export function setGas(gas: any) {
  return {
    type: SET_GAS,
    gas,
  }
}

export function setGasPrice(gasPrice: any) {
  return {
    type: SET_GAS_PRICE,
    gasPrice,
  }
}

export function setNonce(nonce: any) {
  return {
    type: SET_NONCE,
    nonce,
  }
}

export function setPassword(password: any) {
  return {
    type: SET_PASSWORD,
    password,
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
    assetAddress: action.assetAddress,
    invalidFields: {
      ...state.invalidFields,
      assetAddress: '',
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
    recipientAddress: action.recipientAddress,
    invalidFields: {
      ...state.invalidFields,
      recipientAddress: '',
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
    password: action.password || '',
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
  alert: '',
  assetAddress: '',
  amount: '',
  recipientAddress: '',
  gas: '',
  gasPrice: '',
  nonce: '',
  password: '',
}

export default function sendFunds(state: any = initialState, action: any) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
