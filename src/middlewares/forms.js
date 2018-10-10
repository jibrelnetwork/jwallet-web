// @flow

/**
 * Funds
 */
import * as receiveFunds from 'routes/Funds/routes/Receive/modules/receiveFunds'
import * as sendFunds from 'routes/Funds/routes/Send/modules/sendFunds'

/**
 * Digital Assets
 */
import * as digitalAssets from 'routes/DigitalAssets/modules/digitalAssets'

/**
 * Custom Asset
 */
import * as customAsset from 'routes/CustomAsset/modules/customAsset'

/**
 * Wallets
 */
/*
import * as createWallet from 'routes/Wallets/routes/Create/modules/createWallet'
*/
import * as importWallet from 'routes/Wallets/routes/Import/modules/importWallet'
import * as editWallet from 'routes/Wallets/routes/Edit/modules/editWallet'
import * as backupWallet from 'routes/Wallets/routes/Backup/modules/backupWallet'
import * as changeWalletPassword from 'routes/Wallets/routes/ChangePassword/modules/changeWalletPassword' // eslint-disable-line max-len

export const setInvalidField = (store: { dispatch: Dispatch }) => (next: Next) => (action: FSA) => {
  const { type, payload }: FSA = action

  switch (type) {
    /**
     * Funds
     */
    case receiveFunds.GENERATE_ERROR: {
      store.dispatch(receiveFunds.setInvalidField(payload.fieldName, payload.message))
      break
    }

    case sendFunds.SEND_ERROR: {
      store.dispatch(sendFunds.setInvalidField(payload.fieldName, payload.message))
      break
    }

    /**
     * Digital Assets
     */
    case digitalAssets.SEARCH_ERROR: {
      store.dispatch(digitalAssets.setInvalidField(payload.fieldName, payload.message))
      break
    }

    /**
     * Wallets
     */
    /*
    case createWallet.CREATE_ERROR: {
      store.dispatch(createWallet.setInvalidField(payload.fieldName, payload.message))
      break
    }
    */

    case importWallet.IMPORT_ERROR: {
      store.dispatch(importWallet.setInvalidField(payload.fieldName, payload.message))
      break
    }

    case editWallet.EDIT_ERROR: {
      store.dispatch(editWallet.setInvalidField(payload.fieldName, payload.message))
      break
    }

    case backupWallet.BACKUP_ERROR: {
      store.dispatch(backupWallet.setInvalidField(payload.fieldName, payload.message))

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
