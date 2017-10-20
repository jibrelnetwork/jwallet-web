export const CUSTOM_TOKEN_OPEN_MODAL = 'CUSTOM_TOKEN_OPEN_MODAL'
export const CUSTOM_TOKEN_CLOSE_MODAL = 'CUSTOM_TOKEN_CLOSE_MODAL'
export const CUSTOM_TOKEN_SET_ADDRESS = 'CUSTOM_TOKEN_SET_ADDRESS'
export const CUSTOM_TOKEN_SET_NAME = 'CUSTOM_TOKEN_SET_NAME'
export const CUSTOM_TOKEN_SET_SYMBOL = 'CUSTOM_TOKEN_SET_SYMBOL'
export const CUSTOM_TOKEN_SET_DECIMALS = 'CUSTOM_TOKEN_SET_DECIMALS'

export function openCustomTokenModal(onClose = null) {
  return {
    type: CUSTOM_TOKEN_OPEN_MODAL,
    onClose,
  }
}

export function closeCustomTokenModal() {
  return {
    type: CUSTOM_TOKEN_CLOSE_MODAL,
  }
}

export function setCustomTokenAddress(address = '') {
  return {
    type: CUSTOM_TOKEN_SET_ADDRESS,
    address,
  }
}

export function setCustomTokenName(name = '') {
  return {
    type: CUSTOM_TOKEN_SET_NAME,
    name,
  }
}

export function setCustomTokenSymbol(symbol = '') {
  return {
    type: CUSTOM_TOKEN_SET_SYMBOL,
    symbol,
  }
}

export function setCustomTokenDecimals(decimals = '') {
  return {
    type: CUSTOM_TOKEN_SET_DECIMALS,
    decimals,
  }
}

const ACTION_HANDLERS = {
  [CUSTOM_TOKEN_OPEN_MODAL]: (state, action) => ({
    ...state,
    isOpen: true,
    onClose: action.onClose,
  }),
  [CUSTOM_TOKEN_CLOSE_MODAL]: state => ({
    ...state,
    isOpen: false,
  }),
  [CUSTOM_TOKEN_SET_ADDRESS]: (state, action) => ({
    ...state,
    address: action.address,
  }),
  [CUSTOM_TOKEN_SET_NAME]: (state, action) => ({
    ...state,
    name: action.name,
  }),
  [CUSTOM_TOKEN_SET_SYMBOL]: (state, action) => ({
    ...state,
    symbol: action.symbol,
  }),
  [CUSTOM_TOKEN_SET_DECIMALS]: (state, action) => ({
    ...state,
    decimals: action.decimals,
  }),
}

const initialState = {
  disabledFields: [],
  validFields: [],
  invalidFields: [],
  alert: '',
  address: '',
  name: '',
  symbol: '',
  decimals: '',
  isOpen: false,
  onClose: null,
}

export default function customTokenModal(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
