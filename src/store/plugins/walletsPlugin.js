// @flow strict

import uuidv4 from 'uuid/v4'
import { t } from 'ttag'
import { type Store } from 'redux'

import { gaSendEvent } from 'utils/analytics'
import { getPrivateKey } from 'utils/wallets'
import { selectPasswordPersist } from 'store/selectors/password'

import {
  selectWalletsItems,
  selectActiveWalletId,
} from 'store/selectors/wallets'

import {
  WalletNotFoundError,
  WalletInconsistentDataError,
} from 'errors'

import {
  setActiveWallet,
  setWalletsItems,
} from 'store/modules/wallets'

import {
  strip0x,
  checkAddressValid,
  getAddressChecksum,
  checkPrivateKeyValid,
  getAddressFromPrivateKey,
} from 'utils/address'

import {
  checkXkeyValid,
  getXPUBFromXPRV,
  checkMnemonicValid,
  getXPUBFromMnemonic,
  getXPRVFromMnemonic,
} from 'utils/mnemonic'

import {
  encryptData,
  decryptInternalKey,
  deriveKeyFromPassword,
} from 'utils/encryption'

export type ImportWalletPayload = {|
  +data: string,
  +name: string,
  +password: string,
  +passphrase: ?string,
  +derivationPath: ?string,
|}

export type WalletData = {|
  +id: string,
  +data: string,
  +name: string,
  +passphrase: ?string,
  +derivationPath: ?string,
  +orderIndex: number,
  +createdBlockNumber: ?WalletCreatedBlockNumber,
|}

function max(a: number, b: number): number {
  return (a > b) ? a : b
}

function removeWallet(items: Wallets, walletId: WalletId): Wallets {
  return items.filter(({ id }: Wallet): boolean => (walletId !== id))
}

function appendWallet(items: Wallets, wallet: Wallet): Wallets {
  /* eslint-disable-next-line fp/no-mutating-methods */
  return [
    ...items,
    wallet,
  ].sort((a: Wallet, b: Wallet): number => {
    if (a.orderIndex === b.orderIndex) {
      return 0
    }

    return (a.orderIndex > b.orderIndex) ? 1 : -1
  })
  /* eslint-enable-next-line fp/no-mutating-methods */
}

class WalletsPlugin {
  store: ?Store<AppState, any>

  constructor() {
    this.store = null
  }

  connect = (store: Store<AppState, any>) => {
    this.store = store
  }

  getState = (): AppState => {
    if (!this.store) {
      throw new Error('Plugin error')
    }

    return this.store.getState()
  }

  dispatch = (action: Object) => {
    if (!this.store) {
      throw new Error('Plugin error')
    }

    return this.store.dispatch(action)
  }

  getItems = (): Wallets => selectWalletsItems(this.getState())

  getInternalKey = async (password: string): Promise<?Uint8Array> => {
    const state: AppState = this.getState()

    const {
      salt,
      internalKey,
    }: PasswordPersist = selectPasswordPersist(state)

    if (!internalKey) {
      return null
    }

    const derivedKey: ?Uint8Array = !password ? null : await deriveKeyFromPassword(
      password,
      salt,
    )

    const internalKeyDec: ?Uint8Array = !derivedKey ? null : decryptInternalKey(
      internalKey,
      derivedKey,
    )

    return internalKeyDec
  }

  createMnemonicWallet = (
    walletData: WalletData,
    internalKey: Uint8Array,
  ): Wallet => {
    const {
      id,
      data,
      name,
      passphrase,
      derivationPath,
      orderIndex,
      createdBlockNumber,
    }: WalletData = walletData

    const mnemonic: string = data.toLowerCase()
    const xpub: string = getXPUBFromMnemonic(mnemonic, passphrase, derivationPath)
    const xprv: string = getXPRVFromMnemonic(mnemonic, passphrase, derivationPath)

    return {
      id,
      xpub,
      name,
      orderIndex,
      derivationPath,
      createdBlockNumber,
      addressIndex: 0,
      isReadOnly: false,
      isSimplified: true,
      type: 'mnemonic',
      customType: 'mnemonic',
      encrypted: {
        privateKey: null,
        xprv: encryptData({
          key: internalKey,
          data: xprv,
        }),
        mnemonic: encryptData({
          key: internalKey,
          data: mnemonic,
        }),
        passphrase: encryptData({
          key: internalKey,
          data: passphrase || '',
        }),
      },
      /**
       * Another wallet data, necessary for consistency of types
       */
      address: null,
    }
  }

  createXPRVWallet = (
    walletData: WalletData,
    internalKey: Uint8Array,
  ): Wallet => {
    const {
      id,
      data,
      name,
      orderIndex,
      createdBlockNumber,
    }: WalletData = walletData

    return {
      id,
      name,
      orderIndex,
      createdBlockNumber,
      addressIndex: 0,
      type: 'mnemonic',
      isReadOnly: false,
      isSimplified: true,
      customType: 'xprv',
      xpub: getXPUBFromXPRV(data),
      encrypted: {
        mnemonic: null,
        privateKey: null,
        passphrase: null,
        xprv: encryptData({
          data,
          key: internalKey,
        }),
      },
      /**
       * Another wallet data, necessary for consistency of types
       */
      address: null,
      derivationPath: null,
    }
  }

  createXPUBWallet = ({
    id,
    data,
    name,
    orderIndex,
    createdBlockNumber,
  }: WalletData): Wallet => ({
    id,
    name,
    orderIndex,
    createdBlockNumber,
    xpub: data,
    addressIndex: 0,
    isReadOnly: true,
    type: 'mnemonic',
    customType: 'xpub',
    isSimplified: true,
    encrypted: {
      xprv: null,
      mnemonic: null,
      privateKey: null,
      passphrase: null,
    },
    /**
     * Another wallet data, necessary for consistency of types
     */
    address: null,
    derivationPath: null,
  })

  createPrivateKeyWallet = (
    walletData: WalletData,
    internalKey: Uint8Array,
  ): Wallet => {
    const {
      id,
      data,
      name,
      orderIndex,
      createdBlockNumber,
    }: WalletData = walletData

    const privateKey: string = data.toLowerCase()

    return {
      id,
      name,
      orderIndex,
      createdBlockNumber,
      type: 'address',
      isReadOnly: false,
      customType: 'privateKey',
      address: getAddressFromPrivateKey(privateKey),
      encrypted: {
        xprv: null,
        mnemonic: null,
        passphrase: null,
        privateKey: encryptData({
          key: internalKey,
          data: strip0x(privateKey),
        }),
      },
      /**
       * Another wallet data, necessary for consistency of types
       */
      xpub: null,
      isSimplified: null,
      addressIndex: null,
      derivationPath: null,
    }
  }

  createAddressWallet = ({
    id,
    data,
    name,
    orderIndex,
    createdBlockNumber,
  }: WalletData): Wallet => ({
    id,
    name,
    orderIndex,
    createdBlockNumber,
    type: 'address',
    isReadOnly: true,
    customType: 'address',
    address: getAddressChecksum(data),
    encrypted: {
      xprv: null,
      mnemonic: null,
      passphrase: null,
      privateKey: null,
    },
    /**
     * Another wallet data, necessary for consistency of types
     */
    xpub: null,
    isSimplified: null,
    addressIndex: null,
    derivationPath: null,
  })

  createWallet = (
    walletData: WalletData,
    internalKey: ?Uint8Array,
  ): Wallet => {
    const { data }: WalletData = walletData

    if (!internalKey) {
      if (checkXkeyValid(data, 'pub')) {
        return this.createXPUBWallet(walletData)
      } else if (checkAddressValid(data)) {
        return this.createAddressWallet(walletData)
      }
    } else if (checkMnemonicValid(data)) {
      return this.createMnemonicWallet(
        walletData,
        internalKey,
      )
    } else if (checkXkeyValid(data, 'prv')) {
      return this.createXPRVWallet(
        walletData,
        internalKey,
      )
    } else if (checkPrivateKeyValid(data)) {
      return this.createPrivateKeyWallet(
        walletData,
        internalKey,
      )
    }

    throw new WalletInconsistentDataError('createWallet data error')
  }

  importWallet = async (
    {
      data,
      name,
      password,
      passphrase,
      derivationPath,
    }: FormFields,
    createdBlockNumber?: ?WalletCreatedBlockNumber = null,
  ): ?FormFields => {
    if (!(data && name)) {
      throw new Error(t`Invalid wallet data`)
    }

    try {
      const internalKey: ?Uint8Array = await this.getInternalKey(password || '')

      const newWallet: Wallet = this.createWallet({
        passphrase,
        derivationPath,
        createdBlockNumber,
        id: uuidv4(),
        data: data.trim(),
        name: name.trim(),
        orderIndex: this.getNextOrderIndex(),
      }, internalKey)

      const items: Wallets = this.getItems()
      const newItems: Wallets = appendWallet(items, newWallet)

      if (newItems.length === 1) {
        this.dispatch(setActiveWallet(newWallet.id))
      }

      this.dispatch(setWalletsItems(newItems))

      if (createdBlockNumber) {
        gaSendEvent('CreateWallet', 'WalletCreated')
      } else {
        gaSendEvent('ImportWallet', 'WalletCreated')
      }
    } catch (err) {
      if (createdBlockNumber) {
        gaSendEvent('CreateWallet', 'WalletCreationError')
      } else {
        gaSendEvent('ImportWallet', 'WalletCreationError')
      }

      return {
        password: t`Invalid password`,
      }
    }

    return null
  }

  getNextOrderIndex = (): number => {
    const items: Wallets = this.getItems()
    const initial: number = items.length

    const current: number = items.reduce((
      result: number,
      { orderIndex }: Wallet,
    ): number => max(result, orderIndex), initial)

    return (current + 1)
  }

  checkWalletUniqueness = (
    uniqueProperty: string,
    propertyName: string,
  ): void => {
    const items: Wallets = this.getItems()

    const foundWallet: ?Wallet = items.find((wallet: Wallet): boolean => {
      const propertyValue: string = wallet[propertyName]

      return propertyValue ? (propertyValue.toLowerCase() === uniqueProperty.toLowerCase()) : false
    })

    if (foundWallet) {
      throw new Error(t`Wallet with such ${propertyName} already exists`)
    }
  }

  getWallet = (walletId: WalletId): Wallet => {
    const items: Wallets = this.getItems()
    const wallet: ?Wallet = items.find(({ id }: Wallet): boolean => (walletId === id))

    if (!wallet) {
      throw new WalletNotFoundError({ walletId })
    }

    return { ...wallet }
  }

  updateWallet = (
    walletId: WalletId,
    updatedData: WalletUpdatedData,
  ): Wallets => {
    const {
      encrypted,
      name,
      xpub,
      derivationPath,
      customType,
      addressIndex,
      isReadOnly,
      isSimplified,
    }: WalletUpdatedData = updatedData

    const wallet: Wallet = this.getWallet(walletId)

    const newWallet: Wallet = {
      ...wallet,
      encrypted: encrypted || wallet.encrypted,
      name: name || wallet.name,
      xpub: xpub || wallet.xpub,
      customType: customType || wallet.customType,
      derivationPath: derivationPath || wallet.derivationPath,
      addressIndex: (addressIndex != null) ? addressIndex : wallet.addressIndex,
      isReadOnly: (typeof (isReadOnly) === 'boolean') ? isReadOnly : wallet.isReadOnly,
      isSimplified: (typeof (isSimplified) === 'boolean') ? isSimplified : wallet.isSimplified,
    }

    const items: Wallets = this.getItems()
    const itemsRemoved: Wallets = removeWallet(items, walletId)
    const itemsAppended: Wallets = appendWallet(itemsRemoved, newWallet)

    this.dispatch(setWalletsItems(itemsAppended))

    return itemsAppended
  }

  checkWalletReadOnly = (walletId: WalletId): boolean => {
    const { customType }: Wallet = this.getWallet(walletId)

    return ['address', 'xpub'].includes(customType)
  }

  removeWallet = (walletId: WalletId): Wallets => {
    const items: Wallets = this.getItems()
    const newItems: Wallets = removeWallet(items, walletId)
    const activeWalletId: ?WalletId = selectActiveWalletId(this.getState())

    if (walletId === activeWalletId) {
      const firstWallet: ?Wallet = newItems[0]
      this.dispatch(setActiveWallet(firstWallet ? firstWallet.id : null))
    }

    this.dispatch(setWalletsItems(newItems))

    return newItems
  }

  getPrivateKey = async (walletId: WalletId, password: string): Promise<string> => {
    const wallet: Wallet = this.getWallet(walletId)
    const internalKey: ?Uint8Array = await this.getInternalKey(password || '')

    if (!internalKey) {
      throw new WalletInconsistentDataError('getPrivateKey data error')
    }

    return getPrivateKey(wallet, internalKey)
  }
}

export const walletsPlugin = new WalletsPlugin()
