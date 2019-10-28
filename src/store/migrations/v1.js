// @flow strict

import { gaSendException } from 'utils/analytics'
import { getXPRVFromMnemonic } from 'utils/mnemonic'

import config from 'config'
import { CONDITIONS_LIST } from 'data/agreements'
import * as type from 'utils/type'
import * as encryption from 'utils/encryption'

import { getAgreementValue } from './getAgreementValue'

import {
  getStoreData,
  setStoreData,
  initTransaction,
  getStoreVersion,
  setStoreVersion,
  deleteStoreData,
} from './db'

const STORAGE_VERSION: number = config.storageVersion
const USER_STORE_KEY: string = 'persist:jwallet-web-user'
const NOTES_STORE_KEY: string = 'persist:jwallet-web-notes'
const BLOCKS_STORE_KEY: string = 'persist:jwallet-web-blocks'
const TICKER_STORE_KEY: string = 'persist:jwallet-web-ticker'
const WALLETS_STORE_KEY: string = 'persist:jwallet-web-wallets'
const BALANCES_STORE_KEY: string = 'persist:jwallet-web-balances'
const NETWORKS_STORE_KEY: string = 'persist:jwallet-web-networks'
const PASSWORD_STORE_KEY: string = 'persist:jwallet-web-password'
const SETTINGS_STORE_KEY: string = 'persist:jwallet-web-settings'
const CONTACTS_STORE_KEY: string = 'persist:jwallet-web-favorites'
const TRANSACTIONS_STORE_KEY: string = 'persist:jwallet-web-transactions'
const DIGITAL_ASSETS_STORE_KEY: string = 'persist:jwallet-web-digitalAssets'
const WALLETS_ADDRESSES_STORE_KEY: string = 'persist:jwallet-web-walletsAddresses'

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

function cutStr(
  name: ?string,
  length?: number = 32,
): string {
  if (!name) {
    return ''
  }

  if (name.length <= length) {
    return name
  }

  return name.substr(0, length)
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
        name: cutStr(name),
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
        name: cutStr(name),
        encrypted: {
          ...encrypted,
          xprv: null,
        },
      }

    case 'bip32Xpub':
      return !type.isString(bip32XPublicKey) ? null : {
        ...item,
        name: cutStr(name),
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
      }).replace(/^ +/, '') // trim spaces from start

      return {
        ...item,
        derivationIndex: 0,
        name: cutStr(name),
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

export function migrateUserToV1(settingsStored: Object): UserPersistV1 {
  const agreementsConditions: Object = CONDITIONS_LIST.reduce((
    result: Object,
    key: string,
  ) => ({
    ...result,
    [key]: getAgreementValue(key),
  }), {})

  return {
    agreementsConditions,
    language: 'en',
    fiatCurrency: settingsStored.fiatCurrency || 'USD',
    isIntroductionPassed: true,
    isAgreementsConfirmed: CONDITIONS_LIST.every(key => !!agreementsConditions[key]),
  }
}

export function migrateNotesToV1(notesStored: Object): CommentsPersistV1 {
  const notes: ?Object = notesStored.items

  return {
    items: !notes ? {} : Object.keys(notes).reduce((
      result: Comments,
      key: CommentId,
    ) => ({
      ...result,
      [key]: cutStr(
        notes[key],
        256,
      ),
    }), {}),
  }
}

export function migrateContactsToV1(contactsStored: Object): FavoritesPersistV1 {
  const favorites: ?Object = contactsStored.items

  return {
    items: !favorites ? {} : Object.keys(favorites).reduce((
      reduceResult: Favorites,
      key: Address,
    ) => {
      const item: ?Favorite = favorites[key]

      if (!item) {
        return reduceResult
      }

      reduceResult[key] = {
        ...item,
        name: cutStr(item.name),
        description: cutStr(
          item.description,
          256,
        ),
      }

      return reduceResult
    }, {}),
  }
}

export function migrateDigitalAssetsToV1(digitalAssetsStored: Object): DigitalAssetsPersistV1 {
  const digitalAssets: ?Object = digitalAssetsStored.items

  return {
    items: !digitalAssets ? {} : Object.keys(digitalAssets).reduce((
      reduceResult: DigitalAssets,
      key: AssetAddress,
    ) => {
      const item: ?DigitalAsset = digitalAssets[key]

      if (!item) {
        return reduceResult
      }

      if (!item.isCustom) {
        reduceResult[key] = item

        return reduceResult
      }

      reduceResult[key] = {
        ...item,
        name: cutStr(item.name),
        symbol: cutStr(
          item.symbol,
          5,
        ),
      }

      return reduceResult
    }, {}),
  }
}

export function migrateWalletsAddressesToV1(
  walletsAddressesStored: Object,
): WalletsAddressesPersistV1 {
  const walletsAddresses: ?Object = walletsAddressesStored.addressNames

  return {
    addressNames: !walletsAddresses ? {} : Object.keys(walletsAddresses).reduce((
      result: AddressNames,
      key: Address,
    ) => ({
      ...result,
      [key]: cutStr(walletsAddresses[key]),
    }), {}),
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
    const notesStored: Object = await getStoreData(NOTES_STORE_KEY)
    const contactsStored: Object = await getStoreData(CONTACTS_STORE_KEY)
    const settingsStored: Object = await getStoreData(SETTINGS_STORE_KEY)
    const digitalAssetsStored: Object = await getStoreData(DIGITAL_ASSETS_STORE_KEY)
    const walletsAddressesStored: Object = await getStoreData(WALLETS_ADDRESSES_STORE_KEY)

    const userPersist: UserPersistV1 = migrateUserToV1(settingsStored)
    const notesPersist: CommentsPersistV1 = migrateNotesToV1(notesStored)
    const contactsPersist: FavoritesPersistV1 = migrateContactsToV1(contactsStored)

    const digitalAssetsPersist: DigitalAssetsPersistV1 = migrateDigitalAssetsToV1(
      digitalAssetsStored,
    )

    const walletsAddressesPersist: WalletsAddressesPersistV1 = migrateWalletsAddressesToV1(
      walletsAddressesStored,
    )

    const transaction: IDBTransaction = await initTransaction()

    await deleteStoreData(BLOCKS_STORE_KEY, transaction)
    await deleteStoreData(TICKER_STORE_KEY, transaction)
    await deleteStoreData(BALANCES_STORE_KEY, transaction)
    await deleteStoreData(NETWORKS_STORE_KEY, transaction)
    await deleteStoreData(TRANSACTIONS_STORE_KEY, transaction)

    await setStoreData(walletsPersist, WALLETS_STORE_KEY, transaction)
    await setStoreData(passwordPersist, PASSWORD_STORE_KEY, transaction)

    await setStoreData(userPersist, USER_STORE_KEY, transaction)
    await setStoreData(notesPersist, NOTES_STORE_KEY, transaction)
    await setStoreData(contactsPersist, CONTACTS_STORE_KEY, transaction)
    await setStoreData(digitalAssetsPersist, DIGITAL_ASSETS_STORE_KEY, transaction)
    await setStoreData(walletsAddressesPersist, WALLETS_ADDRESSES_STORE_KEY, transaction)

    await setStoreVersion(STORAGE_VERSION, transaction)
  } catch (error) {
    console.error(error)

    gaSendException({
      exDescription: `StorageTransactionError: ${error.message}`,
      exFatal: true,
    })
  }
}
