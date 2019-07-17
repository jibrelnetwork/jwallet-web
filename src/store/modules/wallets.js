// @flow strict

export const SET_WALLETS_ITEMS = '@@wallets/SET_WALLETS_ITEMS'
export const SET_ACTIVE_WALLET = '@@wallets/SET_ACTIVE_WALLET'

export function setWalletsItems(
  items: Wallets,
  nextPage?: ?string = null,
  params?: { [key: string]: any } = {},
) {
  return {
    type: SET_WALLETS_ITEMS,
    payload: {
      items,
      params,
      nextPage,
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

export type WalletsAction =
  ExtractReturn<typeof setWalletsItems> |
  ExtractReturn<typeof setActiveWallet>

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
