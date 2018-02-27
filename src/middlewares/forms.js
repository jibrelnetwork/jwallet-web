// @flow

import * as createWallet from 'routes/Wallets/routes/CreateWallet/modules/createWallet'
import * as importWallet from 'routes/Wallets/routes/ImportWallet/modules/importWallet'
import * as backupWallet from 'routes/Wallets/routes/BackupWallet/modules/backupWallet'
import * as changeWalletPassword from 'routes/Wallets/routes/ChangeWalletPassword/modules/changeWalletPassword' // eslint-disable-line max-len

export const setInvalidField = (store: { dispatch: Dispatch }) => (next: Next) => (action: FSA) => {
  const { type, payload }: FSA = action

  switch (type) {
    case createWallet.CREATE_ERROR: {
      store.dispatch(createWallet.setInvalidField(payload.fieldName, payload.message))
      break
    }

    case importWallet.IMPORT_ERROR: {
      store.dispatch(importWallet.setInvalidField(payload.fieldName, payload.message))
      break
    }

    case backupWallet.BACKUP_ERROR: {
      store.dispatch(
        backupWallet.setInvalidField('password', i18n('general.error.password.invalid')),
      )

      break
    }

    case changeWalletPassword.CHANGE_PASSWORD_ERROR: {
      store.dispatch(changeWalletPassword.setInvalidField(payload.fieldName, payload.message))
      break
    }

    default: break
  }

  return next(action)
}
