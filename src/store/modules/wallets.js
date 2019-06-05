// @flow strict

export type WalletsPrivateKeyRequestPayload = {|
  +wallet: Wallet,
  +internalKey: ?EncryptedData,
  +password: string,
|}

export const SET_WALLETS_ITEMS = '@@wallets/SET_WALLETS_ITEMS'
export const SET_ACTIVE_WALLET = '@@wallets/SET_ACTIVE_WALLET'

export const PRIVATE_KEY_ERROR = '@@wallets/PRIVATE_KEY_ERROR'
export const PRIVATE_KEY_SUCCESS = '@@wallets/PRIVATE_KEY_SUCCESS'
export const PRIVATE_KEY_REQUEST = '@@wallets/PRIVATE_KEY_REQUEST'

export const SIMPLIFY_WALLET = '@@wallets/SIMPLIFY_WALLET'

export function setWalletsItems(items: Wallets) {
  return {
    type: SET_WALLETS_ITEMS,
    payload: {
      items,
    },
  }
}

export function setActiveWallet(activeWalletId: ?WalletId) {
  return {
    type: SET_ACTIVE_WALLET,
    payload: {
      activeWalletId,
    },
  }
}

export function privateKeyError(walletId: string, message: string) {
  return {
    type: PRIVATE_KEY_ERROR,
    payload: {
      walletId,
      message,
    },
  }
}

export function privateKeySuccess(walletId: string, privateKey: string) {
  return {
    type: PRIVATE_KEY_SUCCESS,
    payload: {
      walletId,
      privateKey,
    },
  }
}

export function privateKeyRequest(payload: WalletsPrivateKeyRequestPayload) {
  return {
    type: PRIVATE_KEY_REQUEST,
    payload,
  }
}

export function simplifyWallet(walletId: WalletId, isSimplified: boolean) {
  return {
    type: SIMPLIFY_WALLET,
    payload: {
      walletId,
      isSimplified,
    },
  }
}

export type WalletsAction =
  ExtractReturn<typeof setWalletsItems> |
  ExtractReturn<typeof setActiveWallet> |
  ExtractReturn<typeof privateKeyError> |
  ExtractReturn<typeof privateKeySuccess> |
  ExtractReturn<typeof privateKeyRequest> |
  ExtractReturn<typeof simplifyWallet>

const initialState: WalletsState = {
  persist: {
    items: [],
    activeWalletId: null,
  },
}

function wallets(
  state: WalletsState = initialState,
  action: WalletsAction,
): WalletsState {
  switch (action.type) {
    case SET_WALLETS_ITEMS:
      return {
        ...state,
        persist: {
          ...state.persist,
          items: action.payload.items,
        },
      }

    case SET_ACTIVE_WALLET:
      return {
        ...state,
        persist: {
          ...state.persist,
          activeWalletId: action.payload.activeWalletId,
        },
      }

    default:
      return state
  }
}

export default wallets
