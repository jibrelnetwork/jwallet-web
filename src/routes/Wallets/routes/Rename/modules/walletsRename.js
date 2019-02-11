// @flow

export const OPEN_VIEW: '@@walletsRename/OPEN_VIEW' = '@@walletsRename/OPEN_VIEW'
export const CLOSE_VIEW: '@@walletsRename/CLOSE_VIEW' = '@@walletsRename/CLOSE_VIEW'

export const RENAME: '@@walletsRename/RENAME' = '@@walletsRename/RENAME'

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

export function rename(items: Wallets, name: string, walletId: string) {
  return {
    type: RENAME,
    payload: {
      items,
      name,
      walletId,
    },
  }
}

export type WalletsRenameAction =
  ExtractReturn<typeof openView> |
  ExtractReturn<typeof closeView> |
  ExtractReturn<typeof rename>
