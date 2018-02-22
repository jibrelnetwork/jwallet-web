// @flow

import * as backupWallet from 'routes/Wallets/routes/BackupWallet/modules/backupWallet'

export const setInvalidField = (store: { dispatch: Dispatch }) => (next: Next) => (action: FSA) => {
  const { type }: FSA = action

  switch (type) {
    case backupWallet.BACKUP_ERROR: {
      store.dispatch(
        backupWallet.setInvalidField('password', i18n('general.error.password.invalid')),
      )

      break
    }

    default: break
  }

  return next(action)
}
