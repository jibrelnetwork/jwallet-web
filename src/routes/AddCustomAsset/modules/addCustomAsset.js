// @flow

import { assoc, assocPath, compose } from 'ramda'

export const OPEN = '@@addCustomAsset/OPEN'
export const CLOSE = '@@addCustomAsset/CLOSE'
export const SET_ADDRESS = '@@addCustomAsset/SET_ADDRESS'
export const SET_NAME = '@@addCustomAsset/SET_NAME'
export const SET_SYMBOL = '@@addCustomAsset/SET_SYMBOL'
export const SET_DECIMALS = '@@addCustomAsset/SET_DECIMALS'
export const ADD = '@@addCustomAsset/ADD'
export const ADD_SUCCESS = '@@addCustomAsset/ADD_SUCCESS'
export const ADD_ERROR = '@@addCustomAsset/ADD_ERROR'
export const SET_INVALID_FIELD = '@@addCustomAsset/SET_INVALID_FIELD'
export const CLEAN = '@@addCustomAsset/CLEAN'

export const open = (): { type: string } => ({
  type: OPEN,
})

export const close = (): { type: string } => ({
  type: CLOSE,
})

export const setAddress = (address: Address): {
  type: string,
  payload: {
    address: Address,
  },
} => ({
  type: SET_ADDRESS,
  payload: {
    address,
  },
})

export const setName = (name: string): {
  type: string,
  payload: {
    name: string,
  },
} => ({
  type: SET_NAME,
  payload: {
    name,
  },
})

export const setSymbol = (symbol: string): {
  type: string,
  payload: {
    symbol: string,
  },
} => ({
  type: SET_SYMBOL,
  payload: {
    symbol,
  },
})

export const setDecimals = (decimals: string): {
  type: string,
  payload: {
    decimals: string,
  },
} => ({
  type: SET_DECIMALS,
  payload: {
    decimals,
  },
})

export const add = (): { type: string } => ({
  type: ADD,
})

export const addSuccess = (newDigitalAssets: DigitalAssets): {
  type: string,
  payload: {
    newDigitalAssets: DigitalAssets,
  },
} => ({
  type: ADD_SUCCESS,
  payload: {
    newDigitalAssets,
  },
})

export const addError = (err: Object): {
  type: string,
  payload: Object,
  error: boolean,
} => ({
  type: ADD_ERROR,
  payload: err,
  error: true,
})

export const setInvalidField = (fieldName: string, message: string): {
  type: string,
  payload: {
    fieldName: string,
    message: string,
  },
} => ({
  type: SET_INVALID_FIELD,
  payload: {
    fieldName,
    message,
  },
})

export const clean = (): { type: string } => ({
  type: CLEAN,
})

const initialState: AddCustomAssetData = {
  invalidFields: {},
  address: '',
  name: '',
  symbol: '',
  decimals: '',
}

const addCustomAsset = (
  state: AddCustomAssetData = initialState,
  action: FSA,
): Object => {
  const { type, payload }: FSA = action

  switch (type) {
    case SET_ADDRESS: {
      return compose(
        assoc('address', payload.address),
        assocPath(['invalidFields', 'address'], ''),
      )(state)
    }

    case SET_NAME: {
      return compose(
        assoc('name', payload.name),
        assocPath(['invalidFields', 'name'], ''),
      )(state)
    }

    case SET_SYMBOL: {
      return compose(
        assoc('symbol', payload.symbol),
        assocPath(['invalidFields', 'symbol'], ''),
      )(state)
    }

    case SET_DECIMALS: {
      return compose(
        assoc('decimals', payload.decimals),
        assocPath(['invalidFields', 'decimals'], ''),
      )(state)
    }

    case SET_INVALID_FIELD: {
      return assocPath(['invalidFields', payload.fieldName], payload.message)(state)
    }

    case CLEAN: return initialState

    default: return state
  }
}

export default addCustomAsset
