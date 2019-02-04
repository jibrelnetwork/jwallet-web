// @flow

import { t } from 'ttag'

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
          throw new Error(t`WalletsDataError`)
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
          throw new Error(t`WalletsDataError`)
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
