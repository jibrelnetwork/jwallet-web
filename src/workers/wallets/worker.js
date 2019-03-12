// @flow

import generateMnemonic from 'utils/mnemonic/generateMnemonic'

import {
  createWallet,
  upgradeWallet,
  getBackupData,
  getPrivateKey,
} from 'utils/wallets'

import {
  decryptInternalKey,
  encryptInternalKey,
  deriveKeyFromPassword,
} from 'utils/encryption'

import { WalletInconsistentDataError } from 'errors'

/* eslint-disable import/no-duplicates */
import * as upgrade from 'store/modules/upgrade'
import * as wallets from 'store/modules/wallets'
import * as walletsCreate from 'store/modules/walletsCreate'
import * as walletsImport from 'store/modules/walletsImport'
import * as walletsBackup from 'store/modules/walletsBackup'

import { type UpgradeAction } from 'store/modules/upgrade'
import { type WalletsAction } from 'store/modules/wallets'
import { type WalletsCreateAction } from 'store/modules/walletsCreate'
import { type WalletsImportAction } from 'store/modules/walletsImport'
import { type WalletsBackupAction } from 'store/modules/walletsBackup'
/* eslint-enable import/no-duplicates */

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
          internalKey,
          passwordOptions,
          mnemonicOptions,
          createdBlockNumber,
          name,
          password,
        } = action.payload

        const {
          salt,
          scryptParams,
          encryptionType,
          derivedKeyLength,
        }: PasswordOptions = passwordOptions

        const dk: Uint8Array = deriveKeyFromPassword(password, scryptParams, derivedKeyLength, salt)
        const internalKeyDec: Uint8Array = decryptInternalKey(internalKey, dk, encryptionType)

        walletsWorker.postMessage(walletsCreate.createSuccess({
          passwordOptions,
          internalKey: internalKey || encryptInternalKey(internalKeyDec, dk, encryptionType),
          items: createWallet(items, {
            name,
            mnemonicOptions,
            createdBlockNumber,
            isSimplified: true,
            data: generateMnemonic(),
          }, internalKeyDec, encryptionType),
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
          internalKey,
          passwordOptions,
          mnemonicOptions,
          data,
          name,
          password,
        } = action.payload

        const {
          salt,
          scryptParams,
          encryptionType,
          derivedKeyLength,
        }: PasswordOptions = passwordOptions

        const dk: Uint8Array = deriveKeyFromPassword(password, scryptParams, derivedKeyLength, salt)
        const internalKeyDec: Uint8Array = decryptInternalKey(internalKey, dk, encryptionType)

        walletsWorker.postMessage(walletsImport.importSuccess({
          passwordOptions,
          internalKey: internalKey || encryptInternalKey(internalKeyDec, dk, encryptionType),
          items: createWallet(items, {
            data,
            name,
            mnemonicOptions,
            isSimplified: true,
          }, internalKeyDec, encryptionType),
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
        const {
          items,
          walletId,
          password,
          internalKey,
          passwordOptions,
        } = action.payload

        if (!passwordOptions) {
          throw new WalletInconsistentDataError('Invalid password options', walletId)
        }

        const {
          salt,
          scryptParams,
          encryptionType,
          derivedKeyLength,
        }: PasswordOptions = passwordOptions

        const dk: Uint8Array = deriveKeyFromPassword(password, scryptParams, derivedKeyLength, salt)
        const internalKeyDec: Uint8Array = decryptInternalKey(internalKey, dk, encryptionType)

        const data: string = getBackupData(items, walletId, internalKeyDec, encryptionType)
        walletsWorker.postMessage(walletsBackup.backupSuccess(data))
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err)

        walletsWorker.postMessage(walletsBackup.backupError(err.message))
      }

      break
    }

    case wallets.PRIVATE_KEY_REQUEST: {
      try {
        const {
          wallet,
          password,
          internalKey,
          passwordOptions,
        } = action.payload

        if (!passwordOptions) {
          throw new WalletInconsistentDataError('Invalid password options', wallet.id)
        }

        const {
          salt,
          scryptParams,
          encryptionType,
          derivedKeyLength,
        }: PasswordOptions = passwordOptions

        const dk: Uint8Array = deriveKeyFromPassword(password, scryptParams, derivedKeyLength, salt)
        const internalKeyDec: Uint8Array = decryptInternalKey(internalKey, dk, encryptionType)

        const privateKey: string = getPrivateKey(wallet, internalKeyDec, encryptionType)
        walletsWorker.postMessage(wallets.privateKeySuccess(wallet.id, privateKey))
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err)

        walletsWorker.postMessage(wallets.privateKeyError(action.payload.wallet.id, err.message))
      }

      break
    }

    case upgrade.UPGRADE_REQUEST: {
      try {
        const {
          items,
          data,
          password,
          walletId,
          internalKey,
          passwordOptions,
          mnemonicOptions,
        } = action.payload

        const {
          salt,
          scryptParams,
          encryptionType,
          derivedKeyLength,
        }: PasswordOptions = passwordOptions

        const dk: Uint8Array = deriveKeyFromPassword(password, scryptParams, derivedKeyLength, salt)
        const internalKeyDec: Uint8Array = decryptInternalKey(internalKey, dk, encryptionType)

        walletsWorker.postMessage(upgrade.upgradeSuccess(upgradeWallet({
          items,
          walletId,
          data,
          mnemonicOptions,
          encryptionType,
          internalKey: internalKeyDec,
        })))
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
