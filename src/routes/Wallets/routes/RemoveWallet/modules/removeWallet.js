// @flow

export const OPEN = '@@removeWallet/OPEN'
export const CLOSE = '@@removeWallet/CLOSE'
export const REMOVE = '@@removeWallet/REMOVE'
export const REMOVE_SUCCESS = '@@removeWallet/REMOVE_SUCCESS'
export const REMOVE_ERROR = '@@removeWallet/REMOVE_ERROR'

export const open = (): { type: string } => ({
  type: OPEN,
})

export const close = (): { type: string } => ({
  type: CLOSE,
})

export const remove = (): { type: string } => ({
  type: REMOVE,
})

export const removeSuccess = (walletType: WalletType): {
  type: string,
  payload: {
    walletType: WalletType,
  },
} => ({
  type: REMOVE_SUCCESS,
  payload: {
    walletType,
  },
})

export const removeError = (err: Object): {
  type: string,
  payload: Object,
  error: boolean,
} => ({
  type: REMOVE_ERROR,
  payload: err,
  error: true,
})

const initialState: RemoveWalletData = {}

const removeWallet = (state: RemoveWalletData = initialState): Object => state

export default removeWallet
