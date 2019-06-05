// @flow strict

import { actions } from 'redux-router5'

import {
  put,
  select,
  takeEvery,
} from 'redux-saga/effects'

import { WalletInconsistentDataError } from 'errors'
import { selectWalletsItems } from 'store/selectors/wallets'
import * as wallets from 'store/modules/wallets'

import {
  getWallet,
  updateWallet,
  checkMnemonicType,
} from 'utils/wallets'

function* setWalletsItems(action: ExtractReturn<typeof wallets.setActiveWallet>): Saga<void> {
  const { items } = action.payload

  if (!items.length) {
    return
  }

  if (items.length === 1) {
    yield put(actions.navigateTo('Home'))

    return
  }

  yield put(actions.navigateTo('Wallets'))
}

export function* simplifyWallet(action: ExtractReturn<typeof wallets.simplifyWallet>): Saga<void> {
  const {
    walletId,
    isSimplified,
  } = action.payload

  const items: ExtractReturn<typeof selectWalletsItems> = yield select(selectWalletsItems)
  const foundWallet: Wallet = getWallet(items, walletId)

  if (!checkMnemonicType(foundWallet.type)) {
    throw new WalletInconsistentDataError({ walletId }, 'Invalid mnemonic type')
  }

  const newItems: Wallets = updateWallet(items, walletId, {
    isSimplified,
    addressIndex: 0,
  })

  yield put(wallets.setWalletsItems(newItems))
}

export function* walletsRootSaga(): Saga<void> {
  yield takeEvery(wallets.SIMPLIFY_WALLET, simplifyWallet)
  yield takeEvery(wallets.SET_WALLETS_ITEMS, setWalletsItems)
}
