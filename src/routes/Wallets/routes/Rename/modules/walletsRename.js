// @flow

export const OPEN_VIEW: '@@walletsRename/OPEN_VIEW' = '@@walletsRename/OPEN_VIEW'
export const CLOSE_VIEW: '@@walletsRename/CLOSE_VIEW' = '@@walletsRename/CLOSE_VIEW'

export const RENAME_ERROR: '@@walletsRename/RENAME_ERROR' = '@@walletsRename/RENAME_ERROR'
export const RENAME_SUCCESS: '@@walletsRename/RENAME_SUCCESS' = '@@walletsRename/RENAME_SUCCESS'
export const RENAME_REQUEST: '@@walletsRename/RENAME_REQUEST' = '@@walletsRename/RENAME_REQUEST'

export const CLEAN: '@@walletsRename/CLEAN' = '@@walletsRename/CLEAN'

export function openView(walletId: string) {
  return {
    type: OPEN_VIEW,
    payload: {
      walletId,
    },
  }
}

export function closeView() {
  return {
    type: CLOSE_VIEW,
  }
}

export function renameError(message: string) {
  return {
    type: RENAME_ERROR,
    payload: {
      message,
    },
    error: true,
  }
}

export function renameSuccess(items: Wallets) {
  return {
    type: RENAME_SUCCESS,
    payload: {
      items,
    },
  }
}

export function renameRequest(items: Wallets, name: string, walletId: string) {
  return {
    type: RENAME_REQUEST,
    payload: {
      items,
      name,
      walletId,
    },
  }
}

export function clean() {
  return {
    type: CLEAN,
  }
}

export type WalletsRenameAction =
  ExtractReturn<typeof openView> |
  ExtractReturn<typeof closeView> |
  ExtractReturn<typeof renameError> |
  ExtractReturn<typeof renameSuccess> |
  ExtractReturn<typeof renameRequest> |
  ExtractReturn<typeof clean>
