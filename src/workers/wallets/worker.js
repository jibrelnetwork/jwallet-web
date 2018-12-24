// @flow

import utils from '@jibrelnetwork/jwallet-web-keystore'

import keystore from 'services/keystore'

import * as wallets from 'routes/Wallets/modules/wallets'
import * as walletsCreate from 'routes/Wallets/routes/Create/modules/walletsCreate'
import * as walletsImport from 'routes/Wallets/routes/Import/modules/walletsImport'
import * as walletsBackup from 'routes/Wallets/routes/Backup/modules/walletsBackup'

import type { WalletsAction } from 'routes/Wallets/modules/wallets'
import type { WalletsCreateAction } from 'routes/Wallets/routes/Create/modules/walletsCreate'
import type { WalletsImportAction } from 'routes/Wallets/routes/Import/modules/walletsImport'
import type { WalletsBackupAction } from 'routes/Wallets/routes/Backup/modules/walletsBackup'

export type WalletsAnyAction =
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

        const passwordOpts: PasswordOptions = utils.getPasswordOptions(passwordOptions)
        const mnemonicOpts: MnemonicOptions = utils.getMnemonicOptions(mnemonicOptions)

        if (testPasswordData) {
          keystore.checkPassword(testPasswordData, password, passwordOpts)
        }

        walletsWorker.postMessage(walletsCreate.createSuccess({
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
        } = action.payload

        const passwordOpts: PasswordOptions = utils.getPasswordOptions(passwordOptions)
        const mnemonicOpts: MnemonicOptions = utils.getMnemonicOptions(mnemonicOptions)

        if (testPasswordData) {
          keystore.checkPassword(testPasswordData, password, passwordOpts)
        }

        walletsWorker.postMessage(walletsImport.importSuccess({
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

    case wallets.PRIVATE_KEY_REQUEST: {
      const { wallet, password } = action.payload

      try {
        const privateKey: string = keystore.getPrivateKey(wallet, password)

        walletsWorker.postMessage(wallets.privateKeySuccess(wallet.id, privateKey))
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err)

        walletsWorker.postMessage(wallets.privateKeyError(wallet.id, err.message))
      }

      break
    }

    default:
      break
  }
}
