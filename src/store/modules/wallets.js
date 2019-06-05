// @flow strict

export const SET_WALLETS_ITEMS = '@@wallets/SET_WALLETS_ITEMS'
export const SET_ACTIVE_WALLET = '@@wallets/SET_ACTIVE_WALLET'

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
