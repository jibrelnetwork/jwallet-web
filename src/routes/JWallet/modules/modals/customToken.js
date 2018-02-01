// @flow

export const CUSTOM_TOKEN_OPEN_MODAL = 'CUSTOM_TOKEN_OPEN_MODAL'
export const CUSTOM_TOKEN_CLOSE_MODAL = 'CUSTOM_TOKEN_CLOSE_MODAL'
export const CUSTOM_TOKEN_SET_ADDRESS = 'CUSTOM_TOKEN_SET_ADDRESS'
export const CUSTOM_TOKEN_SET_NAME = 'CUSTOM_TOKEN_SET_NAME'
export const CUSTOM_TOKEN_SET_SYMBOL = 'CUSTOM_TOKEN_SET_SYMBOL'
export const CUSTOM_TOKEN_SET_DECIMALS = 'CUSTOM_TOKEN_SET_DECIMALS'
export const CUSTOM_TOKEN_SET_INVALID_FIELD = 'CUSTOM_TOKEN_SET_INVALID_FIELD'
export const CUSTOM_TOKEN_CLEAR = 'CUSTOM_TOKEN_CLEAR'

export function openCustomTokenModal(onClose: any = null) {
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

export function setCustomTokenAddress(address: string = '') {
  return {
    type: CUSTOM_TOKEN_SET_ADDRESS,
    address,
  }
}

export function setCustomTokenName(name: string = '') {
  return {
    type: CUSTOM_TOKEN_SET_NAME,
    name,
  }
}

export function setCustomTokenSymbol(symbol: string = '') {
  return {
    type: CUSTOM_TOKEN_SET_SYMBOL,
    symbol,
  }
}

export function setCustomTokenDecimals(decimals: string = '') {
  return {
    type: CUSTOM_TOKEN_SET_DECIMALS,
    decimals,
  }
}

export function setCustomTokenInvalidField(fieldName: string, message: string = '') {
  return {
    type: CUSTOM_TOKEN_SET_INVALID_FIELD,
    fieldName,
    message,
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
    invalidFields: {
      ...state.invalidFields,
      address: '',
    },
  }),
  [CUSTOM_TOKEN_SET_NAME]: (state, action) => ({
    ...state,
    name: action.name,
    invalidFields: {
      ...state.invalidFields,
      name: '',
    },
  }),
  [CUSTOM_TOKEN_SET_SYMBOL]: (state, action) => ({
    ...state,
    symbol: action.symbol,
    invalidFields: {
      ...state.invalidFields,
      symbol: '',
    },
  }),
  [CUSTOM_TOKEN_SET_DECIMALS]: (state, action) => ({
    ...state,
    decimals: action.decimals,
    invalidFields: {
      ...state.invalidFields,
      decimals: '',
    },
  }),
  [CUSTOM_TOKEN_SET_INVALID_FIELD]: (state, action) => ({
    ...state,
    invalidFields: {
      ...state.invalidFields,
      [action.fieldName]: action.message,
    },
  }),
  [CUSTOM_TOKEN_CLEAR]: () => initialState,
}

const initialState = {
  invalidFields: {},
  address: '',
  name: '',
  symbol: '',
  decimals: '',
  isOpen: false,
  onClose: null,
}

export default function customTokenModal(state: any = initialState, action: any) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
