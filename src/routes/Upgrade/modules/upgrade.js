// @flow

export const SUBMIT_MNEMONIC_REQUEST = '@@upgrade/SUBMIT_MNEMONIC_REQUEST'
export const SUBMIT_MNEMONIC_ERROR = '@@upgrade/SUBMIT_MNEMONIC_ERROR'
export const SUBMIT_MNEMONIC_SUCCESS = '@@upgrade/SUBMIT_MNEMONIC_SUCCESS'

export const SUBMIT_PRIVATE_KEY_REQUEST = '@@upgrade/SUBMIT_PRIVATE_KEY_REQUEST'
export const SUBMIT_PRIVATE_KEY_ERROR = '@@upgrade/SUBMIT_PRIVATE_KEY_ERROR'
export const SUBMIT_PRIVATE_KEY_SUCCESS = '@@upgrade/SUBMIT_PRIVATE_KEY_SUCCESS'

export function submitMnemonicRequest(payload: UpgradeMnemonicFormFieldValues) {
  return {
    type: SUBMIT_MNEMONIC_REQUEST,
    payload,
  }
}

export function submitMnemonicError(err: Error) {
  return {
    type: SUBMIT_MNEMONIC_ERROR,
    payload: err,
    error: true,
  }
}

export function submitMnemonicSuccess() {
  return {
    type: SUBMIT_MNEMONIC_SUCCESS,
  }
}

export function submitPrivateKeyRequest(payload: UpgradePrivateKeyFormFieldValues) {
  return {
    type: SUBMIT_PRIVATE_KEY_REQUEST,
    payload,
  }
}

export function submitPrivateKeyError(err: Error) {
  return {
    type: SUBMIT_PRIVATE_KEY_ERROR,
    payload: err,
    error: true,
  }
}

export function submitPrivateKeySuccess() {
  return {
    type: SUBMIT_PRIVATE_KEY_SUCCESS,
  }
}

type UpgradeAction =
  ExtractReturn<typeof submitMnemonicRequest> |
  ExtractReturn<typeof submitMnemonicError> |
  ExtractReturn<typeof submitMnemonicSuccess> |
  ExtractReturn<typeof submitPrivateKeyRequest> |
  ExtractReturn<typeof submitPrivateKeyError> |
  ExtractReturn<typeof submitPrivateKeySuccess>

const initialState: UpgradeState = {
  isLoading: false,
  isInvalidPassword: false,
}

function upgrade(
  state: UpgradeState = initialState,
  action: UpgradeAction,
): UpgradeState {
  switch (action.type) {
    case SUBMIT_MNEMONIC_REQUEST:
    case SUBMIT_PRIVATE_KEY_REQUEST:
      return {
        ...state,
        isLoading: true,
        isInvalidPassword: false,
      }

    case SUBMIT_MNEMONIC_ERROR:
    case SUBMIT_PRIVATE_KEY_ERROR:
      return {
        ...state,
        isLoading: false,
        isInvalidPassword: true,
      }

    case SUBMIT_MNEMONIC_SUCCESS:
    case SUBMIT_PRIVATE_KEY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isInvalidPassword: false,
      }

    default:
      return state
  }
}

export default upgrade
