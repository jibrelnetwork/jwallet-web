// @flow

import * as wallets from 'routes/Wallets/modules/wallets'
import * as walletsCreate from 'routes/Wallets/routes/Create/modules/walletsCreate'
import * as walletsImport from 'routes/Wallets/routes/Import/modules/walletsImport'
import * as walletsRename from 'routes/Wallets/routes/Rename/modules/walletsRename'

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

export function checkWalletTypeRequest(data: string) {
  walletsWorker.postMessage(walletsImport.checkWalletTypeRequest(data))
}

export function checkDerivationPathRequest(derivationPath: string) {
  walletsWorker.postMessage(walletsImport.checkDerivationPathRequest(derivationPath))
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

export function run(store: { dispatch: (WalletsAnyAction) => void }) {
  walletsWorker.onmessage = function walletsWorkerOnMessage(msg) {
    store.dispatch(msg.data)
  }
}
