// @flow

import * as wallets from 'routes/Wallets/modules/wallets'
import * as walletsCreate from 'routes/Wallets/routes/Create/modules/walletsCreate'
import * as walletsImport from 'routes/Wallets/routes/Import/modules/walletsImport'
import * as walletsRename from 'routes/Wallets/routes/Rename/modules/walletsRename'
import * as walletsBackup from 'routes/Wallets/routes/Backup/modules/walletsBackup'
import * as walletsDelete from 'routes/Wallets/routes/Delete/modules/walletsDelete'
import * as walletsAddresses from 'routes/Wallets/routes/Addresses/modules/walletsAddresses'

import type { NewWalletLocation } from 'routes/Wallets/modules/wallets'

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

export function checkNameRequest(
  items: Wallets,
  name: string,
  newWalletLocation: NewWalletLocation,
) {
  walletsWorker.postMessage(wallets.checkNameRequest(items, name, newWalletLocation))
}

export function createRequest(walletsData: WalletsState) {
  const {
    name,
    items,
    password,
    passwordHint,
    passwordOptions,
    mnemonicOptions,
    testPasswordData,
  }: WalletsState = walletsData

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
    items,
    password,
    passwordHint,
    passwordOptions,
    mnemonicOptions,
    testPasswordData,
  }: WalletsState = walletsData

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

export function renameRequest(items: Wallets, name: string, walletId: string) {
  walletsWorker.postMessage(walletsRename.renameRequest(items, name, walletId))
}

export function backupRequest(items: Wallets, walletId: string, password: string) {
  walletsWorker.postMessage(walletsBackup.backupRequest(items, walletId, password))
}

export function deleteRequest(items: Wallets, walletId: string) {
  walletsWorker.postMessage(walletsDelete.deleteRequest(items, walletId))
}

export function setActiveRequest(items: Wallets, walletId: WalletId, addressIndex: Index) {
  walletsWorker.postMessage(walletsAddresses.setActiveRequest(items, walletId, addressIndex))
}

export function getMoreRequest(
  items: Wallets,
  walletId: WalletId,
  startIndex: Index,
  endIndex: Index,
) {
  walletsWorker.postMessage(
    walletsAddresses.getMoreRequest(items, walletId, startIndex, endIndex),
  )
}

export function run(store: { dispatch: (WalletsAnyAction) => void }) {
  walletsWorker.onmessage = function walletsWorkerOnMessage(msg) {
    store.dispatch(msg.data)
  }
}
