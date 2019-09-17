// @flow strict

import uuidv4 from 'uuid/v4'
import Promise from 'bluebird'
// $FlowFixMe
import BigNumber from 'bignumber.js'
import { i18n } from 'i18n/lingui'
import { type Store } from 'redux'

import { web3 } from 'services'
import { gaSendEvent } from 'utils/analytics'
import { setNewPassword } from 'store/modules/password'
import { selectPasswordPersist } from 'store/selectors/password'
import { selectCurrentNetworkOrThrow } from 'store/selectors/networks'

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
  changeActiveAddress,
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

import { toastsPlugin } from '.'

export type ImportWalletPayload = {|
  +data: string,
  +name: string,
  +password: string,
  +passphrase: ?string,
  +derivationPath: ?string,
|}

const MINUTE: number = 60 * 1000

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
  getNetwork = (): Network => selectCurrentNetworkOrThrow(this.getState())

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
      throw new Error(i18n._(
        'WalletsImport.errors.dataInvalid',
        null,
        { defaults: 'Invalid wallet data' },
      ))
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
      const isFirst: boolean = (newItems.length === 1)

      if (isFirst) {
        this.dispatch(setActiveWallet(newWallet.id))
      }

      this.dispatch(setWalletsItems(newItems, isFirst ? 'Home' : 'Wallets'))

      if (createdBlockNumber) {
        gaSendEvent('CreateWallet', 'WalletCreated')

        toastsPlugin.showToast(i18n._(
          'walletsPlugin.toast.create',
          null,
          { defaults: 'Wallet created.' },
        ))
      } else {
        gaSendEvent('ImportWallet', 'WalletCreated')

        toastsPlugin.showToast(i18n._(
          'walletsPlugin.toast.import',
          null,
          { defaults: 'Wallet imported.' },
        ))
      }
    } catch (err) {
      if (createdBlockNumber) {
        gaSendEvent('CreateWallet', 'WalletCreationError')
      } else {
        gaSendEvent('ImportWallet', 'WalletCreationError')
      }

      return {
        password: i18n._(
          'WalletsImport.errors.passwordInvalid',
          null,
          { defaults: 'Invalid password' },
        ),
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

  getNextWalletName = (): string => {
    const walletsCount: number = this.getItems().length
    const nextWalletNumber: string = walletsCount ? ` ${walletsCount + 1}` : ''

    return `My Wallet${nextWalletNumber}`
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
      // FIXME: Do we need to translate this? Looks like internal error text
      throw new Error(i18n._(
        'WalletsImport.errors.walletIsNotUnique',
        { propertyName },
        { defaults: 'Wallet with such {propertyName} already exists' },
      ))
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
    nextPage?: ?string = null,
    params?: { [key: string]: any } = {},
  ): Wallets => {
    const wallet: Wallet = this.getWallet(walletId)
    const items: Wallets = this.getItems()
    const newItems: Wallets = walletsUtils.updateWallet(items, wallet, updatedData)

    this.dispatch(setWalletsItems(newItems, nextPage, params || {}))

    return newItems
  }

  checkWalletReadOnly = (walletId: WalletId): boolean => {
    const { customType }: Wallet = this.getWallet(walletId)

    return walletsUtils.checkReadOnlyType(customType)
  }

  removeWallet = (walletId: WalletId): Wallets => {
    const items: Wallets = this.getItems()
    const newItems: Wallets = walletsUtils.removeWallet(items, walletId)
    const activeWalletId: WalletId = selectActiveWalletId(this.getState())

    if (walletId === activeWalletId) {
      const firstWallet: ?Wallet = newItems[0]
      this.dispatch(setActiveWallet(firstWallet ? firstWallet.id : null))
    }

    this.dispatch(setWalletsItems(newItems, 'Wallets'))

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

  setActiveAddress = (
    walletId: WalletId,
    addressIndexNew: number,
  ): Wallets => {
    const {
      xpub,
      addressIndex,
      isSimplified,
    }: Wallet = this.getWallet(walletId)

    if (!xpub) {
      throw new WalletInconsistentDataError('xpub doesn\'t exist')
    }

    const newItems: Wallets = this.updateWallet(
      walletId, {
        addressIndex: isSimplified ? addressIndex : addressIndexNew || 0,
      },
    )

    this.dispatch(setActiveWallet(walletId))
    this.dispatch(changeActiveAddress())

    return newItems
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
      )
    } catch (error) {
      gaSendEvent('UnlockFeatures', 'WalletUpgradeError')

      return {
        password: i18n._(
          'entity.Password.error.invalid',
          null,
          { defaults: 'Invalid password' },
        ),
      }
    }

    return null
  }

  reEncryptWallets = async (
    internalKeyOld: ?Uint8Array,
    newPassword: string,
    passwordHint: string,
  ): Promise<Wallets> => {
    if (!internalKeyOld) {
      throw new WalletInconsistentDataError('reEncryptWallets data error')
    }

    if (!newPassword) {
      throw new WalletInconsistentDataError('password can\'t be empty')
    }

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
      internalKeyOld,
      newInternalKey,
    ))

    this.dispatch(setNewPassword({
      salt: newSalt,
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
    )
  }

  switchMode = (
    walletId: WalletId,
    addressIndexNew?: number,
  ): Wallets => {
    const {
      xpub,
      addressIndex,
      isSimplified,
    }: Wallet = this.getWallet(walletId)

    if (!xpub) {
      throw new WalletInconsistentDataError('xpub doesn\'t exist')
    }

    return this.updateWallet(
      walletId, {
        isSimplified: !isSimplified,
        addressIndex: isSimplified ? addressIndex : addressIndexNew || 0,
      },
      isSimplified ? 'WalletsItemAddresses' : 'Wallets',
      isSimplified ? { walletId } : {},
    )
  }

  requestETHBalanceByAddress = async (address: Address): Promise<string> => {
    const network: Network = this.getNetwork()

    try {
      const ethBalance: string = await web3.getAssetBalance(network, address, 'Ethereum')

      return new BigNumber(ethBalance)
    } catch (error) {
      return Promise.delay(MINUTE).then(() => this.requestETHBalanceByAddress(address))
    }
  }

  requestETHBalanceByXPUB = async (
    walletId: WalletId,
    derivationIndex: number,
  ): Promise<BigNumber> => {
    const addresses: Address[] = this.getAddresses(walletId, 0, derivationIndex)

    return Promise
      .map(addresses, this.requestETHBalanceByAddress)
      .then((ethBalances: BigNumber[]) => ethBalances.reduce((
        result: BigNumber,
        ethBalance: BigNumber,
      ) => result.plus(ethBalance), new BigNumber(0)))
  }

  requestETHBalance = async (walletId: WalletId): Promise<BigNumber> => {
    const {
      id,
      xpub,
      derivationIndex,
      isSimplified,
    }: Wallet = this.getWallet(walletId)

    if (xpub && !isSimplified) {
      return this.requestETHBalanceByXPUB(id, derivationIndex || 0)
    }

    return this.requestETHBalanceByAddress(this.getAddress(id))
  }
}

export const walletsPlugin = new WalletsPlugin()
