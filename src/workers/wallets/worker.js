// @flow

import utils from '@jibrelnetwork/jwallet-web-keystore'

import keystore from 'services/keystore'

/* eslint-disable max-len */
import * as wallets from 'routes/Wallets/modules/wallets'
import * as walletsCreate from 'routes/Wallets/routes/Create/modules/walletsCreate'
import * as walletsImport from 'routes/Wallets/routes/Import/modules/walletsImport'
import * as walletsRename from 'routes/Wallets/routes/Rename/modules/walletsRename'
import * as walletsBackup from 'routes/Wallets/routes/Backup/modules/walletsBackup'
import * as walletsDelete from 'routes/Wallets/routes/Delete/modules/walletsDelete'
import * as walletsAddresses from 'routes/Wallets/routes/Addresses/modules/walletsAddresses'

import type { WalletsAction } from 'routes/Wallets/modules/wallets'
import type { WalletsCreateAction } from 'routes/Wallets/routes/Create/modules/walletsCreate'
import type { WalletsImportAction } from 'routes/Wallets/routes/Import/modules/walletsImport'
import type { WalletsRenameAction } from 'routes/Wallets/routes/Rename/modules/walletsRename'
import type { WalletsBackupAction } from 'routes/Wallets/routes/Backup/modules/walletsBackup'
import type { WalletsDeleteAction } from 'routes/Wallets/routes/Delete/modules/walletsDelete'
import type { WalletsAddressesAction } from 'routes/Wallets/routes/Addresses/modules/walletsAddresses'
/* eslint-enable max-len */

export type WalletsAnyAction =
  WalletsAction |
  WalletsCreateAction |
  WalletsImportAction |
  WalletsRenameAction |
  WalletsBackupAction |
  WalletsDeleteAction |
  WalletsAddressesAction

type WalletsWorkerMessage = {|
  +data: WalletsAnyAction,
|}

export type WalletsWorkerInstance = {|
  onmessage: (WalletsWorkerMessage) => void,
  +postMessage: (WalletsAnyAction) => void,
  window: WalletsWorkerInstance,
|}

/* eslint-disable-next-line no-restricted-globals */
const walletsWorker: WalletsWorkerInstance = self

/**
 * We are using bitcore-lib
 * it is trying to access window.crypto
 * but window is not allowed within worker context
 * so we should use such hack: self.window = self
 * to get access to self.crypto
 *
 * for the reference:
 * https://github.com/bitpay/bitcore-lib/blob/master/lib/crypto/random.js#L21
 */
// eslint-disable-next-line fp/no-mutation
walletsWorker.window = walletsWorker

walletsWorker.onmessage = (msg: WalletsWorkerMessage): void => {
  const action: WalletsAnyAction = msg.data

  switch (action.type) {
    case wallets.CHECK_NAME_REQUEST: {
      try {
        const { items, name, newWalletLocation } = action.payload

        keystore.checkWalletUniqueness(items, name, 'name')

        walletsWorker.postMessage(wallets.checkNameSuccess(newWalletLocation))
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err)

        walletsWorker.postMessage(wallets.checkNameError(err.message))
      }

      break
    }

    case walletsCreate.CREATE_REQUEST: {
      try {
        const {
          items,
          passwordOptions,
          mnemonicOptions,
          testPasswordData,
          name,
          password,
          passwordHint,
        } = action.payload

        const passwordOpts: PasswordOptions = utils.getPasswordOptions(passwordOptions)
        const mnemonicOpts: MnemonicOptions = utils.getMnemonicOptions(mnemonicOptions)

        if (testPasswordData) {
          keystore.checkPassword(testPasswordData, password, passwordOpts)
        }

        walletsWorker.postMessage(walletsCreate.createSuccess({
          passwordHint,
          passwordOptions: passwordOpts,
          mnemonicOptions: mnemonicOpts,
          testPasswordData: testPasswordData || keystore.initPassword(password, passwordOpts),
          items: keystore.createWallet(items, {
            data: utils.generateMnemonic(),
            name,
            passwordOptions: passwordOpts,
            mnemonicOptions: mnemonicOpts,
          }, password),
        }))
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err)

        walletsWorker.postMessage(walletsCreate.createError(err.message))
      }

      break
    }

    case walletsImport.IMPORT_REQUEST: {
      try {
        const {
          items,
          passwordOptions,
          mnemonicOptions,
          testPasswordData,
          data,
          name,
          password,
          passwordHint,
        } = action.payload

        const passwordOpts: PasswordOptions = utils.getPasswordOptions(passwordOptions)
        const mnemonicOpts: MnemonicOptions = utils.getMnemonicOptions(mnemonicOptions)

        if (testPasswordData) {
          keystore.checkPassword(testPasswordData, password, passwordOpts)
        }

        walletsWorker.postMessage(walletsImport.importSuccess({
          passwordHint,
          passwordOptions: passwordOpts,
          mnemonicOptions: mnemonicOpts,
          testPasswordData: testPasswordData || keystore.initPassword(password, passwordOpts),
          items: keystore.createWallet(items, {
            data,
            name,
            passwordOptions: passwordOpts,
            mnemonicOptions: mnemonicOpts,
          }, password),
        }))
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err)

        walletsWorker.postMessage(walletsImport.importError(err.message))
      }

      break
    }

    case walletsRename.RENAME_REQUEST: {
      try {
        const { items, name, walletId } = action.payload

        keystore.checkWalletUniqueness(items, name, 'name')

        const itemsNew = keystore.updateWallet(items, walletId, { name })

        walletsWorker.postMessage(walletsRename.renameSuccess(itemsNew))
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err)

        walletsWorker.postMessage(walletsRename.renameError(err.message))
      }

      break
    }

    case walletsBackup.BACKUP_REQUEST: {
      try {
        const { items, walletId, password } = action.payload

        const data: string = keystore.getBackupData(items, walletId, password)

        walletsWorker.postMessage(walletsBackup.backupSuccess(data))
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err)

        walletsWorker.postMessage(walletsBackup.backupError(err.message))
      }

      break
    }

    case walletsDelete.DELETE_REQUEST: {
      try {
        const { items, walletId } = action.payload

        const itemsNew = keystore.removeWallet(items, walletId)

        walletsWorker.postMessage(walletsDelete.deleteSuccess(itemsNew))
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err)

        walletsWorker.postMessage(walletsDelete.deleteError(err.message))
      }

      break
    }

    case walletsAddresses.GET_MORE_REQUEST: {
      try {
        const { items, walletId, startIndex, endIndex } = action.payload

        const addresses: Addresses = keystore.getAddresses(items, walletId, startIndex, endIndex)

        walletsWorker.postMessage(walletsAddresses.getMoreSuccess(addresses))
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err)

        walletsWorker.postMessage(walletsAddresses.getMoreError(err.message))
      }

      break
    }

    case walletsAddresses.SET_ACTIVE_REQUEST: {
      try {
        const { items, walletId, addressIndex } = action.payload

        const itemsNew = keystore.updateWallet(items, walletId, { addressIndex })

        walletsWorker.postMessage(walletsAddresses.setActiveSuccess(itemsNew))
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err)

        walletsWorker.postMessage(walletsAddresses.setActiveError(err.message))
      }

      break
    }

    default:
      break
  }
}
