// @flow

import * as walletsCreate from 'routes/Wallets/routes/Create/modules/walletsCreate'

import type { WalletsCreateAction } from 'routes/Wallets/routes/Create/modules/walletsCreate'

import type { WalletsWorkerMessage } from './worker'

// eslint-disable-next-line import/default
import WalletsWorker from './worker.js'

type WalletsWorkerInstance = {|
  onmessage: (WalletsWorkerMessage) => void,
  +postMessage: (WalletsCreateAction) => void,
|}

// $FlowFixMe
const walletsWorker: WalletsWorkerInstance = new WalletsWorker()

export const checkNameRequest = (wallets: Wallets, name: string) => {
  walletsWorker.postMessage(walletsCreate.checkNameRequest(wallets, name))
}

export const createRequest = (
  walletsData: WalletsState,
  name: string,
  password: string,
  passwordHint: ?string,
) => {
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

export const run = (store: { dispatch: (WalletsCreateAction) => void }) => {
  walletsWorker.onmessage = function walletsWorkerOnMessage(msg: WalletsWorkerMessage) {
    store.dispatch(msg.data)
  }
}
