export const CONVERT_FUNDS_OPEN_MODAL = 'CONVERT_FUNDS_OPEN_MODAL'
export const CONVERT_FUNDS_CLOSE_MODAL = 'CONVERT_FUNDS_CLOSE_MODAL'
export const CONVERT_FUNDS_SET_FROM_AMOUNT = 'CONVERT_FUNDS_SET_FROM_AMOUNT'
export const CONVERT_FUNDS_SET_FROM_SYMBOL = 'CONVERT_FUNDS_SET_FROM_SYMBOL'
export const CONVERT_FUNDS_SET_FROM_ACCOUNT = 'CONVERT_FUNDS_SET_FROM_ACCOUNT'
export const CONVERT_FUNDS_SET_FROM_ACCOUNT_ID = 'CONVERT_FUNDS_SET_FROM_ACCOUNT_ID'
export const CONVERT_FUNDS_SET_TO_AMOUNT = 'CONVERT_FUNDS_SET_TO_AMOUNT'
export const CONVERT_FUNDS_SET_TO_SYMBOL = 'CONVERT_FUNDS_SET_TO_SYMBOL'
export const CONVERT_FUNDS_SET_TO_ACCOUNT = 'CONVERT_FUNDS_SET_TO_ACCOUNT'
export const CONVERT_FUNDS_SET_TO_ACCOUNT_ID = 'CONVERT_FUNDS_SET_TO_ACCOUNT_ID'
export const CONVERT_FUNDS = 'CONVERT_FUNDS'

export function openConvertFundsModal(accountId = '', onClose = null) {
  return {
    type: CONVERT_FUNDS_OPEN_MODAL,
    accountId,
    onClose,
  }
}

export function closeConvertFundsModal() {
  return {
    type: CONVERT_FUNDS_CLOSE_MODAL,
  }
}

export function setConvertFundsFromAmount(amount = '') {
  return {
    type: CONVERT_FUNDS_SET_FROM_AMOUNT,
    amount,
  }
}

export function setConvertFundsFromSymbol(symbol = '') {
  return {
    type: CONVERT_FUNDS_SET_FROM_SYMBOL,
    symbol,
  }
}

export function setConvertFundsFromAccountId(accountId = '', accounts = []) {
  return {
    type: CONVERT_FUNDS_SET_FROM_ACCOUNT_ID,
    accountId,
    accounts,
  }
}

export function setConvertFundsToAmount(amount = '') {
  return {
    type: CONVERT_FUNDS_SET_TO_AMOUNT,
    amount,
  }
}

export function setConvertFundsToSymbol(symbol = '') {
  return {
    type: CONVERT_FUNDS_SET_TO_SYMBOL,
    symbol,
  }
}

export function setConvertFundsToAccountId(accountId = '', accounts = []) {
  return {
    type: CONVERT_FUNDS_SET_TO_ACCOUNT_ID,
    accountId,
    accounts,
  }
}

export function convertFunds() {
  return {
    type: CONVERT_FUNDS,
  }
}

const ACTION_HANDLERS = {
  [CONVERT_FUNDS_OPEN_MODAL]: (state, action) => ({
    ...state,
    isOpen: true,
    onClose: action.onClose,
  }),
  [CONVERT_FUNDS_CLOSE_MODAL]: state => ({
    ...state,
    isOpen: false,
  }),
  [CONVERT_FUNDS_SET_FROM_AMOUNT]: (state, action) => ({
    ...state,
    from: {
      ...state.from,
      amount: action.amount,
    },
  }),
  [CONVERT_FUNDS_SET_FROM_SYMBOL]: (state, action) => ({
    ...state,
    from: {
      ...state.from,
      symbol: action.symbol,
    },
  }),
  [CONVERT_FUNDS_SET_FROM_ACCOUNT]: (state, action) => ({
    ...state,
    from: {
      ...state.from,
      account: action.currentAccount || initialState.from.account,
    },
  }),
  [CONVERT_FUNDS_SET_TO_AMOUNT]: (state, action) => ({
    ...state,
    to: {
      ...state.to,
      amount: action.amount,
    },
  }),
  [CONVERT_FUNDS_SET_TO_SYMBOL]: (state, action) => ({
    ...state,
    to: {
      ...state.to,
      symbol: action.symbol,
    },
  }),
  [CONVERT_FUNDS_SET_TO_ACCOUNT]: (state, action) => ({
    ...state,
    to: {
      ...state.to,
      account: action.currentAccount || initialState.to.account,
    },
  }),
}

const initialState = {
  from: {
    amount: '',
    symbol: 'ETH',
    account: {
      id: '',
      accountName: '',
    },
  },
  to: {
    amount: '',
    symbol: 'ETH',
    account: {
      id: '',
      accountName: '',
    },
  },
  invalidFields: {},
  isOpen: false,
  onClose: null,
}

export default function convertFundsModal(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
