export const SEND_FUNDS_OPEN_MODAL = 'SEND_FUNDS_OPEN_MODAL'
export const SEND_FUNDS_CLOSE_MODAL = 'SEND_FUNDS_CLOSE_MODAL'
export const SEND_FUNDS_SET_ALERT = 'SEND_FUNDS_SET_ALERT'
export const SEND_FUNDS_SET_ADDRESS = 'SEND_FUNDS_SET_ADDRESS'
export const SEND_FUNDS_SET_AMOUNT = 'SEND_FUNDS_SET_AMOUNT'
export const SEND_FUNDS_SET_SYMBOL = 'SEND_FUNDS_SET_SYMBOL'
export const SEND_FUNDS_SET_ACCOUNT_ID = 'SEND_FUNDS_SET_ACCOUNT_ID'
export const SEND_FUNDS_SET_ACCOUNT = 'SEND_FUNDS_SET_ACCOUNT'
export const SEND_FUNDS_SET_GAS = 'SEND_FUNDS_SET_GAS'
export const SEND_FUNDS_SET_GAS_PRICE = 'SEND_FUNDS_SET_GAS_PRICE'
export const SEND_FUNDS_SET_PASSWORD = 'SEND_FUNDS_SET_PASSWORD'
export const SEND_FUNDS_SET_INVALID_FIELD = 'SEND_FUNDS_SET_INVALID_FIELD'
export const SEND_FUNDS_CLEAR = 'SEND_FUNDS_CLEAR'
export const SEND_FUNDS = 'SEND_FUNDS'

export function openSendFundsModal(accounts = [], accountId = '', onClose = null) {
  return {
    type: SEND_FUNDS_OPEN_MODAL,
    accounts,
    accountId,
    onClose,
  }
}

export function closeSendFundsModal() {
  return {
    type: SEND_FUNDS_CLOSE_MODAL,
  }
}

export function setSendFundsAddress(address = '') {
  return {
    type: SEND_FUNDS_SET_ADDRESS,
    address,
  }
}

export function setSendFundsAmount(amount = '') {
  return {
    type: SEND_FUNDS_SET_AMOUNT,
    amount,
  }
}

export function setSendFundsSymbol(symbol = '') {
  return {
    type: SEND_FUNDS_SET_SYMBOL,
    symbol,
  }
}

export function setSendFundsAccountId(accountId = '', accounts = []) {
  return {
    type: SEND_FUNDS_SET_ACCOUNT_ID,
    accountId,
    accounts,
  }
}

export function setSendFundsAccount(currentAccount = {}) {
  return {
    type: SEND_FUNDS_SET_ACCOUNT,
    currentAccount,
  }
}

export function setSendFundsGas(gas = '') {
  return {
    type: SEND_FUNDS_SET_GAS,
    gas,
  }
}

export function setSendFundsGasPrice(gasPrice = '') {
  return {
    type: SEND_FUNDS_SET_GAS_PRICE,
    gasPrice,
  }
}

export function setSendFundsPassword(password = '') {
  return {
    type: SEND_FUNDS_SET_PASSWORD,
    password,
  }
}

export function sendFunds(props = {}) {
  return {
    type: SEND_FUNDS,
    props,
  }
}

const ACTION_HANDLERS = {
  [SEND_FUNDS_OPEN_MODAL]: (state, action) => ({
    ...state,
    isOpen: true,
    onClose: action.onClose,
  }),
  [SEND_FUNDS_CLOSE_MODAL]: state => ({
    ...state,
    isOpen: false,
    invalidFields: {},
  }),
  [SEND_FUNDS_SET_ALERT]: (state, action) => ({
    ...state,
    alert: action.alert || '',
  }),
  [SEND_FUNDS_SET_ADDRESS]: (state, action) => ({
    ...state,
    address: action.address,
    invalidFields: {
      ...state.invalidFields,
      address: '',
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
  [SEND_FUNDS_SET_ACCOUNT]: (state, action) => ({
    ...state,
    currentAccount: action.currentAccount || initialState.currentAccount,
    invalidFields: {
      ...state.invalidFields,
      account: '',
    },
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
  [SEND_FUNDS_CLEAR]: state => ({
    ...state,
    currentAccount: initialState.currentAccount,
    invalidFields: initialState.invalidFields,
    address: initialState.address,
    amount: initialState.amount,
    gas: initialState.gas,
    gasPrice: initialState.gasPrice,
    password: initialState.password,
  }),
}

const initialState = {
  currentAccount: {
    id: '',
    address: '',
    accountName: '',
    addressIndex: 0,
  },
  invalidFields: {},
  alert: '',
  address: '',
  amount: '',
  symbol: 'ETH',
  gas: '',
  gasPrice: '',
  password: '',
  isOpen: false,
}

export default function sendFundsModal(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
