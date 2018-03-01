// @flow

import { assoc, assocPath, compose } from 'ramda'

export const INIT = '@@wallets/INIT'
export const OPEN = '@@wallets/OPEN'
export const CLOSE = '@@wallets/CLOSE'
export const SET_WALLETS = '@@wallets/SET_WALLETS'
export const TOGGLE_WALLET = '@@wallets/TOGGLE_WALLET'
export const SHOW_ACTIONS_MENU = '@@wallets/SHOW_ACTIONS_MENU'
export const SET_WALLET_ACTION = '@@wallets/SET_WALLET_ACTION'
export const SET_PASSWORD = '@@wallets/SET_PASSWORD'
export const SET_ACTIVE = '@@wallets/SET_ACTIVE'
export const SET_ACTIVE_SUCCESS = '@@wallets/SET_ACTIVE_SUCCESS'
export const SET_ACTIVE_ERROR = '@@wallets/SET_ACTIVE_ERROR'
export const SET_ACTIVE_WALLET_ID = '@@wallets/SET_ACTIVE_WALLET_ID'
export const SET_INVALID_FIELD = '@@wallets/SET_INVALID_FIELD'
export const CLEAN = '@@wallets/CLEAN'

export const init = (): { type: string } => ({
  type: INIT,
})

export const open = (): { type: string } => ({
  type: OPEN,
})

export const close = (): { type: string } => ({
  type: CLOSE,
})

export const setWallets = (items: Wallets): {
  type: string,
  payload: {
    items: Wallets,
  },
} => ({
  type: SET_WALLETS,
  payload: {
    items,
  },
})

export const toggleWallet = (toggledWalletId: WalletId): {
  type: string,
  payload: {
    toggledWalletId: WalletId,
  },
} => ({
  type: TOGGLE_WALLET,
  payload: {
    toggledWalletId,
  },
})

export const showActionsMenu = (showActionsWalletId: WalletId): {
  type: string,
  payload: {
    showActionsWalletId: WalletId,
  },
} => ({
  type: SHOW_ACTIONS_MENU,
  payload: {
    showActionsWalletId,
  },
})

export const setWalletAction = (walletAction: WalletAction): {
  type: string,
  payload: {
    walletAction: WalletAction,
  },
} => ({
  type: SET_WALLET_ACTION,
  payload: {
    walletAction,
  },
})

export const setPassword = (password: Password): {
  type: string,
  payload: {
    password: Password,
  },
} => ({
  type: SET_PASSWORD,
  payload: {
    password,
  },
})

export const setActive = (): { type: string } => ({
  type: SET_ACTIVE,
})

export const setActiveSuccess = (
  walletId: WalletId,
  walletAction: ?WalletAction,
  walletType: ?WalletType,
): {
  type: string,
  payload: {
    walletId: WalletId,
    walletAction: ?WalletAction,
    walletType: ?WalletType,
  },
} => ({
  type: SET_ACTIVE_SUCCESS,
  payload: {
    walletId,
    walletAction,
    walletType,
  },
})

export const setActiveError = (err: Object): {
  type: string,
  payload: Object,
  error: boolean,
} => ({
  type: SET_ACTIVE_ERROR,
  payload: err,
  error: true,
})

export const setActiveWalletId = (activeWalletId: ?WalletId): {
  type: string,
  payload: {
    activeWalletId: ?WalletId,
  },
} => ({
  type: SET_ACTIVE_WALLET_ID,
  payload: {
    activeWalletId,
  },
})

export const setInvalidField = (fieldName: string, message: string): {
  type: string,
  payload: {
    fieldName: string,
    message: string,
  },
} => ({
  type: SET_INVALID_FIELD,
  payload: {
    fieldName,
    message,
  },
})

export const clean = (): { type: string } => ({
  type: CLEAN,
})

const initialState: WalletsData = {
  invalidFields: {},
  items: [],
  password: '',
  toggledWalletId: null,
  showActionsWalletId: null,
  activeWalletId: null,
  walletAction: null,
}

const wallets = (
  state: WalletsData = initialState,
  action: FSA,
): Object => {
  const { type, payload }: FSA = action

  switch (type) {
    case SET_WALLETS: {
      return assoc('items', payload.items)(state)
    }

    case TOGGLE_WALLET: {
      return compose(
        assoc('toggledWalletId', payload.toggledWalletId),
        assoc('showActionsWalletId', null),
      )(state)
    }

    case SHOW_ACTIONS_MENU: {
      return compose(
        assoc('toggledWalletId', null),
        assoc('showActionsWalletId', payload.showActionsWalletId),
      )(state)
    }

    case SET_WALLET_ACTION: {
      return assoc('walletAction', payload.walletAction)(state)
    }

    case SET_PASSWORD: {
      return compose(
        assoc('password', payload.password),
        assocPath(['validFields', 'password'], null),
        assocPath(['invalidFields', 'password'], null),
      )(state)
    }

    case SET_ACTIVE_WALLET_ID: {
      return assoc('activeWalletId', payload.activeWalletId)(state)
    }

    case SET_INVALID_FIELD: {
      return assocPath(['invalidFields', payload.fieldName], payload.message)(state)
    }

    case CLEAN: {
      return compose(
        assoc('password', ''),
        assoc('toggledWalletId', null),
        assocPath(['validFields', 'password'], null),
        assocPath(['invalidFields', 'password'], null),
      )(state)
    }

    default: return state
  }
}

export default wallets
