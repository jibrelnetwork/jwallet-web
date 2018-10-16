// @flow

export const OPEN_VIEW: '@@walletsDelete/OPEN_VIEW' = '@@walletsDelete/OPEN_VIEW'
export const CLOSE_VIEW: '@@walletsDelete/CLOSE_VIEW' = '@@walletsDelete/CLOSE_VIEW'

export const DELETE_ERROR: '@@walletsDelete/DELETE_ERROR' = '@@walletsDelete/DELETE_ERROR'
export const DELETE_SUCCESS: '@@walletsDelete/DELETE_SUCCESS' = '@@walletsDelete/DELETE_SUCCESS'
export const DELETE_REQUEST: '@@walletsDelete/DELETE_REQUEST' = '@@walletsDelete/DELETE_REQUEST'

export const CLEAN: '@@walletsDelete/CLEAN' = '@@walletsDelete/CLEAN'

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

export function deleteError(message: string) {
  return {
    type: DELETE_ERROR,
    payload: {
      message,
    },
    error: true,
  }
}

export function deleteSuccess(items: Wallets) {
  return {
    type: DELETE_SUCCESS,
    payload: {
      items,
    },
  }
}

export function deleteRequest(items: Wallets, walletId: string) {
  return {
    type: DELETE_REQUEST,
    payload: {
      items,
      walletId,
    },
  }
}

export function clean() {
  return {
    type: CLEAN,
  }
}

export type WalletsDeleteAction =
  ExtractReturn<typeof openView> |
  ExtractReturn<typeof closeView> |
  ExtractReturn<typeof deleteError> |
  ExtractReturn<typeof deleteSuccess> |
  ExtractReturn<typeof deleteRequest> |
  ExtractReturn<typeof clean>
