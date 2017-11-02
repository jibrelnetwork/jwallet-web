export const RECEIVE_FUNDS_OPEN_MODAL = 'RECEIVE_FUNDS_OPEN_MODAL'
export const RECEIVE_FUNDS_CLOSE_MODAL = 'RECEIVE_FUNDS_CLOSE_MODAL'
export const RECEIVE_FUNDS_SET_AMOUNT = 'RECEIVE_FUNDS_SET_AMOUNT'
export const RECEIVE_FUNDS_SET_SYMBOL = 'RECEIVE_FUNDS_SET_SYMBOL'
export const RECEIVE_FUNDS_SET_ACCOUNT = 'RECEIVE_FUNDS_SET_ACCOUNT'
export const RECEIVE_FUNDS_SET_ACCOUNT_ID = 'RECEIVE_FUNDS_SET_ACCOUNT_ID'

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

export function setReceiveFundsAccountId(
  accountId = '',
  accounts = [],
  addressesFromMnemonic = []
) {
  return {
    type: RECEIVE_FUNDS_SET_ACCOUNT_ID,
    accountId,
    accounts,
    addressesFromMnemonic,
  }
}

const ACTION_HANDLERS = {
  [RECEIVE_FUNDS_OPEN_MODAL]: (state, action) => ({
    ...state,
    isOpen: true,
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
    currentAccount: action.currentAccount || initialState.currentAccount,
  }),
}

const initialState = {
  currentAccount: {
    id: '',
    accountName: '',
    address: '',
  },
  amount: '',
  symbol: 'ETH',
  isOpen: false,
}

export default function receiveFundsModal(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
