// @flow strict

import uuidv4 from 'uuid/v4'
import { t } from 'ttag'
import { type Store } from 'redux'
import { actions as router5Actions } from 'redux-router5'

import { WalletInconsistentDataError } from 'errors'
import { selectWalletsItems } from 'store/selectors/wallets'
import { selectPasswordPersist } from 'store/selectors/password'

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
|}

function max(a: number, b: number): number {
  return (a > b) ? a : b
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

  appendWallet(wallet: Wallet): Wallets {
    const items: Wallets = this.getItems()

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
    }: WalletData = walletData

    const mnemonic: string = data.toLowerCase()
    const xpub: string = getXPUBFromMnemonic(mnemonic, passphrase, derivationPath)
    const xprv: string = getXPRVFromMnemonic(mnemonic, passphrase, derivationPath)
    this.checkWalletUniqueness(xpub, 'xpub')

    return {
      id,
      xpub,
      name,
      orderIndex,
      derivationPath,
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
      createdBlockNumber: null,
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
    }: WalletData = walletData

    const xpub: string = getXPUBFromXPRV(data)
    this.checkWalletUniqueness(xpub, 'xpub')

    return {
      id,
      xpub,
      name,
      orderIndex,
      addressIndex: 0,
      type: 'mnemonic',
      isReadOnly: false,
      isSimplified: true,
      customType: 'xprv',
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
      createdBlockNumber: null,
    }
  }

  createXPUBWallet = ({
    id,
    data,
    name,
    orderIndex,
  }: WalletData): Wallet => {
    this.checkWalletUniqueness(data, 'xpub')

    return {
      id,
      name,
      orderIndex,
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
      createdBlockNumber: null,
    }
  }

  createPrivateKeyWallet = (
    walletData: WalletData,
    internalKey: Uint8Array,
  ): Wallet => {
    const {
      id,
      data,
      name,
      orderIndex,
    }: WalletData = walletData

    const privateKey: string = data.toLowerCase()
    const address: string = getAddressFromPrivateKey(privateKey)
    this.checkWalletUniqueness(address, 'address')

    return {
      id,
      name,
      address,
      orderIndex,
      type: 'address',
      isReadOnly: false,
      customType: 'privateKey',
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
      createdBlockNumber: null,
    }
  }

  createAddressWallet = ({
    id,
    data,
    name,
    orderIndex,
  }: WalletData): Wallet => {
    this.checkWalletUniqueness(data, 'address')

    return {
      id,
      name,
      orderIndex,
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
      createdBlockNumber: null,
    }
  }

  createWallet = (
    walletData: WalletData,
    internalKey: Uint8Array,
  ): Wallet => {
    const { data }: WalletData = walletData

    if (checkMnemonicValid(data)) {
      return this.createMnemonicWallet(
        walletData,
        internalKey,
      )
    } else if (checkXkeyValid(data, 'prv')) {
      return this.createXPRVWallet(
        walletData,
        internalKey,
      )
    } else if (checkXkeyValid(data, 'pub')) {
      return this.createXPUBWallet(walletData)
    } else if (checkPrivateKeyValid(data)) {
      return this.createPrivateKeyWallet(
        walletData,
        internalKey,
      )
    } else if (checkAddressValid(data)) {
      return this.createAddressWallet(walletData)
    } else {
      throw new WalletInconsistentDataError('createWallet data error')
    }
  }

  importWallet = async ({
    data,
    name,
    password,
    passphrase,
    derivationPath,
  }: FormFields): ?FormFields => {
    if (!data || !name || !password) {
      throw new Error(t`Invalid wallet data`)
    }

    this.checkWalletUniqueness(name, 'name')
    const state: AppState = this.getState()

    const {
      internalKey,
      salt,
    }: PasswordPersist = selectPasswordPersist(state)

    if (!internalKey) {
      throw new Error(t`Invalid password data`)
    }

    const derivedKey: Uint8Array = await deriveKeyFromPassword(
      password,
      salt,
    )

    try {
      const internalKeyDec: Uint8Array = decryptInternalKey(
        internalKey,
        derivedKey,
      )

      const newWallet: Wallet = this.createWallet({
        data,
        name,
        passphrase,
        derivationPath,
        id: uuidv4(),
        orderIndex: this.getNextOrderIndex(),
      }, internalKeyDec)

      const newWallets: Wallets = this.appendWallet(newWallet)

      this.dispatch(setWalletsItems(newWallets))
      this.dispatch(router5Actions.navigateTo('Wallets'))

      if (newWallets.length === 1) {
        this.dispatch(setActiveWallet(newWallet.id))
      }
    } catch (err) {
      return {
        password: err.message,
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
      throw new Error(t`Wallet with such ${foundWallet.name} already exists`)
    }
  }
}

export const walletsPlugin = new WalletsPlugin()
