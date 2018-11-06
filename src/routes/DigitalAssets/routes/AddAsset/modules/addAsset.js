// @flow

export const OPEN_VIEW = '@@addAsset/OPEN_ADD_VIEW'
export const CLOSE_VIEW = '@@addAsset/CLOSE_VIEW'

export const SET_FIELD = '@@addAsset/SET_FIELD'
export const SET_INVALID_FIELD = '@@addAsset/SET_INVALID_FIELD'

export const START_ASSET_LOADING = '@@addAsset/START_ASSET_LOADING'
export const TERM_ASSET_LOADING = '@@addAsset/TERM_ASSET_LOADING'
export const SET_ASSET_IS_VALID = '@@addAsset/SET_ASSET_IS_VALID'

export const CLEAN: '@@addAsset/CLEAN' = '@@addAsset/CLEAN'

export function openView() {
  return {
    type: OPEN_VIEW,
  }
}

export function closeView() {
  return {
    type: CLOSE_VIEW,
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

export function terminateAssetLoading() {
  return {
    type: TERM_ASSET_LOADING,
  }
}

export function setIsAssetValid(isAssetValid: boolean) {
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
  ExtractReturn<typeof setIsAssetValid> |
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

function addAssetForm(
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

export default addAssetForm
