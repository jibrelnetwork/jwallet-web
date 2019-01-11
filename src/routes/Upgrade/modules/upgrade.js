// @flow

export const OPEN_VIEW = '@@upgrade/OPEN_VIEW'

export const SUBMIT_MNEMONIC_REQUEST = '@@upgrade/SUBMIT_MNEMONIC_REQUEST'
export const SUBMIT_PRIVATE_KEY_REQUEST = '@@upgrade/SUBMIT_PRIVATE_KEY_REQUEST'

export const SUBMIT_ERROR = '@@upgrade/SUBMIT_ERROR'
export const SUBMIT_SUCCESS = '@@upgrade/SUBMIT_SUCCESS'

export const CLEAN = '@@upgrade/CLEAN'

export function openView() {
  return {
    type: OPEN_VIEW,
  }
}

export function submitMnemonicRequest(payload: UpgradeMnemonicFormFieldValues) {
  return {
    type: SUBMIT_MNEMONIC_REQUEST,
    payload,
  }
}

export function submitPrivateKeyRequest(payload: UpgradePrivateKeyFormFieldValues) {
  return {
    type: SUBMIT_PRIVATE_KEY_REQUEST,
    payload,
  }
}

export function submitError(err: Error) {
  return {
    type: SUBMIT_ERROR,
    payload: err,
    error: true,
  }
}

export function submitSuccess(items: Wallets) {
  return {
    type: SUBMIT_SUCCESS,
    payload: {
      items,
    },
  }
}

export function clean() {
  return {
    type: CLEAN,
  }
}

type UpgradeAction =
  ExtractReturn<typeof openView> |
  ExtractReturn<typeof submitMnemonicRequest> |
  ExtractReturn<typeof submitPrivateKeyRequest> |
  ExtractReturn<typeof submitError> |
  ExtractReturn<typeof submitSuccess> |
  ExtractReturn<typeof clean>

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

    case SUBMIT_ERROR:
      return {
        ...state,
        isLoading: false,
        isInvalidPassword: true,
      }

    case SUBMIT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isInvalidPassword: false,
      }

    case CLEAN:
      return initialState

    default:
      return state
  }
}

export default upgrade
