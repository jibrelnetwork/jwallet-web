// @flow strict

import { actions } from 'redux-router5'

import {
  put,
  takeEvery,
} from 'redux-saga/effects'

import * as blocks from 'store/modules/blocks'
import * as wallets from 'store/modules/wallets'

function* onSetWalletsItems(action: ExtractReturn<typeof wallets.setActiveWallet>): Saga<void> {
  const {
    items,
    params,
    nextPage,
  } = action.payload

  if (!(nextPage && items.length)) {
    return
  }

  yield put(actions.navigateTo(nextPage, params || {}))
}

function* restartBlocksSync(): Saga<void> {
  yield put(blocks.syncRestart())
}

export function* walletsRootSaga(): Saga<void> {
  yield takeEvery(wallets.SET_WALLETS_ITEMS, onSetWalletsItems)
  yield takeEvery(wallets.SET_ACTIVE_WALLET, restartBlocksSync)
  yield takeEvery(wallets.CHANGE_ACTIVE_ADDRESS, restartBlocksSync)
}
