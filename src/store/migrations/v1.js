// @flow strict

import { gaSendException } from 'utils/analytics'
import { getXPRVFromMnemonic } from 'utils/mnemonic'

import config from 'config'
import * as type from 'utils/type'
import * as encryption from 'utils/encryption'

import {
  getStoreData,
  setStoreData,
  initTransaction,
  getStoreVersion,
  setStoreVersion,
  deleteStoreData,
} from './db'

const STORAGE_VERSION: number = config.storageVersion
const WALLETS_STORE_KEY: string = 'persist:jwallet-web-wallets'
const PASSWORD_STORE_KEY: string = 'persist:jwallet-web-password'
const TRANSACTIONS_STORE_KEY: string = 'persist:jwallet-web-transactions'

export async function checkMigrationV1Needed(): Promise<boolean> {
  try {
    const currentVersion: number = await getStoreVersion()
    const walletsStored: Object = await getStoreData(WALLETS_STORE_KEY)

    const {
      items,
      internalKey,
    }: Object = walletsStored

    return (STORAGE_VERSION > currentVersion) && !!(internalKey || (items && items.length))
  } catch (error) {
    return false
  }
}

function cutWalletName(name: string): string {
  if (name.length < 33) {
    return name
  }

  return name.substr(0, 32)
}

function migrateWalletToV1(
  item: any,
  internalKey: Uint8Array,
): ?WalletV1 {
  if (type.isVoid(item) || !type.isObject(item)) {
    return null
  }

  const {
    encrypted,
    name,
    customType,
    derivationPath,
    bip32XPublicKey,
  }: Object = item

  switch (customType) {
    case 'address':
      return {
        ...item,
        xpub: null,
        derivationIndex: null,
        name: cutWalletName(name),
        encrypted: (!type.isVoid(encrypted) && type.isObject(encrypted)) ? {
          ...encrypted,
          xprv: null,
        } : {
          xprv: null,
          mnemonic: null,
          passphrase: null,
          privateKey: null,
        },
      }

    case 'privateKey':
      return (type.isVoid(encrypted) || !type.isObject(encrypted)) ? null : {
        ...item,
        xpub: null,
        derivationIndex: null,
        name: cutWalletName(name),
        encrypted: {
          ...encrypted,
          xprv: null,
        },
      }

    case 'bip32Xpub':
      return !type.isString(bip32XPublicKey) ? null : {
        ...item,
        customType: 'xpub',
        derivationIndex: 0,
        xpub: bip32XPublicKey,
        name: cutWalletName(name),
        encrypted: (!type.isVoid(encrypted) && type.isObject(encrypted)) ? {
          ...encrypted,
          xprv: null,
        } : {
          xprv: null,
          mnemonic: null,
          passphrase: null,
          privateKey: null,
        },
      }

    case 'mnemonic': {
      if (
        type.isVoid(encrypted) ||
        !type.isObject(encrypted) ||
        type.isVoid(encrypted.mnemonic) ||
        !type.isObject(encrypted.mnemonic) ||
        type.isVoid(encrypted.passphrase) ||
        !type.isObject(encrypted.passphrase) ||
        !type.isString(derivationPath) ||
        !type.isString(bip32XPublicKey)
      ) {
        return null
      }

      const mnemonicDec: string = encryption.decryptData({
        key: internalKey,
        data: encrypted.mnemonic,
      }).trim()

      const passphraseDec: string = encryption.decryptData({
        key: internalKey,
        data: encrypted.passphrase,
      })

      return {
        ...item,
        derivationIndex: 0,
        xpub: bip32XPublicKey,
        name: cutWalletName(name),
        encrypted: {
          ...encrypted,
          xprv: encryption.encryptData({
            key: internalKey,
            data: getXPRVFromMnemonic(
              mnemonicDec,
              passphraseDec,
              derivationPath,
            ),
          }),
        },
      }
    }

    default:
      return null
  }
}

export async function migratePasswordToV1(walletsStored: Object): Promise<PasswordPersistV1> {
  const {
    internalKey,
    passwordOptions,
  }: Object = walletsStored

  if (
    type.isVoid(internalKey) ||
    !type.isObject(internalKey) ||
    type.isVoid(passwordOptions) ||
    !type.isObject(passwordOptions)
  ) {
    throw new TypeError('Inconsistent password data')
  }

  const {
    salt,
    passwordHint,
  }: Object = passwordOptions

  if (!type.isString(salt) || !type.isString(passwordHint)) {
    throw new TypeError('Inconsistent password data')
  }

  return {
    salt,
    internalKey,
    hint: passwordHint,
  }
}

export async function migrateWalletsToV1(
  password: string,
  walletsStored: Object,
  passwordPersist: PasswordPersistV1,
): Promise<WalletsPersistV1> {
  const {
    items,
    activeWalletId,
  }: Object = walletsStored

  const {
    salt,
    internalKey,
  }: PasswordPersistV1 = passwordPersist

  if (!internalKey) {
    throw new Error('Inconsistent password data')
  }

  const derivedKey: Uint8Array = await encryption.deriveKeyFromPassword(
    password,
    salt,
  )

  const internalKeyDec: Uint8Array = encryption.decryptInternalKey(
    internalKey,
    derivedKey,
  )

  const itemsNew: WalletV1[] = items.map((item: any): ?WalletV1 => migrateWalletToV1(
    item,
    internalKeyDec,
  )).filter((item: ?WalletV1): boolean => !!item)

  return {
    items: itemsNew,
    activeWalletId: activeWalletId || itemsNew.length ? itemsNew[0].id : null,
  }
}

export async function migrateToV1(password: string): Promise<void> {
  const walletsStored: Object = await getStoreData(WALLETS_STORE_KEY)
  const passwordPersist: PasswordPersistV1 = await migratePasswordToV1(walletsStored)

  const walletsPersist: WalletsPersistV1 = await migrateWalletsToV1(
    password,
    walletsStored,
    passwordPersist,
  )

  try {
    const transaction: IDBTransaction = await initTransaction()

    await deleteStoreData(TRANSACTIONS_STORE_KEY, transaction)
    await setStoreData(walletsPersist, WALLETS_STORE_KEY, transaction)
    await setStoreData(passwordPersist, PASSWORD_STORE_KEY, transaction)
    await setStoreVersion(STORAGE_VERSION, transaction)
  } catch (error) {
    console.error(error)

    gaSendException({
      exDescription: `StorageTransactionError: ${error.message}`,
      exFatal: true,
    })
  }
}
