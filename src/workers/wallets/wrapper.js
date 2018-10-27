// @flow

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

  const passwordOptionsUser: PasswordOptionsUser = {
    ...passwordOptions,
    passwordHint,
  }

  walletsWorker.postMessage(walletsCreate.createRequest({
    name,
    items,
    password,
    mnemonicOptions,
    testPasswordData,
    passwordOptions: passwordOptionsUser,
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

  const passwordOptionsUser: PasswordOptionsUser = {
    ...passwordOptions,
    passwordHint,
  }

  const mnemonicOptionsUser: MnemonicOptionsUser = {
    ...mnemonicOptions,
    passphrase,
    derivationPath,
  }

  walletsWorker.postMessage(walletsImport.importRequest({
    data,
    name,
    items,
    password,
    testPasswordData,
    passwordOptions: passwordOptionsUser,
    mnemonicOptions: mnemonicOptionsUser,
  }))
}

export function backupRequest(items: Wallets, walletId: string, password: string) {
  walletsWorker.postMessage(walletsBackup.backupRequest(items, walletId, password))
}

export function run(store: { dispatch: (WalletsAnyAction) => void }) {
  walletsWorker.onmessage = function walletsWorkerOnMessage(msg) {
    store.dispatch(msg.data)
  }
}
