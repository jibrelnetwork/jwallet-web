// @flow

import { push } from 'react-router-redux'
import {
  put,
  select,
  takeEvery,
} from 'redux-saga/effects'
import { t } from 'ttag'

import { selectWalletsItems } from 'store/selectors/wallets'

import {
  getWallet,
  updateWallet,
  checkWalletUniqueness,
} from 'utils/wallets'

import * as wallets from 'routes/Wallets/modules/wallets'

import * as walletsRename from '../modules/walletsRename'

function* openView(action: ExtractReturn<typeof walletsRename.openView>): Saga<void> {
  yield put(wallets.clean())

  const items: Wallets = yield select(selectWalletsItems)

  try {
    const foundWallet: Wallet = getWallet(items, action.payload.walletId)
    yield put(wallets.changeNameInput(foundWallet.name))
  } catch (err) {
    yield put(push('/wallets'))
  }
}

function* rename(action: ExtractReturn<typeof walletsRename.rename>): Saga<void> {
  const {
    items,
    name,
    walletId,
  } = action.payload

  if (!name) {
    yield put(wallets.setInvalidField('name', t`Wallet name can\'t be empty`))

    return
  }

  const foundWallet: Wallet = getWallet(items, walletId)

  if (foundWallet.name === name) {
    yield put(wallets.setInvalidField('name', t`Wallet with this name already exists`))

    return
  }

  try {
    checkWalletUniqueness(items, name, 'name')
    const itemsNew = updateWallet(items, walletId, { name })

    yield put(wallets.setWalletsItems(itemsNew))
    yield put(push('/wallets'))
  } catch (err) {
    yield put(wallets.setInvalidField('name', err.message))
  }
}

export function* walletsRenameRootSaga(): Saga<void> {
  yield takeEvery(walletsRename.RENAME, rename)
  yield takeEvery(walletsRename.OPEN_VIEW, openView)
}
