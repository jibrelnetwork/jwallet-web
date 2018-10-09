// @flow

export type WalletsSetWalletsActionPayload = {|
  +items: Wallets,
  +testPasswordData: EncryptedData,
  +passwordOptions: PasswordOptions,
  +mnemonicOptions: MnemonicOptions,
  +passwordHint: string,
|}

export type WalletsCreateRequestPayload = {|
  +items: Wallets,
  +testPasswordData: ?EncryptedData,
  +passwordOptions: ?PasswordOptionsUser | PasswordOptions,
  +mnemonicOptions: ?MnemonicOptionsUser | MnemonicOptions,
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

export type NewWalletLocation = 'create' | 'import'

/* eslint-disable max-len */
export const GO_TO_START_VIEW: '@@wallets/GO_TO_START_VIEW' = '@@wallets/GO_TO_START_VIEW'

export const OPEN_VIEW: '@@wallets/OPEN_VIEW' = '@@wallets/OPEN_VIEW'
export const CLOSE_VIEW: '@@wallets/CLOSE_VIEW' = '@@wallets/CLOSE_VIEW'

export const CHANGE_NAME_INPUT: '@@wallets/CHANGE_NAME_INPUT' = '@@wallets/CHANGE_NAME_INPUT'
export const CHANGE_PASSWORD_INPUT: '@@wallets/CHANGE_PASSWORD_INPUT' = '@@wallets/CHANGE_PASSWORD_INPUT'
export const CHANGE_PASSWORD_HINT_INPUT: '@@wallets/CHANGE_PASSWORD_HINT_INPUT' = '@@wallets/CHANGE_PASSWORD_HINT_INPUT'
export const CHANGE_PASSWORD_CONFIRM_INPUT: '@@wallets/CHANGE_PASSWORD_CONFIRM_INPUT' = '@@wallets/CHANGE_PASSWORD_CONFIRM_INPUT'

export const CHECK_NAME_ERROR: '@@wallets/CHECK_NAME_ERROR' = '@@wallets/CHECK_NAME_ERROR'
export const CHECK_NAME_SUCCESS: '@@wallets/CHECK_NAME_SUCCESS' = '@@wallets/CHECK_NAME_SUCCESS'
export const CHECK_NAME_REQUEST: '@@wallets/CHECK_NAME_REQUEST' = '@@wallets/CHECK_NAME_REQUEST'

export const SET_WALLETS: '@@wallets/SET_WALLETS' = '@@wallets/SET_WALLETS'
export const TOGGLE_WALLET: '@@wallets/TOGGLE_WALLET' = '@@wallets/TOGGLE_WALLET'
export const SET_ACTIVE_WALLET: '@@wallets/SET_ACTIVE_WALLET' = '@@wallets/SET_ACTIVE_WALLET'

export const SET_IS_LOADING: '@@wallets/SET_IS_LOADING' = '@@wallets/SET_IS_LOADING'
export const SET_INVALID_FIELD: '@@wallets/SET_INVALID_FIELD' = '@@wallets/SET_INVALID_FIELD'

export const CLEAN: '@@wallets/CLEAN' = '@@wallets/CLEAN'
/* eslint-enable max-len */

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

export function checkNameError(message: string) {
  return {
    type: CHECK_NAME_ERROR,
    payload: {
      message,
    },
    error: true,
  }
}

export function checkNameSuccess(newWalletLocation: NewWalletLocation) {
  return {
    type: CHECK_NAME_SUCCESS,
    payload: {
      newWalletLocation,
    },
  }
}

export function checkNameRequest(
  items: Wallets,
  name: string,
  newWalletLocation: NewWalletLocation,
) {
  return {
    type: CHECK_NAME_REQUEST,
    payload: {
      name,
      items,
      newWalletLocation,
    },
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
  ExtractReturn<typeof checkNameError> |
  ExtractReturn<typeof checkNameSuccess> |
  ExtractReturn<typeof checkNameRequest> |
  ExtractReturn<typeof setWallets> |
  ExtractReturn<typeof toggleWallet> |
  ExtractReturn<typeof setActiveWallet> |
  ExtractReturn<typeof setIsLoading> |
  ExtractReturn<typeof setInvalidField> |
  ExtractReturn<typeof clean>

const initialState: WalletsState = {
  items: [],
  invalidFields: {},
  name: '',
  password: '',
  passwordHint: '',
  passwordConfirm: '',
  activeWalletId: null,
  toggledWalletId: null,
  passwordOptions: null,
  mnemonicOptions: null,
  testPasswordData: null,
  isLoading: false,
}

const wallets = (
  state: WalletsState = initialState,
  action: WalletsAction,
): WalletsState => {
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

    case CLEAN: {
      const {
        name,
        password,
        isLoading,
        passwordHint,
        invalidFields,
        passwordConfirm,
      } = initialState

      return {
        ...state,
        name,
        password,
        isLoading,
        passwordHint,
        invalidFields,
        passwordConfirm,
      }
    }

    default:
      return state
  }
}

export default wallets
