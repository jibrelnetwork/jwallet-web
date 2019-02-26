// @flow

export const OPEN_VIEW = '@@editAsset/OPEN_VIEW'

export const SET_FIELD = '@@editAsset/SET_FIELD'
export const SET_INVALID_FIELD = '@@editAsset/SET_INVALID_FIELD'

export const SUBMIT_ASSET_FORM = '@@editAsset/SUBMIT_ASSET_FORM'

export const CLEAN = '@@editAsset/CLEAN'

export function openView(assetAddress: Address) {
  return {
    type: OPEN_VIEW,
    payload: {
      assetAddress,
    },
  }
}

export function submitAssetForm() {
  return {
    type: SUBMIT_ASSET_FORM,
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

export type EditAssetAction = ExtractReturn<typeof setField> |
  ExtractReturn<typeof setFieldError> |
  ExtractReturn<typeof submitAssetForm> |
  ExtractReturn<typeof openView>

const initialState: EditAssetState = {
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
}

function editAsset(
  state: EditAssetState = initialState,
  action: EditAssetAction,
): EditAssetState {
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

    case CLEAN:
      return {
        ...initialState,
      }

    default: return state
  }
}

export default editAsset
