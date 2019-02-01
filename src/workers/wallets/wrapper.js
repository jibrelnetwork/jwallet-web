// @flow

import getMnemonicOptions from 'utils/mnemonic/getMnemonicOptions'
import getPasswordOptions from 'utils/encryption/getPasswordOptions'

import * as upgrade from 'routes/Upgrade/modules/upgrade'
import * as wallets from 'routes/Wallets/modules/wallets'
import * as walletsCreate from 'routes/Wallets/routes/Create/modules/walletsCreate'
import * as walletsImport from 'routes/Wallets/routes/Import/modules/walletsImport'
import * as walletsBackup from 'routes/Wallets/routes/Backup/modules/walletsBackup'

import type {
  WalletsAnyAction,
  WalletsWorkerInstance,
} from './worker'

// eslint-disable-next-line import/default
import WalletsWorker from './worker.js'

type ImportWalletData = {|
  +data: string,
  +passphrase: string,
  +derivationPath: string,
|}

// $FlowFixMe
const walletsWorker: WalletsWorkerInstance = new WalletsWorker()

export function createRequest(
  walletsData: WalletsState,
  createdBlockNumber: WalletCreatedBlockNumber,
) {
  const {
    name,
    persist,
    password,
    passwordHint,
  }: WalletsState = walletsData

  const {
    items,
    internalKey,
    passwordOptions,
  } = persist

  walletsWorker.postMessage(walletsCreate.createRequest({
    name,
    items,
    password,
    internalKey,
    createdBlockNumber,
    mnemonicOptions: getMnemonicOptions(),
    passwordOptions: passwordOptions || getPasswordOptions(passwordHint),
  }))
}

export function importRequest(walletsData: WalletsState, importWalletData: ImportWalletData) {
  const {
    name,
    persist,
    password,
    passwordHint,
  }: WalletsState = walletsData

  const {
    items,
    internalKey,
    passwordOptions,
  } = persist

  const {
    data,
    passphrase,
    derivationPath,
  }: ImportWalletData = importWalletData

  walletsWorker.postMessage(walletsImport.importRequest({
    data,
    name,
    items,
    password,
    internalKey,
    passwordOptions: passwordOptions || getPasswordOptions(passwordHint),
    mnemonicOptions: getMnemonicOptions({
      passphrase,
      derivationPath,
    }),
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
  derivationPath: ?string,
  passphrase: ?string,
) {
  const {
    items,
    internalKey,
    activeWalletId,
    passwordOptions,
  }: WalletsPersist = walletsData.persist

  if (!activeWalletId) {
    throw new Error('ActiveWalletNotFoundError')
  } else if (!internalKey) {
    throw new Error('WalletDataError')
  }

  const mnemonicOptions: ?MnemonicOptionsUser = !derivationPath ? null : {
    passphrase,
    derivationPath,
  }

  walletsWorker.postMessage(upgrade.upgradeRequest({
    items,
    internalKey,
    passwordOptions,
    password,
    data,
    walletId: activeWalletId,
    mnemonicOptions: getMnemonicOptions(mnemonicOptions),
  }))
}

export function run(store: { dispatch: (WalletsAnyAction) => void }) {
  walletsWorker.onmessage = function walletsWorkerOnMessage(msg) {
    store.dispatch(msg.data)
  }
}
