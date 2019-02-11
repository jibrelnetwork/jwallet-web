// @flow

export type UpgradeRequestPayload = {|
  +items: Wallets,
  +internalKey: ?EncryptedData,
  +mnemonicOptions: MnemonicOptions,
  +passwordOptions: ?PasswordOptions,
  +data: string,
  +password: string,
  +walletId: WalletId,
|}

export const OPEN_VIEW = '@@upgrade/OPEN_VIEW'

export const SUBMIT_MNEMONIC_REQUEST = '@@upgrade/SUBMIT_MNEMONIC_REQUEST'
export const SUBMIT_PRIVATE_KEY_REQUEST = '@@upgrade/SUBMIT_PRIVATE_KEY_REQUEST'

export const UPGRADE_ERROR = '@@upgrade/UPGRADE_ERROR'
export const UPGRADE_REQUEST = '@@upgrade/UPGRADE_REQUEST'
export const UPGRADE_SUCCESS = '@@upgrade/UPGRADE_SUCCESS'

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

export function upgradeRequest(payload: UpgradeRequestPayload) {
  return {
    type: UPGRADE_REQUEST,
    payload,
  }
}

export function upgradeError(err: Error) {
  return {
    type: UPGRADE_ERROR,
    payload: err,
    error: true,
  }
}

export function upgradeSuccess(items: Wallets) {
  return {
    type: UPGRADE_SUCCESS,
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

export type UpgradeAction =
  ExtractReturn<typeof openView> |
  ExtractReturn<typeof submitMnemonicRequest> |
  ExtractReturn<typeof submitPrivateKeyRequest> |
  ExtractReturn<typeof upgradeError> |
  ExtractReturn<typeof upgradeRequest> |
  ExtractReturn<typeof upgradeSuccess> |
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

    case UPGRADE_ERROR:
      return {
        ...state,
        isLoading: false,
        isInvalidPassword: true,
      }

    case UPGRADE_SUCCESS:
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
