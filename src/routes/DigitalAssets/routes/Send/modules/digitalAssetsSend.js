// @flow

export const OPEN_VIEW = '@@digitalAssetsSend/OPEN_VIEW'
export const CLOSE_VIEW = '@@digitalAssetsSend/CLOSE_VIEW'

export const SET_FIELD = '@@digitalAssetsSend/SET_FIELD'
export const SET_INVALID_FIELD = '@@digitalAssetsSend/SET_INVALID_FIELD'
export const SUBMIT_SEND_FORM = '@@digitalAssetsSend/SUBMIT_SEND_FORM'

export const SET_IS_PROCESSING = '@@digitalAssetsSend/SET_IS_PROCESSING'
export const SUBMIT_PASSWORD_FORM = '@@digitalAssetsSend/SUBMIT_PASSWORD_FORM'

export const SET_STEP = '@@digitalAssetsSend/SET_STEP'

export const CLEAN = '@@digitalAssetsSend/CLEAN'

export const STEP_ONE = '1'
export const STEP_TWO = '2'

export type OpenViewParams = {|
  +to?: string,
  +asset?: string,
  +txhash?: string,
|}

export function openView(step: DigitalAssetSendStep, params?: OpenViewParams) {
  return {
    type: OPEN_VIEW,
    payload: {
      step,
      params,
    },
  }
}

export function closeView() {
  return {
    type: CLOSE_VIEW,
  }
}

export function setStep(step: DigitalAssetSendStep) {
  return {
    type: SET_STEP,
    payload: {
      step,
    },
  }
}

/**
 * STEP ONE
 */

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

export function submitSendForm() {
  return {
    type: SUBMIT_SEND_FORM,
  }
}

/**
 * STEP TWO
 */

export function setIsProcessing(isProcessing: boolean) {
  return {
    type: SET_IS_PROCESSING,
    payload: {
      isProcessing,
    },
  }
}

export function submitPasswordForm() {
  return {
    type: SUBMIT_PASSWORD_FORM,
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
  ExtractReturn<typeof setStep> |
  ExtractReturn<typeof setField> |
  ExtractReturn<typeof setFieldError> |
  ExtractReturn<typeof submitSendForm> |
  ExtractReturn<typeof setIsProcessing> |
  ExtractReturn<typeof submitPasswordForm> |
  ExtractReturn<typeof clean>

const initialState: DigitalAssetSendState = {
  formFields: {
    ownerAddress: '',
    recepient: '',
    assetAddress: '',
    amount: '',
    amountFiat: '',
    priority: '',
    comment: '',
    nonce: '',
    password: '',
  },
  invalidFields: {
    ownerAddress: '',
    recepient: '',
    assetAddress: '',
    amount: '',
    amountFiat: '',
    priority: '',
    comment: '',
    nonce: '',
    password: '',
  },
  step: STEP_ONE,
  isProcessing: false,
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

    case SET_STEP: {
      const { step } = action.payload

      return {
        ...state,
        step,
      }
    }

    case SET_IS_PROCESSING: {
      const { isProcessing } = action.payload

      return {
        ...state,
        isProcessing,
      }
    }

    case CLEAN:
      return initialState

    default:
      return state
  }
}

export default digitalAssetsSend
