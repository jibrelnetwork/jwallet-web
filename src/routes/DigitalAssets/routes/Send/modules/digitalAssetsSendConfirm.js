// @flow

export const OPEN_VIEW = '@@digitalAssetsSendConfirm/OPEN_VIEW'
export const SET_PASSWORD_ERROR = '@@digitalAssetsSendConfirm/SET_PASSWORD_ERROR'
export const CLEAN = '@@digitalAssetsSendConfirm/CLEAN'

export function openView() {
  return {
    type: OPEN_VIEW,
  }
}

export function setPasswordError(message: string, isLoading: boolean) {
  return {
    type: SET_PASSWORD_ERROR,
    payload: {
      message,
      isLoading,
    },
  }
}

export function clean() {
  return {
    type: CLEAN,
  }
}

export type DigitalAssetSendConfirmAction =
  ExtractReturn<typeof setPasswordError> |
  ExtractReturn<typeof clean>

const initialState: DigitalAssetSendConfirmState = {
  passwordError: '',
  isPasswordLoading: false,
}

function digitalAssetsSendConfirm(
  state: DigitalAssetSendConfirmState = initialState,
  action: DigitalAssetSendConfirmAction,
): DigitalAssetSendConfirmState {
  switch (action.type) {
    case SET_PASSWORD_ERROR: {
      const { message, isLoading } = action.payload

      return {
        ...state,
        passwordError: message,
        isPasswordLoading: isLoading,
      }
    }

    case CLEAN:
      return initialState

    default: return state
  }
}

export default digitalAssetsSendConfirm
