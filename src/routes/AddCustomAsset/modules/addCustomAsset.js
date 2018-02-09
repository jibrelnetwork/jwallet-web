// @flow

export const SET_ADDRESS = '@@addCustomAsset/SET_ADDRESS'
export const SET_NAME = '@@addCustomAsset/SET_NAME'
export const SET_SYMBOL = '@@addCustomAsset/SET_SYMBOL'
export const SET_DECIMALS = '@@addCustomAsset/SET_DECIMALS'
export const SET_INVALID_FIELD = '@@addCustomAsset/SET_INVALID_FIELD'
export const CLEAN = '@@addCustomAsset/CLEAN'
export const ADD = '@@addCustomAsset/ADD'

export function setAddress(address: Address): { type: string, address: Address } {
  return {
    type: SET_ADDRESS,
    address,
  }
}

export function setName(name: string): { type: string, name: string } {
  return {
    type: SET_NAME,
    name,
  }
}

export function setSymbol(symbol: string): { type: string, symbol: string } {
  return {
    type: SET_SYMBOL,
    symbol,
  }
}

export function setDecimals(decimals: string): { type: string, decimals: string } {
  return {
    type: SET_DECIMALS,
    decimals,
  }
}

export function setInvalidField(fieldName: string, message: string): {
  type: string,
  fieldName: string,
  message: string,
} {
  return {
    type: SET_INVALID_FIELD,
    fieldName,
    message,
  }
}

export function add(): { type: string } {
  return {
    type: ADD,
  }
}

const ACTION_HANDLERS = {
  [SET_ADDRESS]: (state, action) => ({
    ...state,
    address: action.address,
    invalidFields: {
      ...state.invalidFields,
      address: '',
    },
  }),
  [SET_NAME]: (state, action) => ({
    ...state,
    name: action.name,
    invalidFields: {
      ...state.invalidFields,
      name: '',
    },
  }),
  [SET_SYMBOL]: (state, action) => ({
    ...state,
    symbol: action.symbol,
    invalidFields: {
      ...state.invalidFields,
      symbol: '',
    },
  }),
  [SET_DECIMALS]: (state, action) => ({
    ...state,
    decimals: action.decimals,
    invalidFields: {
      ...state.invalidFields,
      decimals: '',
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
  address: '',
  name: '',
  symbol: '',
  decimals: '',
}

export default function addCustomAsset(state: any = initialState, action: any) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
