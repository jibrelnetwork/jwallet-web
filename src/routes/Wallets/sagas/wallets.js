// @flow

import { push } from 'react-router-redux'
import { put, select, takeEvery } from 'redux-saga/effects'

import walletsWorker from 'workers/wallets'
import { selectWallets } from 'store/stateSelectors'
import { getWallet, checkMnemonicType } from 'utils/wallets'
import * as walletsCreate from 'routes/Wallets/routes/Create/modules/walletsCreate'
import * as walletsImport from 'routes/Wallets/routes/Import/modules/walletsImport'

import * as wallets from '../modules/wallets'

function* openView(): Saga<void> {
  yield put(wallets.clean())
  yield put(wallets.setActiveWallet(null))

  const { items }: WalletsState = yield select(selectWallets)

  if (!items.length) {
    yield put(push('/wallets/start'))
  }
}

function* setActiveWallet(action: ExtractReturn<typeof wallets.setActiveWallet>): Saga<void> {
  const { activeWalletId } = action.payload

  if (!activeWalletId) {
    return
  }

  const { items }: WalletsState = yield select(selectWallets)
  const wallet: ?Wallet = getWallet(items, activeWalletId)
  const isMnemonicWallet: boolean = !!wallet && checkMnemonicType(wallet.type)

  yield put(push(isMnemonicWallet ? '/wallets/addresses' : '/wallets'))
}

function* checkNameRequest(action: ExtractReturn<typeof wallets.checkNameRequest>): Saga<void> {
  const { items, name, newWalletLocation } = action.payload
  const nameCleaned: string = name.trim()

  if (!nameCleaned) {
    yield put(wallets.setInvalidField('name', 'Name should not be empty'))

    return
  }

  yield put(wallets.setIsLoading(true))

  walletsWorker.checkNameRequest(items, nameCleaned, newWalletLocation)
}

function* checkNameError(action: { payload: Error }): Saga<void> {
  yield put(wallets.setInvalidField('name', action.payload.message))
  yield put(wallets.setIsLoading(false))
}

function* checkNameSuccess(action: ExtractReturn<typeof wallets.checkNameSuccess>): Saga<void> {
  switch (action.payload.newWalletLocation) {
    case 'create':
      yield put(walletsCreate.setCurrentStep(walletsCreate.STEPS.PASSWORD))
      break

    case 'import':
      yield put(walletsImport.setCurrentStep(walletsImport.STEPS.DATA))
      break

    default:
      break
  }

  yield put(wallets.setIsLoading(false))
}

export function* walletsRootSaga(): Saga<void> {
  yield takeEvery(wallets.OPEN_VIEW, openView)
  yield takeEvery(wallets.CHECK_NAME_ERROR, checkNameError)
  yield takeEvery(wallets.SET_ACTIVE_WALLET, setActiveWallet)
  yield takeEvery(wallets.CHECK_NAME_SUCCESS, checkNameSuccess)
  yield takeEvery(wallets.CHECK_NAME_REQUEST, checkNameRequest)
}
