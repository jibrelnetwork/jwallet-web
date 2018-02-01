// @flow

export const SEND_FUNDS_OPEN_MODAL = 'SEND_FUNDS_OPEN_MODAL'
export const SEND_FUNDS_CLOSE_MODAL = 'SEND_FUNDS_CLOSE_MODAL'
export const SEND_FUNDS_SET_ALERT = 'SEND_FUNDS_SET_ALERT'
export const SEND_FUNDS_SET_RECIPIENT = 'SEND_FUNDS_SET_RECIPIENT'
export const SEND_FUNDS_SET_AMOUNT = 'SEND_FUNDS_SET_AMOUNT'
export const SEND_FUNDS_SET_SYMBOL = 'SEND_FUNDS_SET_SYMBOL'
export const SEND_FUNDS_SET_GAS = 'SEND_FUNDS_SET_GAS'
export const SEND_FUNDS_SET_GAS_PRICE = 'SEND_FUNDS_SET_GAS_PRICE'
export const SEND_FUNDS_SET_PASSWORD = 'SEND_FUNDS_SET_PASSWORD'
export const SEND_FUNDS_SET_INVALID_FIELD = 'SEND_FUNDS_SET_INVALID_FIELD'
export const SEND_FUNDS_CLEAN = 'SEND_FUNDS_CLEAN'
export const SEND_FUNDS = 'SEND_FUNDS'

export function openSendFundsModal() {
  return {
    type: SEND_FUNDS_OPEN_MODAL,
  }
}

export function closeSendFundsModal() {
  return {
    type: SEND_FUNDS_CLOSE_MODAL,
  }
}

export function setSendFundsRecipient(recipient: Address = '') {
  return {
    type: SEND_FUNDS_SET_RECIPIENT,
    recipient,
  }
}

export function setSendFundsAmount(amount: string = '') {
  return {
    type: SEND_FUNDS_SET_AMOUNT,
    amount,
  }
}

export function setSendFundsSymbol(symbol: string = '') {
  return {
    type: SEND_FUNDS_SET_SYMBOL,
    symbol,
  }
}

export function setSendFundsGas(gas: any = '') {
  return {
    type: SEND_FUNDS_SET_GAS,
    gas,
  }
}

export function setSendFundsGasPrice(gasPrice: any = '') {
  return {
    type: SEND_FUNDS_SET_GAS_PRICE,
    gasPrice,
  }
}

export function setSendFundsPassword(password: any = '') {
  return {
    type: SEND_FUNDS_SET_PASSWORD,
    password,
  }
}

export function sendFunds() {
  return {
    type: SEND_FUNDS,
  }
}

const ACTION_HANDLERS = {
  [SEND_FUNDS_OPEN_MODAL]: state => ({
    ...state,
    isOpen: true,
  }),
  [SEND_FUNDS_CLOSE_MODAL]: state => ({
    ...state,
    isOpen: false,
    invalidFields: {},
    alert: '',
  }),
  [SEND_FUNDS_SET_ALERT]: (state, action) => ({
    ...state,
    alert: action.alert || '',
  }),
  [SEND_FUNDS_SET_RECIPIENT]: (state, action) => ({
    ...state,
    recipient: action.recipient,
    invalidFields: {
      ...state.invalidFields,
      recipient: '',
    },
  }),
  [SEND_FUNDS_SET_AMOUNT]: (state, action) => ({
    ...state,
    amount: action.amount,
    invalidFields: {
      ...state.invalidFields,
      amount: '',
    },
  }),
  [SEND_FUNDS_SET_SYMBOL]: (state, action) => ({
    ...state,
    symbol: action.symbol,
  }),
  [SEND_FUNDS_SET_GAS]: (state, action) => ({
    ...state,
    gas: action.gas,
    invalidFields: {
      ...state.invalidFields,
      gas: '',
    },
  }),
  [SEND_FUNDS_SET_GAS_PRICE]: (state, action) => ({
    ...state,
    gasPrice: action.gasPrice,
    invalidFields: {
      ...state.invalidFields,
      gasPrice: '',
    },
  }),
  [SEND_FUNDS_SET_PASSWORD]: (state, action) => ({
    ...state,
    password: action.password || '',
    invalidFields: {
      ...state.invalidFields,
      password: '',
    },
  }),
  [SEND_FUNDS_SET_INVALID_FIELD]: (state, action) => ({
    ...state,
    invalidFields: {
      ...state.invalidFields,
      [action.fieldName]: action.message,
    },
  }),
  [SEND_FUNDS_CLEAN]: () => initialState,
}

const initialState = {
  invalidFields: {},
  alert: '',
  recipient: '',
  amount: '',
  symbol: 'ETH',
  gas: '',
  gasPrice: '',
  password: '',
  isOpen: false,
}

export default function sendFundsModal(state: any = initialState, action: any) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
