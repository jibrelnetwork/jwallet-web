// @flow strict

import { getXPRVFromMnemonic } from 'utils/mnemonic'

import * as type from 'utils/type'
import * as encryption from 'utils/encryption'

async function getEmptyLatest(): Promise<WalletsPersist> {
  return {
    items: [],
    activeWalletId: null,
    version: 1,
  }
}

function migrateWalletToV1WithPasswordV1(
  item: any,
  internalKey: Uint8Array,
): ?WalletV1 {
  if (type.isVoid(item) || !type.isObject(item)) {
    return null
  }

  const {
    encrypted,
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

async function migrateWalletsToV1WithPasswordV1(
  walletsPersist: Object,
  passwordPersist: Object,
  password: string,
): Promise<WalletsPersistV1> {
  const {
    items,
    activeWalletId,
  }: Object = walletsPersist

  const {
    salt,
    internalKey,
  }: Object = passwordPersist

  if (
    type.isVoid(internalKey) ||
    !type.isObject(internalKey) ||
    !type.isString(salt)
  ) {
    return getEmptyLatest()
  }

  const derivedKey: Uint8Array = await encryption.deriveKeyFromPassword(
    password,
    salt,
  )

  const internalKeyDec: Uint8Array = encryption.decryptInternalKey(
    internalKey,
    derivedKey,
  )

  const itemsNew: WalletV1[] = items.map((item: any): ?WalletV1 => migrateWalletToV1WithPasswordV1(
    item,
    internalKeyDec,
  )).filter((item: ?WalletV1): boolean => !!item)

  return {
    version: 1,
    items: itemsNew,
    activeWalletId: activeWalletId || itemsNew.length ? itemsNew[0].id : null,
  }
}

function migrateWalletsToV1(
  walletsPersist: Object,
  passwordPersist: Object,
  password: string,
): Promise<WalletsPersistV1> {
  if (!passwordPersist.version) {
    return getEmptyLatest()
  }

  switch (passwordPersist.version) {
    case 1:
      return migrateWalletsToV1WithPasswordV1(
        walletsPersist,
        passwordPersist,
        password,
      )

    default:
      return getEmptyLatest()
  }
}

export async function migrateWallets(
  state: Object,
  password: string,
): Promise<WalletsPersist> {
  const walletsData: Object = state.wallets

  if (type.isVoid(walletsData) || !type.isObject(walletsData)) {
    return getEmptyLatest()
  }

  const walletsPersist: Object = walletsData.persist

  if (type.isVoid(walletsPersist) || !type.isObject(walletsPersist)) {
    return getEmptyLatest()
  }

  const passwordData: Object = state.password

  if (type.isVoid(passwordData) || !type.isObject(passwordData)) {
    return getEmptyLatest()
  }

  const passwordPersist: Object = passwordData.persist

  if (type.isVoid(passwordPersist) || !type.isObject(passwordPersist)) {
    return getEmptyLatest()
  }

  if (!walletsPersist.version) {
    return migrateWalletsToV1(
      walletsPersist,
      passwordPersist,
      password,
    )
  }

  switch (walletsPersist.version) {
    case 1:
      return walletsPersist

    default:
      return getEmptyLatest()
  }
}
