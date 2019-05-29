// @flow

import { type Store } from 'redux'

import { type AppAction } from 'store/modules'
import * as upgrade from 'store/modules/upgrade'
import * as wallets from 'store/modules/wallets'
import * as walletsBackup from 'store/modules/walletsBackup'

import {
  ActiveWalletNotFoundError,
  WalletInconsistentDataError,
} from 'errors'

// eslint-disable-next-line import/default
import WalletsWorker, {
  type WalletsWorkerInstance,
} from './worker.js'

type ImportWalletData = {|
  +data: string,
  +passphrase: string,
  +derivationPath: string,
|}

// $FlowFixMe
const walletsWorker: WalletsWorkerInstance = new WalletsWorker()

export function createRequest(
  walletsData: WalletsState,
  importWalletData: ImportWalletData,
  createdBlockNumber: ?WalletCreatedBlockNumber,
) {
  const {
    name,
    persist,
    password,
  }: WalletsState = walletsData

  const {
    items,
    internalKey,
  } = persist

  const { data }: ImportWalletData = importWalletData

  walletsWorker.postMessage(wallets.createRequest({
    data,
    name,
    items,
    password,
    internalKey,
    createdBlockNumber,
    mnemonicOptions: {},
  }))
}

export function backupRequest(walletsPersist: WalletsPersist, walletId: string, password: string) {
  const {
    items,
    internalKey,
    passwordOptions,
  }: WalletsPersist = walletsPersist

  walletsWorker.postMessage(walletsBackup.backupRequest({
    items,
    walletId,
    password,
    internalKey,
    passwordOptions,
  }))
}

export function privateKeyRequest(
  walletsPersist: WalletsPersist,
  wallet: Wallet,
  password: string,
) {
  const {
    internalKey,
    passwordOptions,
  }: WalletsPersist = walletsPersist

  walletsWorker.postMessage(wallets.privateKeyRequest({
    wallet,
    password,
    internalKey,
    passwordOptions,
  }))
}

export function upgradeRequest(
  walletsData: WalletsState,
  password: string,
  data: string,
) {
  const {
    items,
    internalKey,
    activeWalletId,
    passwordOptions,
  }: WalletsPersist = walletsData.persist

  if (!activeWalletId) {
    throw new ActiveWalletNotFoundError()
  } else if (!internalKey) {
    throw new WalletInconsistentDataError({ walletId: activeWalletId }, 'Invalid internal key')
  }

  walletsWorker.postMessage(upgrade.upgradeRequest({
    items,
    internalKey,
    passwordOptions,
    password,
    data,
    walletId: activeWalletId,
    mnemonicOptions: {},
  }))
}

export function run(store: Store<AppState, AppAction>) {
  walletsWorker.onmessage = function walletsWorkerOnMessage(msg) {
    store.dispatch(msg.data)
  }
}
