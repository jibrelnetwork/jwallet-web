// @flow

import getMnemonicOptions from 'utils/mnemonic/getMnemonicOptions'
import getPasswordOptions from 'utils/encryption/getPasswordOptions'

import * as upgrade from 'routes/Upgrade/modules/upgrade'
import * as wallets from 'routes/Wallets/modules/wallets'
import * as walletsCreate from 'routes/Wallets/routes/Create/modules/walletsCreate'
import * as walletsImport from 'routes/Wallets/routes/Import/modules/walletsImport'
import * as walletsBackup from 'routes/Wallets/routes/Backup/modules/walletsBackup'

import type { WalletsAnyAction, WalletsWorkerInstance } from './worker'

// eslint-disable-next-line import/default
import WalletsWorker from './worker.js'

type ImportWalletData = {|
  +data: string,
  +passphrase: string,
  +derivationPath: string,
|}

// $FlowFixMe
const walletsWorker: WalletsWorkerInstance = new WalletsWorker()

export function createRequest(walletsData: WalletsState) {
  const {
    name,
    persist,
    password,
    passwordHint,
  }: WalletsState = walletsData

  const {
    items,
    passwordOptions,
    mnemonicOptions,
    testPasswordData,
  } = persist

  const passwordOpts: PasswordOptions = getPasswordOptions({
    ...passwordOptions,
    passwordHint,
  })

  const mnemonicOpts: MnemonicOptions = getMnemonicOptions(mnemonicOptions)

  walletsWorker.postMessage(walletsCreate.createRequest({
    name,
    items,
    password,
    testPasswordData,
    mnemonicOptions: mnemonicOpts,
    passwordOptions: passwordOpts,
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
    passwordOptions,
    mnemonicOptions,
    testPasswordData,
  } = persist

  const {
    data,
    passphrase,
    derivationPath,
  }: ImportWalletData = importWalletData

  const passwordOpts: PasswordOptions = getPasswordOptions({
    ...passwordOptions,
    passwordHint,
  })

  const mnemonicOpts: MnemonicOptions = getMnemonicOptions({
    ...mnemonicOptions,
    passphrase,
    derivationPath,
  })

  walletsWorker.postMessage(walletsImport.importRequest({
    data,
    name,
    items,
    password,
    testPasswordData,
    mnemonicOptions: mnemonicOpts,
    passwordOptions: passwordOpts,
  }))
}

export function backupRequest(items: Wallets, walletId: string, password: string) {
  walletsWorker.postMessage(walletsBackup.backupRequest(items, walletId, password))
}

export function privateKeyRequest(wallet: Wallet, password: string) {
  walletsWorker.postMessage(wallets.privateKeyRequest(wallet, password))
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
    activeWalletId,
    mnemonicOptions,
    passwordOptions,
    testPasswordData,
  }: WalletsPersist = walletsData.persist

  if (!activeWalletId) {
    throw new Error('ActiveWalletNotFoundError')
  } else if (!testPasswordData) {
    throw new Error('WalletDataError')
  }

  const mnemonicOptionsUser: ?MnemonicOptionsUser = !derivationPath ? null : {
    passphrase,
    derivationPath,
  }

  const passwordOpts: PasswordOptions = getPasswordOptions(passwordOptions)

  const mnemonicOpts: MnemonicOptions = getMnemonicOptions({
    ...mnemonicOptions,
    ...mnemonicOptionsUser,
  })

  walletsWorker.postMessage(upgrade.upgradeRequest(
    items,
    activeWalletId,
    password,
    testPasswordData,
    data,
    passwordOpts,
    mnemonicOpts,
  ))
}

export function run(store: { dispatch: (WalletsAnyAction) => void }) {
  walletsWorker.onmessage = function walletsWorkerOnMessage(msg) {
    store.dispatch(msg.data)
  }
}
