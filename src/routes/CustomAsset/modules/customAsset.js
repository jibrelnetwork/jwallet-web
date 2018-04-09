// @flow

import { assoc, assocPath, compose } from 'ramda'

export const OPEN = '@@customAsset/OPEN'
export const CLOSE = '@@customAsset/CLOSE'
export const SET_ADDRESS = '@@customAsset/SET_ADDRESS'
export const SET_NAME = '@@customAsset/SET_NAME'
export const SET_SYMBOL = '@@customAsset/SET_SYMBOL'
export const SET_DECIMALS = '@@customAsset/SET_DECIMALS'
export const ADD = '@@customAsset/ADD'
export const ADD_SUCCESS = '@@customAsset/ADD_SUCCESS'
export const ADD_ERROR = '@@customAsset/ADD_ERROR'
export const SET_EDIT_ADDRESS = '@@customAsset/SET_EDIT_ADDRESS'
export const SET_EDIT_ADDRESS_SUCCESS = '@@customAsset/SET_EDIT_ADDRESS_SUCCESS'
export const SET_EDIT_ADDRESS_ERROR = '@@customAsset/SET_EDIT_ADDRESS_ERROR'
export const EDIT = '@@customAsset/EDIT'
export const EDIT_SUCCESS = '@@customAsset/EDIT_SUCCESS'
export const EDIT_ERROR = '@@customAsset/EDIT_ERROR'
export const REMOVE = '@@customAsset/REMOVE'
export const REMOVE_SUCCESS = '@@customAsset/REMOVE_SUCCESS'
export const REMOVE_ERROR = '@@customAsset/REMOVE_ERROR'
export const SET_INVALID_FIELD = '@@customAsset/SET_INVALID_FIELD'
export const CLEAN = '@@customAsset/CLEAN'

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

export const setEditAddress = (address: Address): {
  type: string,
  payload: {
    address: Address,
  },
} => ({
  type: SET_EDIT_ADDRESS,
  payload: {
    address,
  },
})

export const setEditAddressSuccess = (digitalAsset: DigitalAsset): {
  type: string,
  payload: {
    digitalAsset: DigitalAsset,
  },
} => ({
  type: SET_EDIT_ADDRESS_SUCCESS,
  payload: {
    digitalAsset,
  },
})

export const setEditAddressError = (err: Object): {
  type: string,
  payload: Object,
  error: boolean,
} => ({
  type: SET_EDIT_ADDRESS_ERROR,
  payload: err,
  error: true,
})

export const edit = (): { type: string } => ({
  type: EDIT,
})

export const editSuccess = (newDigitalAssets: DigitalAssets): {
  type: string,
  payload: {
    newDigitalAssets: DigitalAssets,
  },
} => ({
  type: EDIT_SUCCESS,
  payload: {
    newDigitalAssets,
  },
})

export const editError = (err: Object): {
  type: string,
  payload: Object,
  error: boolean,
} => ({
  type: EDIT_ERROR,
  payload: err,
  error: true,
})

export const remove = (): { type: string } => ({
  type: REMOVE,
})

export const removeSuccess = (newDigitalAssets: DigitalAssets): {
  type: string,
  payload: {
    newDigitalAssets: DigitalAssets,
  },
} => ({
  type: REMOVE_SUCCESS,
  payload: {
    newDigitalAssets,
  },
})

export const removeError = (err: Object): {
  type: string,
  payload: Object,
  error: boolean,
} => ({
  type: REMOVE_ERROR,
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

const initialState: CustomAssetData = {
  invalidFields: {},
  address: '',
  name: '',
  symbol: '',
  decimals: '',
}

const customAsset = (
  state: CustomAssetData = initialState,
  action: FSA,
): Object => {
  const { type, payload }: FSA = action

  switch (type) {
    case SET_ADDRESS:
    case SET_EDIT_ADDRESS: {
      return compose(
        assoc('address', payload.address),
        assocPath(['invalidFields', 'address'], ''),
      )(state)
    }

    case SET_EDIT_ADDRESS_SUCCESS: {
      return compose(
        assoc('name', payload.digitalAsset.name),
        assoc('symbol', payload.digitalAsset.symbol),
        assoc('decimals', payload.digitalAsset.decimals),
        assocPath(['invalidFields', 'name'], ''),
        assocPath(['invalidFields', 'symbol'], ''),
        assocPath(['invalidFields', 'decimals'], ''),
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

export default customAsset
