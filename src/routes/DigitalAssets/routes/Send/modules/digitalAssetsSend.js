// @flow

export const OPEN_VIEW = '@@digitalAssetsSend/OPEN_VIEW'
export const CLOSE_VIEW = '@@digitalAssetsSend/CLOSE_VIEW'

export const SET_FIELD = '@@digitalAssetsSend/SET_FIELD'
export const SET_INVALID_FIELD = '@@digitalAssetsSend/SET_INVALID_FIELD'
export const SEND_FORM_SUBMIT = '@@digitalAssetsSend/SEND_FORM_SUBMIT'

export const CLEAN = '@@digitalAssetsSend/CLEAN'

export type OpenViewParams = {|
  +to?: string,
  +asset?: string,
  +txhash?: string,
|}

export function openView(params: OpenViewParams) {
  return {
    type: OPEN_VIEW,
    payload: params,
  }
}

export function closeView() {
  return {
    type: CLOSE_VIEW,
  }
}

export function setField(fieldName: $Keys<DigitalAssetSendFormFields>, value: string) {
  return {
    type: SET_FIELD,
    payload: {
      fieldName,
      value,
    },
  }
}

export function setFieldError(fieldName: $Keys<DigitalAssetSendFormFields>, message: string) {
  return {
    type: SET_INVALID_FIELD,
    payload: {
      fieldName,
      message,
    },
  }
}

export function clearFieldError(fieldName: $Keys<DigitalAssetSendFormFields>) {
  return setFieldError(fieldName, '')
}

export function sendFormSubmit() {
  return {
    type: SEND_FORM_SUBMIT,
  }
}

export function clean() {
  return {
    type: CLEAN,
  }
}

export type DigitalAssetSendAction =
  ExtractReturn<typeof openView> |
  ExtractReturn<typeof closeView> |
  ExtractReturn<typeof setField> |
  ExtractReturn<typeof setFieldError> |
  ExtractReturn<typeof clean>

const initialState: DigitalAssetSendState = {
  formFields: {
    ownerAddress: '',
    recepientAddress: '',
    assetAddress: '',
    value: '',
    valueFiat: '',
    priority: '',
    comment: '',
    nonce: '',
  },
  invalidFields: {
    ownerAddress: '',
    recepientAddress: '',
    assetAddress: '',
    value: '',
    valueFiat: '',
    priority: '',
    comment: '',
    nonce: '',
  },
}

function digitalAssetsSend(
  state: DigitalAssetSendState = initialState,
  action: DigitalAssetSendAction,
): DigitalAssetSendState {
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
      return initialState

    default: return state
  }
}

export default digitalAssetsSend
