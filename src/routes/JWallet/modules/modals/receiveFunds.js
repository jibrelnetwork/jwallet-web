export const RECEIVE_FUNDS_OPEN_MODAL = 'RECEIVE_FUNDS_OPEN_MODAL'
export const RECEIVE_FUNDS_CLOSE_MODAL = 'RECEIVE_FUNDS_CLOSE_MODAL'
export const RECEIVE_FUNDS_SET_AMOUNT = 'RECEIVE_FUNDS_SET_AMOUNT'
export const RECEIVE_FUNDS_SET_SYMBOL = 'RECEIVE_FUNDS_SET_SYMBOL'
export const RECEIVE_FUNDS_SET_ACCOUNT = 'RECEIVE_FUNDS_SET_ACCOUNT'
export const RECEIVE_FUNDS_SET_ADDRESS = 'RECEIVE_FUNDS_SET_ADDRESS'
export const GENERATE_QR_CODE = 'GENERATE_QR_CODE'
export const RECEIVE_FUNDS = 'RECEIVE_FUNDS'

export function openReceiveFundsModal(accountId = '', onClose = null) {
  return {
    type: RECEIVE_FUNDS_OPEN_MODAL,
    accountId,
    onClose,
  }
}

export function closeReceiveFundsModal() {
  return {
    type: RECEIVE_FUNDS_CLOSE_MODAL,
  }
}

export function setReceiveFundsAmount(amount = '') {
  return {
    type: RECEIVE_FUNDS_SET_AMOUNT,
    amount,
  }
}

export function setReceiveFundsSymbol(symbol = '') {
  return {
    type: RECEIVE_FUNDS_SET_SYMBOL,
    symbol,
  }
}

export function setReceiveFundsAccount(accountId = '') {
  return {
    type: RECEIVE_FUNDS_SET_ACCOUNT,
    accountId,
  }
}

export function setReceiveFundsAddress(address = '') {
  return {
    type: RECEIVE_FUNDS_SET_ADDRESS,
    address,
  }
}

const ACTION_HANDLERS = {
  [RECEIVE_FUNDS_OPEN_MODAL]: (state, action) => ({
    ...state,
    isOpen: true,
    accountId: action.accountId,
    onClose: action.onClose,
  }),
  [RECEIVE_FUNDS_CLOSE_MODAL]: state => ({
    ...state,
    isOpen: false,
  }),
  [RECEIVE_FUNDS_SET_AMOUNT]: (state, action) => ({
    ...state,
    amount: action.amount,
  }),
  [RECEIVE_FUNDS_SET_SYMBOL]: (state, action) => ({
    ...state,
    symbol: action.symbol,
  }),
  [RECEIVE_FUNDS_SET_ACCOUNT]: (state, action) => ({
    ...state,
    accountId: action.accountId,
  }),
  [RECEIVE_FUNDS_SET_ADDRESS]: (state, action) => ({
    ...state,
    address: action.address,
  }),
  [RECEIVE_FUNDS]: state => ({
    ...state,
  }),
}

const initialState = {
  disabledFields: [],
  validFields: [],
  invalidFields: [],
  alert: '',
  amount: '0',
  symbol: 'ETH',
  accountId: '',
  address: '',
  isOpen: false,
}

export default function receiveFundsModal(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
