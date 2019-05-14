// @flow

export type WalletAction = 'CREATE' | 'IMPORT'
type WalletActions = { [WalletAction]: WalletAction }

export const ACTIONS: WalletActions = {
  CREATE: 'CREATE',
  IMPORT: 'IMPORT',
}
