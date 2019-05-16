// @flow

import {
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
    case wallets.CREATE_REQUEST: {
      try {
        const {
          internalKey,
          passwordOptions,
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

        walletsWorker.postMessage(wallets.createSuccess({
          passwordOptions,
          internalKey: internalKey || encryptInternalKey(internalKeyDec, dk, encryptionType),
          items: [],
        }))
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err)

        walletsWorker.postMessage(wallets.createError(err.message))
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
          throw new WalletInconsistentDataError({ walletId }, 'Invalid password options')
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
          throw new WalletInconsistentDataError({ walletId: wallet.id }, 'Invalid password options')
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
