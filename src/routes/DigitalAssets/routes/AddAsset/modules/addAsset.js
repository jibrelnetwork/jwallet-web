// @flow

export const OPEN_VIEW = '@@addAsset/OPEN_VIEW'
export const CLOSE_VIEW = '@@addAsset/CLOSE_VIEW'

export const SET_FIELD = '@@addAsset/SET_FIELD'
export const SET_INVALID_FIELD = '@@addAsset/SET_INVALID_FIELD'

export const START_ASSET_LOADING = '@@addAsset/START_ASSET_LOADING'
export const TERM_ASSET_LOADING = '@@addAsset/TERM_ASSET_LOADING'
export const SET_ASSET_IS_VALID = '@@addAsset/SET_ASSET_IS_VALID'

export const SUBMIT_ASSET_FORM = '@@addAsset/SUBMIT_ASSET_FORM'

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

export function submitAssetForm() {
  return {
    type: SUBMIT_ASSET_FORM,
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

export function setField(fieldName: $Keys<EditAssetFormFields>, value: string) {
  return {
    type: SET_FIELD,
    payload: {
      fieldName,
      value,
    },
  }
}

export function setFieldError(fieldName: $Keys<EditAssetFormFields>, message: string) {
  return {
    type: SET_INVALID_FIELD,
    payload: {
      fieldName,
      message,
    },
  }
}

export function clearFieldError(fieldName: $Keys<EditAssetFormFields>) {
  return setFieldError(fieldName, '')
}

export function clean() {
  return {
    type: CLEAN,
  }
}

export type AddAssetActions = ExtractReturn<typeof setField> |
  ExtractReturn<typeof setFieldError> |
  ExtractReturn<typeof submitAssetForm> |
  ExtractReturn<typeof startAssetLoading> |
  ExtractReturn<typeof terminateAssetLoading> |
  ExtractReturn<typeof setIsAssetValid> |
  ExtractReturn<typeof clean>

const initialState: AddAssetState = {
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

function addAsset(
  state: AddAssetState = initialState,
  action: AddAssetActions,
): AddAssetState {
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

export default addAsset
