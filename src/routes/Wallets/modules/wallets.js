// @flow

type WalletsOpenViewConstant = '@@wallets/OPEN_VIEW'
type WalletsCloseViewConstant = '@@wallets/CLOSE_VIEW'
type WalletsSetWalletsConstant = '@@wallets/SET_WALLETS'
type WalletsToggleWalletConstant = '@@wallets/TOGGLE_WALLET'
type WalletsSetActiveWalletConstant = '@@wallets/SET_ACTIVE_WALLET'
type WalletsCleanConstant = '@@wallets/CLEAN'

type WalletsOpenViewAction = {|
  +type: WalletsOpenViewConstant,
|}

type WalletsCloseViewAction = {|
  +type: WalletsCloseViewConstant,
|}

export type WalletsSetWalletsActionPayload = {|
  +items: Wallets,
  +testPasswordData: EncryptedData,
  +passwordOptions: PasswordOptions,
  +mnemonicOptions: MnemonicOptions,
  +passwordHint: string,
|}

export type WalletsSetWalletsAction = {|
  +type: WalletsSetWalletsConstant,
  +payload: WalletsSetWalletsActionPayload,
|}

type WalletsToggleWalletAction = {|
  +type: WalletsToggleWalletConstant,
  +payload: {|
    +toggledWalletId: WalletId,
  |},
|}

type WalletsSetActiveWalletAction = {|
  +type: WalletsSetActiveWalletConstant,
  +payload: {|
    +activeWalletId: ?WalletId,
  |},
|}

type WalletsCleanAction = {|
  +type: WalletsCleanConstant,
|}

type WalletsAction =
  WalletsSetWalletsAction |
  WalletsToggleWalletAction |
  WalletsSetActiveWalletAction |
  WalletsCleanAction

export const OPEN_VIEW: WalletsOpenViewConstant = '@@wallets/OPEN_VIEW'
export const CLOSE_VIEW: WalletsCloseViewConstant = '@@wallets/CLOSE_VIEW'
export const SET_WALLETS: WalletsSetWalletsConstant = '@@wallets/SET_WALLETS'
export const TOGGLE_WALLET: WalletsToggleWalletConstant = '@@wallets/TOGGLE_WALLET'
export const SET_ACTIVE_WALLET: WalletsSetActiveWalletConstant = '@@wallets/SET_ACTIVE_WALLET'
export const CLEAN: WalletsCleanConstant = '@@wallets/CLEAN'

export const openView = (): WalletsOpenViewAction => ({
  type: OPEN_VIEW,
})

export const closeView = (): WalletsCloseViewAction => ({
  type: CLOSE_VIEW,
})

export const setWallets = (payload: WalletsSetWalletsActionPayload): WalletsSetWalletsAction => ({
  type: SET_WALLETS,
  payload,
})

export const toggleWallet = (toggledWalletId: WalletId): WalletsToggleWalletAction => ({
  type: TOGGLE_WALLET,
  payload: {
    toggledWalletId,
  },
})

export const setActiveWallet = (activeWalletId: ?WalletId): WalletsSetActiveWalletAction => ({
  type: SET_ACTIVE_WALLET,
  payload: {
    activeWalletId,
  },
})

export const clean = (): WalletsCleanAction => ({
  type: CLEAN,
})

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
