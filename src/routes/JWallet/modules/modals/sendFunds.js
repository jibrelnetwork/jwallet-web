export const SEND_FUNDS_OPEN_MODAL = 'SEND_FUNDS_OPEN_MODAL'
export const SEND_FUNDS_CLOSE_MODAL = 'SEND_FUNDS_CLOSE_MODAL'
export const SEND_FUNDS_SET_ADDRESS = 'SEND_FUNDS_SET_ADDRESS'
export const SEND_FUNDS_SET_AMOUNT = 'SEND_FUNDS_SET_AMOUNT'
export const SEND_FUNDS_SET_SYMBOL = 'SEND_FUNDS_SET_SYMBOL'
export const SEND_FUNDS_SET_ACCOUNT_ID = 'SEND_FUNDS_SET_ACCOUNT_ID'
export const SEND_FUNDS_SET_ACCOUNT = 'SEND_FUNDS_SET_ACCOUNT'
export const SEND_FUNDS_SET_GAS = 'SEND_FUNDS_SET_GAS'
export const SEND_FUNDS_SET_GAS_PRICE = 'SEND_FUNDS_SET_GAS_PRICE'
export const SEND_FUNDS_SET_GAS_SYMBOL = 'SEND_FUNDS_SET_GAS_SYMBOL'
export const SEND_FUNDS_SET_PASSWORD = 'SEND_FUNDS_SET_PASSWORD'
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

export function setSendFundsGasSymbol(gasSymbol = '') {
  return {
    type: SEND_FUNDS_SET_GAS_SYMBOL,
    gasSymbol,
  }
}

export function setSendFundsPassword(password = '') {
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
  [SEND_FUNDS_OPEN_MODAL]: (state, action) => ({
    ...state,
    isOpen: true,
    onClose: action.onClose,
  }),
  [SEND_FUNDS_CLOSE_MODAL]: state => ({
    ...state,
    isOpen: false,
  }),
  [SEND_FUNDS_SET_ADDRESS]: (state, action) => ({
    ...state,
    address: action.address,
  }),
  [SEND_FUNDS_SET_AMOUNT]: (state, action) => ({
    ...state,
    amount: action.amount,
  }),
  [SEND_FUNDS_SET_SYMBOL]: (state, action) => ({
    ...state,
    symbol: action.symbol,
  }),
  [SEND_FUNDS_SET_ACCOUNT]: (state, action) => ({
    ...state,
    currentAccount: action.currentAccount || initialState.currentAccount,
  }),
  [SEND_FUNDS_SET_GAS]: (state, action) => ({
    ...state,
    gas: action.gas,
  }),
  [SEND_FUNDS_SET_GAS_PRICE]: (state, action) => ({
    ...state,
    gasPrice: action.gasPrice,
  }),
  [SEND_FUNDS_SET_GAS_SYMBOL]: (state, action) => ({
    ...state,
    gasSymbol: action.gasSymbol,
  }),
  [SEND_FUNDS_SET_PASSWORD]: (state, action) => ({
    ...state,
    password: action.password,
  }),
}

const initialState = {
  currentAccount: {
    id: '',
    accountName: '',
  },
  invalidFields: {},
  address: '',
  amount: '',
  symbol: 'ETH',
  gas: '',
  gasPrice: '',
  gasSymbol: 'ETH',
  password: '',
  isOpen: false,
}

export default function sendFundsModal(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
