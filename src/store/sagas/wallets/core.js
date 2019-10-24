// @flow strict

import { actions } from 'redux-router5'

import {
  put,
  takeEvery,
} from 'redux-saga/effects'

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

export function* walletsRootSaga(): Saga<void> {
  yield takeEvery(wallets.SET_WALLETS_ITEMS, onSetWalletsItems)
}
