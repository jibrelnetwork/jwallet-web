// @flow

export type WalletsSetWalletsActionPayload = {|
  +items: Wallets,
  +testPasswordData: EncryptedData,
  +passwordOptions: PasswordOptions,
  +mnemonicOptions: MnemonicOptions,
|}

export type WalletsCreateRequestPayload = {|
  +items: Wallets,
  +testPasswordData: ?EncryptedData,
  +passwordOptions: PasswordOptions,
  +mnemonicOptions: MnemonicOptions,
  +name: string,
  +password: string,
|}

export type WalletsImportRequestPayload = {|
  +items: Wallets,
  +testPasswordData: ?EncryptedData,
  +passwordOptions: ?PasswordOptionsUser | PasswordOptions,
  +mnemonicOptions: ?MnemonicOptionsUser | MnemonicOptions,
  +data: string,
  +name: string,
  +password: string,
|}

export const GO_TO_START_VIEW = '@@wallets/GO_TO_START_VIEW'

export const OPEN_LAYOUT = '@@wallets/OPEN_LAYOUT'
export const CLOSE_LAYOUT = '@@wallets/CLOSE_LAYOUT'

export const OPEN_VIEW = '@@wallets/OPEN_VIEW'
export const CLOSE_VIEW = '@@wallets/CLOSE_VIEW'

export const CHANGE_NAME_INPUT = '@@wallets/CHANGE_NAME_INPUT'
export const CHANGE_PASSWORD_INPUT = '@@wallets/CHANGE_PASSWORD_INPUT'
export const CHANGE_PASSWORD_HINT_INPUT = '@@wallets/CHANGE_PASSWORD_HINT_INPUT'
export const CHANGE_PASSWORD_CONFIRM_INPUT = '@@wallets/CHANGE_PASSWORD_CONFIRM_INPUT'

export const SET_WALLETS = '@@wallets/SET_WALLETS'
export const SET_WALLETS_ITEMS = '@@wallets/SET_WALLETS_ITEMS'
export const SET_ACTIVE_WALLET = '@@wallets/SET_ACTIVE_WALLET'

export const SET_IS_LOADING = '@@wallets/SET_IS_LOADING'
export const SET_INVALID_FIELD = '@@wallets/SET_INVALID_FIELD'

export const PRIVATE_KEY_ERROR = '@@wallets/PRIVATE_KEY_ERROR'
export const PRIVATE_KEY_SUCCESS = '@@wallets/PRIVATE_KEY_SUCCESS'
export const PRIVATE_KEY_REQUEST = '@@wallets/PRIVATE_KEY_REQUEST'

export const CLEAN: '@@wallets/CLEAN' = '@@wallets/CLEAN'

export function openLayout() {
  return {
    type: OPEN_LAYOUT,
  }
}

export function closeLayout() {
  return {
    type: CLOSE_LAYOUT,
  }
}

export function goToStartView() {
  return {
    type: GO_TO_START_VIEW,
  }
}

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

export function changeNameInput(name: string) {
  return {
    type: CHANGE_NAME_INPUT,
    payload: {
      name,
    },
  }
}

export function changePasswordInput(password: string) {
  return {
    type: CHANGE_PASSWORD_INPUT,
    payload: {
      password,
    },
  }
}

export function changePasswordHintInput(passwordHint: string) {
  return {
    type: CHANGE_PASSWORD_HINT_INPUT,
    payload: {
      passwordHint,
    },
  }
}

export function changePasswordConfirmInput(passwordConfirm: string) {
  return {
    type: CHANGE_PASSWORD_CONFIRM_INPUT,
    payload: {
      passwordConfirm,
    },
  }
}

export function setWallets(payload: WalletsSetWalletsActionPayload) {
  return {
    type: SET_WALLETS,
    payload,
  }
}

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

export function setIsLoading(isLoading: boolean) {
  return {
    type: SET_IS_LOADING,
    payload: {
      isLoading,
    },
  }
}

export function setInvalidField(fieldName: string, message: string) {
  return {
    type: SET_INVALID_FIELD,
    payload: {
      fieldName,
      message,
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

export function privateKeyRequest(wallet: Wallet, password: string) {
  return {
    type: PRIVATE_KEY_REQUEST,
    payload: {
      wallet,
      password,
    },
  }
}

export function clean() {
  return {
    type: CLEAN,
  }
}

export type WalletsAction =
  ExtractReturn<typeof goToStartView> |
  ExtractReturn<typeof openView> |
  ExtractReturn<typeof closeView> |
  ExtractReturn<typeof changeNameInput> |
  ExtractReturn<typeof changePasswordInput> |
  ExtractReturn<typeof changePasswordHintInput> |
  ExtractReturn<typeof changePasswordConfirmInput> |
  ExtractReturn<typeof setWallets> |
  ExtractReturn<typeof setWalletsItems> |
  ExtractReturn<typeof setActiveWallet> |
  ExtractReturn<typeof setIsLoading> |
  ExtractReturn<typeof setInvalidField> |
  ExtractReturn<typeof privateKeyError> |
  ExtractReturn<typeof privateKeySuccess> |
  ExtractReturn<typeof privateKeyRequest> |
  ExtractReturn<typeof clean>

const initialState: WalletsState = {
  persist: {
    items: [],
    activeWalletId: null,
    passwordOptions: null,
    mnemonicOptions: null,
    testPasswordData: null,
  },
  invalidFields: {},
  name: '',
  password: '',
  passwordHint: '',
  passwordConfirm: '',
  isLoading: false,
}

function wallets(state: WalletsState = initialState, action: WalletsAction): WalletsState {
  switch (action.type) {
    case CHANGE_NAME_INPUT:
      return {
        ...state,
        name: action.payload.name,
        invalidFields: {
          ...state.invalidFields,
          name: null,
        },
      }

    case CHANGE_PASSWORD_INPUT:
      return {
        ...state,
        password: action.payload.password,
        invalidFields: {
          ...state.invalidFields,
          password: null,
        },
      }

    case CHANGE_PASSWORD_HINT_INPUT:
      return {
        ...state,
        passwordHint: action.payload.passwordHint,
        invalidFields: {
          ...state.invalidFields,
          passwordHint: null,
        },
      }

    case CHANGE_PASSWORD_CONFIRM_INPUT:
      return {
        ...state,
        passwordConfirm: action.payload.passwordConfirm,
        invalidFields: {
          ...state.invalidFields,
          passwordConfirm: null,
        },
      }

    case SET_WALLETS:
      return {
        ...state,
        persist: {
          ...state.persist,
          ...action.payload,
        },
      }

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

    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload.isLoading,
      }

    case SET_INVALID_FIELD: {
      const { message, fieldName } = action.payload

      return {
        ...state,
        invalidFields: {
          ...state.invalidFields,
          [fieldName]: message,
        },
        isLoading: false,
      }
    }

    case CLEAN:
      return {
        ...initialState,
        persist: state.persist,
      }

    default:
      return state
  }
}

export default wallets
