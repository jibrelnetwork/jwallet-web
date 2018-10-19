// @flow

/* eslint-disable max-len */
export const OPEN_ADD_VIEW: '@@customAsset/OPEN_ADD_VIEW' = '@@customAsset/OPEN_ADD_VIEW'
export const OPEN_EDIT_VIEW: '@@customAsset/OPEN_EDIT_VIEW' = '@@customAsset/OPEN_EDIT_VIEW'
export const CLOSE_VIEW: '@@customAsset/CLOSE_VIEW' = '@@customAsset/CLOSE_VIEW'

// -> to be moved to DigitalAssets
export const ADD: '@@customAsset/ADD' = '@@customAsset/ADD'
export const ADD_SUCCESS: '@@customAsset/ADD_SUCCESS' = '@@customAsset/ADD_SUCCESS'
export const ADD_ERROR: '@@customAsset/ADD_ERROR' = '@@customAsset/ADD_ERROR'
export const SET_ADDRESS_ERROR: '@@customAsset/SET_ADDRESS_ERROR' = '@@customAsset/SET_ADDRESS_ERROR'
export const EDIT: '@@customAsset/EDIT' = '@@customAsset/EDIT'
export const EDIT_SUCCESS: '@@customAsset/EDIT_SUCCESS' = '@@customAsset/EDIT_SUCCESS'
export const EDIT_ERROR: '@@customAsset/EDIT_ERROR' = '@@customAsset/EDIT_ERROR'
export const REMOVE: '@@customAsset/REMOVE' = '@@customAsset/REMOVE'
export const REMOVE_SUCCESS: '@@customAsset/REMOVE_SUCCESS' = '@@customAsset/REMOVE_SUCCESS'
export const REMOVE_ERROR: '@@customAsset/REMOVE_ERROR' = '@@customAsset/REMOVE_ERROR'
export const CLEAN: '@@customAsset/CLEAN' = '@@customAsset/CLEAN'
/* eslint-enable max-len */

export function openCustomAssetAdd() {
  return {
    type: OPEN_ADD_VIEW,
  }
}

export function openCustomAssetEdit(assetAddress: Address) {
  return {
    type: OPEN_EDIT_VIEW,
    payload: {
      address: assetAddress,
    },
  }
}

export function close() {
  return {
    type: CLOSE_VIEW,
  }
}

/**
 * Add asset events
 */

export function add() {
  return {
    type: ADD,
  }
}

export function addSuccess(newDigitalAssets: DigitalAssets) {
  return {
    type: ADD_SUCCESS,
    payload: {
      newDigitalAssets,
    },
  }
}

export function addError(err: Object) {
  return {
    type: ADD_ERROR,
    payload: err,
    error: true,
  }
}

/**
 * Edit asset events
 */

export function edit() {
  return {
    type: EDIT,
  }
}

export function editSuccess(newDigitalAssets: DigitalAssets) {
  return {
    type: EDIT_SUCCESS,
    payload: {
      newDigitalAssets,
    },
  }
}

export function editError(err: Object) {
  return {
    type: EDIT_ERROR,
    payload: err,
    error: true,
  }
}

/**
 * Edit asset events
 */

export function remove() {
  return {
    type: REMOVE,
  }
}

export function removeSuccess(newDigitalAssets: DigitalAssets) {
  return {
    type: REMOVE_SUCCESS,
    payload: {
      newDigitalAssets,
    },
  }
}

export function removeError(err: Object) {
  return {
    type: REMOVE_ERROR,
    payload: err,
    error: true,
  }
}

/**
 * Actions, that can affect application state
 */

/* eslint-disable max-len */
export const ADD_ASSET: '@@customAsset/ADD_ASSET' = '@@customAsset/ADD_ASSET'

export const SET_FIELD: '@@customAsset/SET_FIELD' = '@@customAsset/SET_FIELD'
export const SET_INVALID_FIELD: '@@customAsset/SET_INVALID_FIELD' = '@@customAsset/SET_INVALID_FIELD'

export const START_ASSET_LOADING: '@@customAsset/START_ASSET_LOADING' = '@@customAsset/START_ASSET_LOADING'
export const TERM_ASSET_LOADING: '@@customAsset/TERM_ASSET_LOADING' = '@@customAsset/TERM_ASSET_LOADING'
export const SET_ASSET_IS_VALID: '@@customAsset/SET_ASSET_IS_VALID' = '@@customAsset/SET_ASSET_IS_VALID'
/* eslint-enable max-len */

// -> to be moved to DigitalAssets module
export function addAsset() {
  return {
    type: ADD_ASSET,
  }
}

export function startAssetLoading(contractAddress: Address) {
  return {
    type: START_ASSET_LOADING,
    payload: {
      contractAddress,
    },
  }
}

/**
 * Not used now, to be removed
 */
export function terminateAssetLoading() {
  return {
    type: TERM_ASSET_LOADING,
  }
}

export function setAssetIsValid(isAssetValid: boolean) {
  return {
    type: SET_ASSET_IS_VALID,
    payload: {
      isAssetValid,
    },
  }
}

export function setField(fieldName: $Keys<CustomAssetFormFields>, value: string) {
  return {
    type: SET_FIELD,
    payload: {
      fieldName,
      value,
    },
  }
}

export function setFieldError(fieldName: $Keys<CustomAssetFormFields>, message: string) {
  return {
    type: SET_INVALID_FIELD,
    payload: {
      fieldName,
      message,
    },
  }
}

export function clearFieldError(fieldName: $Keys<CustomAssetFormFields>) {
  return setFieldError(fieldName, '')
}

export function clean() {
  return {
    type: CLEAN,
  }
}

type CustomAssetActions = ExtractReturn<typeof setField> |
  ExtractReturn<typeof setFieldError> |
  ExtractReturn<typeof startAssetLoading> |
  ExtractReturn<typeof terminateAssetLoading> |
  ExtractReturn<typeof setAssetIsValid> |
  ExtractReturn<typeof clean>

const initialState: CustomAssetState = {
  invalidFields: {
    address: '',
    name: '',
    symbol: '',
    decimals: '',
  },
  formFields: {
    address: '',
    name: '',
    symbol: '',
    decimals: '',
  },

  isAssetValid: false,
  isAssetLoaded: false,
  isAssetLoading: false,
  requestedAddress: '',
}

function customAsset(
  state: CustomAssetState = initialState,
  action: CustomAssetActions,
): CustomAssetState {
  switch (action.type) {
    case SET_FIELD: {
      const { fieldName, value } = action.payload

      return {
        ...state,
        invalidFields: {
          ...state.invalidFields,
          [fieldName]: '',
        },
        formFields: {
          ...state.formFields,
          [fieldName]: value,
        },
      }
    }

    case SET_INVALID_FIELD: {
      const { fieldName, message } = action.payload

      return {
        ...state,
        invalidFields: {
          ...state.invalidFields,
          [fieldName]: message,
        },
      }
    }

    case START_ASSET_LOADING: {
      const { contractAddress } = action.payload

      return {
        ...state,
        isAssetValid: false,
        isAssetLoaded: false,
        isAssetLoading: true,
        requestedAddress: contractAddress,
      }
    }

    /**
     * Not used now, to be removed
    */
    case TERM_ASSET_LOADING: {
      return {
        ...state,
        isAssetValid: false,
        isAssetLoaded: false,
        isAssetLoading: false,
        requestedAddress: '',
      }
    }

    case SET_ASSET_IS_VALID: {
      const { isAssetValid } = action.payload

      return {
        ...state,
        isAssetValid,
        isAssetLoaded: true,
        isAssetLoading: false,
        requestedAddress: '',
      }
    }

    case CLEAN:
      return initialState

    default: return state
  }
}

export default customAsset
