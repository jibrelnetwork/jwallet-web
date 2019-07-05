// @flow strict

export const SHOW = '@@toasts/SHOW'
export const HIDE = '@@toasts/HIDE'

export function showToast(payload: ToastPayload) {
  return {
    type: SHOW,
    payload,
  }
}

export function hideToast() {
  return {
    type: HIDE,
  }
}

export type ToastsAction = ExtractReturn<typeof showToast> | ExtractReturn<typeof hideToast>

const initialState: ToastsState = {
  data: null,
}

function toasts(state: ToastsState = initialState, action: ToastsAction): ToastsState {
  switch (action.type) {
    case SHOW:
      return {
        ...state,
        data: action.payload,
      }

    case HIDE:
      return initialState

    default:
      return state
  }
}

export default toasts
