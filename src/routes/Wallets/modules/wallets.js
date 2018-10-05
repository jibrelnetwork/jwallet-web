// @flow

export type WalletsSetWalletsActionPayload = {|
  +items: Wallets,
  +testPasswordData: EncryptedData,
  +passwordOptions: PasswordOptions,
  +mnemonicOptions: MnemonicOptions,
  +passwordHint: string,
|}

export type WalletsCreateRequestPayload = {|
  +wallets: Wallets,
  +testPasswordData: ?EncryptedData,
  +passwordOptions: ?PasswordOptionsUser | PasswordOptions,
  +mnemonicOptions: ?MnemonicOptionsUser | MnemonicOptions,
  +name: string,
  +password: string,
  +passwordHint: string,
|}

export const OPEN_VIEW: '@@wallets/OPEN_VIEW' = '@@wallets/OPEN_VIEW'
export const CLOSE_VIEW: '@@wallets/CLOSE_VIEW' = '@@wallets/CLOSE_VIEW'
export const SET_WALLETS: '@@wallets/SET_WALLETS' = '@@wallets/SET_WALLETS'
export const TOGGLE_WALLET: '@@wallets/TOGGLE_WALLET' = '@@wallets/TOGGLE_WALLET'
export const SET_ACTIVE_WALLET: '@@wallets/SET_ACTIVE_WALLET' = '@@wallets/SET_ACTIVE_WALLET'
export const CLEAN: '@@wallets/CLEAN' = '@@wallets/CLEAN'

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

export function setWallets(payload: WalletsSetWalletsActionPayload) {
  return {
    type: SET_WALLETS,
    payload,
  }
}

export function toggleWallet(toggledWalletId: WalletId) {
  return {
    type: TOGGLE_WALLET,
    payload: {
      toggledWalletId,
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

export function clean() {
  return {
    type: CLEAN,
  }
}

type WalletsAction =
  ExtractReturn<typeof openView> |
  ExtractReturn<typeof closeView> |
  ExtractReturn<typeof toggleWallet> |
  ExtractReturn<typeof setActiveWallet> |
  ExtractReturn<typeof clean>

const initialState: WalletsState = {
  items: [],
  passwordHint: '',
  activeWalletId: null,
  toggledWalletId: null,
  passwordOptions: null,
  mnemonicOptions: null,
  testPasswordData: null,
}

const wallets = (
  state: WalletsState = initialState,
  action: WalletsAction,
): WalletsState => {
  switch (action.type) {
    case SET_WALLETS:
      return {
        ...state,
        ...action.payload,
      }

    case TOGGLE_WALLET:
      return {
        ...state,
        toggledWalletId: action.payload.toggledWalletId,
      }

    case SET_ACTIVE_WALLET:
      return {
        ...state,
        activeWalletId: action.payload.activeWalletId,
      }

    case CLEAN:
      return initialState

    default:
      return state
  }
}

export default wallets
