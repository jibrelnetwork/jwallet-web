// @flow

import * as walletsCreate from 'routes/Wallets/routes/Create/modules/walletsCreate'
import * as walletsImport from 'routes/Wallets/routes/Import/modules/walletsImport'

import type { WalletsCreateAction } from 'routes/Wallets/routes/Create/modules/walletsCreate'

import type { WalletsWorkerMessage } from './worker'

// eslint-disable-next-line import/default
import WalletsWorker from './worker.js'

type WalletsWorkerInstance = {|
  onmessage: (WalletsWorkerMessage) => void,
  +postMessage: (WalletsCreateAction) => void,
|}

type ImportWalletData = {|
  +data: string,
  +name: string,
  +passphrase: string,
  +derivationPath: string,
|}

// $FlowFixMe
const walletsWorker: WalletsWorkerInstance = new WalletsWorker()

export function checkNameRequest(wallets: Wallets, name: string) {
  walletsWorker.postMessage(walletsCreate.checkNameRequest(wallets, name))
}

export function checkWalletTypeRequest(data: string) {
  walletsWorker.postMessage(walletsImport.checkWalletTypeRequest(data))
}

export function checkDerivationPathRequest(derivationPath: string) {
  walletsWorker.postMessage(walletsImport.checkDerivationPathRequest(derivationPath))
}

export function createRequest(
  walletsData: WalletsState,
  name: string,
  password: string,
  passwordHint: ?string,
) {
  const {
    items,
    passwordOptions,
    mnemonicOptions,
    testPasswordData,
  }: WalletsState = walletsData

  walletsWorker.postMessage(walletsCreate.createRequest({
    name,
    password,
    passwordOptions,
    mnemonicOptions,
    testPasswordData,
    wallets: items,
    passwordHint: passwordHint || walletsData.passwordHint,
  }))
}

export function importRequest(
  walletsData: WalletsState,
  importWalletData: ImportWalletData,
  password: string,
  passwordHint: ?string,
) {
  const {
    items,
    passwordOptions,
    mnemonicOptions,
    testPasswordData,
  }: WalletsState = walletsData

  const {
    data,
    name,
    passphrase,
    derivationPath,
  }: ImportWalletData = importWalletData

  const mnemonicOptionsUser: MnemonicOptionsUser = {
    ...mnemonicOptions,
    passphrase,
    derivationPath,
  }

  walletsWorker.postMessage(walletsImport.importRequest({
    data,
    name,
    password,
    passwordOptions,
    testPasswordData,
    wallets: items,
    mnemonicOptions: mnemonicOptionsUser,
    passwordHint: passwordHint || walletsData.passwordHint,
  }))
}

export function run(store: { dispatch: (WalletsCreateAction) => void }) {
  walletsWorker.onmessage = function walletsWorkerOnMessage(msg: WalletsWorkerMessage) {
    store.dispatch(msg.data)
  }
}
