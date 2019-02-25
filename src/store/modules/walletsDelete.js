// @flow

export const OPEN_VIEW: '@@walletsDelete/OPEN_VIEW' = '@@walletsDelete/OPEN_VIEW'
export const CLOSE_VIEW: '@@walletsDelete/CLOSE_VIEW' = '@@walletsDelete/CLOSE_VIEW'

export const REMOVE: '@@walletsDelete/REMOVE' = '@@walletsDelete/REMOVE'

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

export function remove(items: Wallets, walletId: string) {
  return {
    type: REMOVE,
    payload: {
      items,
      walletId,
    },
  }
}

export type WalletsDeleteAction =
  ExtractReturn<typeof openView> |
  ExtractReturn<typeof closeView> |
  ExtractReturn<typeof remove>
