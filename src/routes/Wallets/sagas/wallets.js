// @flow

import { delay } from 'redux-saga'
import { put, select, takeEvery } from 'redux-saga/effects'

import config from 'config'
import keystore from 'services/keystore'
import InvalidFieldError from 'utils/errors/InvalidFieldError'
import { selectWallets } from 'store/stateSelectors'
import { getBalances } from 'routes/DigitalAssets/modules/digitalAssets'

import {
  OPEN,
  CLOSE,
  TOGGLE_WALLET,
  SET_WALLET_ACTION,
  SET_ACTIVE,
  SET_ACTIVE_SUCCESS,
  toggleWallet,
  setActiveSuccess,
  setActiveError,
  setActiveWalletId,
  clean,
} from '../modules/wallets'

function* openWallets(): Saga<void> {
  // Opening of wallets page - means cleaning of current active wallet
  yield put(clean())
  yield put(setActiveWalletId())
}

function* closeWallets(): Saga<void> {
  yield delay(config.delayBeforeFormClean)
  yield put(clean())
}

function* setActiveIfReadOnly(): Saga<void> {
  const { toggledWalletId, walletAction }: WalletsData = yield select(selectWallets)

  try {
    const { isReadOnly, type }: Wallet = keystore.getWallet(toggledWalletId)

    if (isReadOnly && toggledWalletId) {
      yield put(setActiveSuccess(toggledWalletId, walletAction, type))
    }
  } catch (err) {
    // console.error(err)
  }
}

function* setWalletAction(): Saga<void> {
  const { showActionsWalletId }: WalletsData = yield select(selectWallets)

  if (showActionsWalletId) {
    yield put(toggleWallet(showActionsWalletId))
  }
}

function* setActiveWallet(): Saga<void> {
  const { toggledWalletId, password, walletAction }: WalletsData = yield select(selectWallets)

  if (!(password && toggledWalletId)) {
    return
  }

  try {
    const { type }: Wallet = keystore.getWallet(toggledWalletId)
    checkWalletPassword(password, toggledWalletId)
    yield put(setActiveSuccess(toggledWalletId, walletAction, type))
  } catch (err) {
    yield put(setActiveError(err))
  }
}

function* setActiveId(action: { payload: { walletId: WalletId } }): Saga<void> {
  yield put(setActiveWalletId(action.payload.walletId))
  yield put(getBalances())
}

function checkWalletPassword(password: Password, walletId: WalletId): void {
  try {
    /**
     * try to decrypt wallet data, it will throw if password is invalid
     */
    keystore.getDecryptedWallet(password, walletId)
  } catch (err) {
    throw new InvalidFieldError('password', err.message)
  }
}

export function* watchWalletsOpen(): Saga<void> {
  yield takeEvery(OPEN, openWallets)
}

export function* watchWalletsClose(): Saga<void> {
  yield takeEvery(CLOSE, closeWallets)
}

export function* watchWalletsToggleWallet(): Saga<void> {
  yield takeEvery(TOGGLE_WALLET, setActiveIfReadOnly)
}

export function* watchWalletsSetWalletAction(): Saga<void> {
  yield takeEvery(SET_WALLET_ACTION, setWalletAction)
}

export function* watchWalletsSetActive(): Saga<void> {
  yield takeEvery(SET_ACTIVE, setActiveWallet)
}

export function* watchWalletsSetActiveId(): Saga<void> {
  yield takeEvery(SET_ACTIVE_SUCCESS, setActiveId)
}
