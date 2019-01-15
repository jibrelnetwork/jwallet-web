// @flow

import {
  createWallet,
  upgradeWallet,
  getBackupData,
  getPrivateKey,
} from 'utils/wallets'

import {
  generateMnemonic,
  getMnemonicOptions,
} from 'utils/mnemonic'

import {
  initPassword,
  checkPassword,
  getPasswordOptions,
} from 'utils/encryption'

import * as upgrade from 'routes/Upgrade/modules/upgrade'
import * as wallets from 'routes/Wallets/modules/wallets'
import * as walletsCreate from 'routes/Wallets/routes/Create/modules/walletsCreate'
import * as walletsImport from 'routes/Wallets/routes/Import/modules/walletsImport'
import * as walletsBackup from 'routes/Wallets/routes/Backup/modules/walletsBackup'

import type { UpgradeAction } from 'routes/Upgrade/modules/upgrade'
import type { WalletsAction } from 'routes/Wallets/modules/wallets'
import type { WalletsCreateAction } from 'routes/Wallets/routes/Create/modules/walletsCreate'
import type { WalletsImportAction } from 'routes/Wallets/routes/Import/modules/walletsImport'
import type { WalletsBackupAction } from 'routes/Wallets/routes/Backup/modules/walletsBackup'

export type WalletsAnyAction =
  UpgradeAction |
  WalletsAction |
  WalletsCreateAction |
  WalletsImportAction |
  WalletsBackupAction

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
    case walletsCreate.CREATE_REQUEST: {
      try {
        const {
          items,
          passwordOptions,
          mnemonicOptions,
          testPasswordData,
          name,
          password,
        } = action.payload

        const passwordOpts: PasswordOptions = getPasswordOptions(passwordOptions)
        const mnemonicOpts: MnemonicOptions = getMnemonicOptions(mnemonicOptions)

        if (testPasswordData) {
          checkPassword(testPasswordData, password, passwordOpts)
        }

        walletsWorker.postMessage(walletsCreate.createSuccess({
          passwordOptions: passwordOpts,
          mnemonicOptions: mnemonicOpts,
          testPasswordData: testPasswordData || initPassword(password, passwordOpts),
          items: createWallet(items, {
            data: generateMnemonic(),
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
        } = action.payload

        const passwordOpts: PasswordOptions = getPasswordOptions(passwordOptions)
        const mnemonicOpts: MnemonicOptions = getMnemonicOptions(mnemonicOptions)

        if (testPasswordData) {
          checkPassword(testPasswordData, password, passwordOpts)
        }

        walletsWorker.postMessage(walletsImport.importSuccess({
          passwordOptions: passwordOpts,
          mnemonicOptions: mnemonicOpts,
          testPasswordData: testPasswordData || initPassword(password, passwordOpts),
          items: createWallet(items, {
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

    case walletsBackup.BACKUP_REQUEST: {
      try {
        const { items, walletId, password } = action.payload

        const data: string = getBackupData(items, walletId, password)

        walletsWorker.postMessage(walletsBackup.backupSuccess(data))
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err)

        walletsWorker.postMessage(walletsBackup.backupError(err.message))
      }

      break
    }

    case wallets.PRIVATE_KEY_REQUEST: {
      const { wallet, password } = action.payload

      try {
        const privateKey: string = getPrivateKey(wallet, password)

        walletsWorker.postMessage(wallets.privateKeySuccess(wallet.id, privateKey))
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err)

        walletsWorker.postMessage(wallets.privateKeyError(wallet.id, err.message))
      }

      break
    }

    case upgrade.UPGRADE_REQUEST: {
      try {
        const {
          items,
          walletId,
          password,
          passwordOptions,
          testPasswordData,
          data,
          mnemonicOptionsUser,
        } = action.payload

        checkPassword(testPasswordData, password, getPasswordOptions(passwordOptions))

        walletsWorker.postMessage(upgrade.upgradeSuccess(
          upgradeWallet(items, walletId, password, data, mnemonicOptionsUser),
        ))
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err)

        walletsWorker.postMessage(upgrade.upgradeError(err.message))
      }

      break
    }

    default:
      break
  }
}
