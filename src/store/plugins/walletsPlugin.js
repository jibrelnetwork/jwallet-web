// @flow strict

import uuidv4 from 'uuid/v4'
import { t } from 'ttag'
import { type Store } from 'redux'

import { gaSendEvent } from 'utils/analytics'
import { setNewPassword } from 'store/modules/password'
import { selectPasswordPersist } from 'store/selectors/password'

import {
  getNonce,
  generateSalt,
  encryptInternalKey,
  decryptInternalKey,
  deriveKeyFromPassword,
} from 'utils/encryption'

import {
  setActiveWallet,
  setWalletsItems,
} from 'store/modules/wallets'

import {
  selectWalletsItems,
  selectActiveWalletId,
} from 'store/selectors/wallets'

import {
  WalletNotFoundError,
  WalletInconsistentDataError,
} from 'errors'

import * as walletsUtils from 'utils/wallets'

export type ImportWalletPayload = {|
  +data: string,
  +name: string,
  +password: string,
  +passphrase: ?string,
  +derivationPath: ?string,
|}

function max(
  a: number,
  b: number,
): number {
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

  getInternalKey = async (password: ?string): Promise<?Uint8Array> => {
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

      const newWallet: Wallet = walletsUtils.prepareWallet({
        passphrase,
        derivationPath,
        createdBlockNumber,
        id: uuidv4(),
        data: data.trim(),
        name: name.trim(),
        orderIndex: this.getNextOrderIndex(),
      }, internalKey)

      const items: Wallets = this.getItems()
      const newItems: Wallets = walletsUtils.appendWallet(items, newWallet)

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

    const foundWallet: ?Wallet = walletsUtils.findWalletByProperty(
      items,
      uniqueProperty,
      propertyName,
    )

    if (foundWallet) {
      throw new Error(t`Wallet with such ${foundWallet.name} already exists`)
    }
  }

  getWallet = (walletId: WalletId): Wallet => {
    const items: Wallets = this.getItems()

    const wallet: ?Wallet = walletsUtils.getWalletById(
      items,
      walletId,
    )

    if (!wallet) {
      throw new WalletNotFoundError({ walletId })
    }

    return { ...wallet }
  }

  updateWallet = (
    walletId: WalletId,
    updatedData: WalletUpdatedData,
    isRedirectBlocked: boolean = false,
  ): Wallets => {
    const wallet: Wallet = this.getWallet(walletId)
    const items: Wallets = this.getItems()
    const newItems: Wallets = walletsUtils.updateWallet(items, wallet, updatedData)

    this.dispatch(setWalletsItems(newItems, isRedirectBlocked))

    return newItems
  }

  checkWalletReadOnly = (walletId: WalletId): boolean => {
    const { customType }: Wallet = this.getWallet(walletId)

    return walletsUtils.checkReadOnlyType(customType)
  }

  removeWallet = (walletId: WalletId): Wallets => {
    const items: Wallets = this.getItems()
    const newItems: Wallets = walletsUtils.removeWallet(items, walletId)
    const activeWalletId: ?WalletId = selectActiveWalletId(this.getState())

    if (walletId === activeWalletId) {
      const firstWallet: ?Wallet = newItems[0]
      this.dispatch(setActiveWallet(firstWallet ? firstWallet.id : null))
    }

    this.dispatch(setWalletsItems(newItems))

    return newItems
  }

  getPrivateKey = async (
    walletId: WalletId,
    password: string,
  ): Promise<string> => {
    const wallet: Wallet = this.getWallet(walletId)
    const internalKey: ?Uint8Array = await this.getInternalKey(password || '')

    if (!internalKey) {
      throw new WalletInconsistentDataError('getPrivateKey data error')
    }

    return walletsUtils.getPrivateKey(wallet, internalKey)
  }

  getAddress = (walletId: WalletId): Address => {
    const wallet: Wallet = this.getWallet(walletId)

    return walletsUtils.getAddress(wallet)
  }

  getAddresses = (
    walletId: WalletId,
    start: number,
    end: number,
  ): Address[] => {
    const wallet: Wallet = this.getWallet(walletId)

    return walletsUtils.getAddresses(
      wallet,
      start,
      end,
    )
  }

  upgradeWallet = async (
    walletId: WalletId,
    values: FormFields,
  ): ?FormFields => {
    const {
      data,
      password,
      passphrase,
      derivationPath,
    }: FormFields = values

    try {
      const internalKey: ?Uint8Array = await this.getInternalKey(password)

      if (!internalKey) {
        throw new WalletInconsistentDataError('upgradeWallet data error')
      }

      this.updateWallet(
        walletId,
        walletsUtils.upgradeWallet({
          wallet: this.getWallet(walletId),
          data,
          passphrase,
          internalKey,
          derivationPath,
        }),
        true,
      )
    } catch (error) {
      gaSendEvent('UnlockFeatures', 'WalletUpgradeError')

      return {
        password: t`Invalid password`,
      }
    }

    return null
  }

  reEncryptWallets = async (
    password: string,
    newPassword: string,
    passwordHint: string,
  ): Promise<Wallets> => {
    const state: AppState = this.getState()

    const {
      salt,
      internalKey,
    }: PasswordPersist = selectPasswordPersist(state)

    if (!internalKey) {
      throw new WalletInconsistentDataError('reEncryptWallets data error')
    }

    if (!newPassword) {
      throw new WalletInconsistentDataError('password can\'t be empty')
    }

    const derivedKey: Uint8Array = await deriveKeyFromPassword(
      password,
      salt,
    )

    const internalKeyDec: Uint8Array = decryptInternalKey(
      internalKey,
      derivedKey,
    )

    const newSalt: string = generateSalt()
    const newInternalKey: Uint8Array = getNonce()

    const newDerivedKey: Uint8Array = await deriveKeyFromPassword(
      newPassword,
      newSalt,
    )

    const internalKeyEnc: EncryptedData = encryptInternalKey(
      newInternalKey,
      newDerivedKey,
    )

    const items: Wallets = this.getItems()

    const newItems: Wallets = items.map((wallet: Wallet) => walletsUtils.reEncryptWallet(
      wallet,
      internalKeyDec,
      newInternalKey,
    ))

    this.dispatch(setNewPassword({
      salt,
      internalKey: internalKeyEnc,
      hint: passwordHint || '',
    }))

    this.dispatch(setWalletsItems(newItems))

    return newItems
  }

  deriveOneMoreAddress = (walletId: WalletId): Wallets => {
    const { derivationIndex }: Wallet = this.getWallet(walletId)

    if (derivationIndex === null) {
      throw new WalletInconsistentDataError('derivationIndex doesn\'t exist')
    }

    return this.updateWallet(
      walletId, {
        derivationIndex: (derivationIndex + 1),
      },
      true,
    )
  }
}

export const walletsPlugin = new WalletsPlugin()
