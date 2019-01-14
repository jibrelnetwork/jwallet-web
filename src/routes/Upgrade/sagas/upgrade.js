// @flow

import {
  put,
  // select,
  takeEvery,
} from 'redux-saga/effects'

// import walletsWorker from 'workers/wallets'
import reactRouterBack from 'utils/browser/reactRouterBack'

// import {
//   selectWalletsItems,
//   selectActiveWalletId,
// } from 'store/stateSelectors'

// import * as wallets from 'routes/Wallets/modules/wallets'

import * as upgrade from '../modules/upgrade'

function* submitSuccess(action: ExtractReturn<typeof upgrade.submitSuccess>): Saga<void> {
  console.log(action)
  // const items: Wallets = action.payload

  // yield put(wallets.setWalletsItems(items))
  yield put(reactRouterBack({ fallbackUrl: '/digital-assets' }))
}

function* submitMnemonicRequest(action): Saga<void> {
  console.log(action)
  yield put(upgrade.submitSuccess([]))
}

function* submitPrivateKeyRequest(action): Saga<void> {
  console.log(action)
  yield put(upgrade.submitSuccess([]))
}

function* clean(): Saga<void> {
  yield put(upgrade.clean())
}

export function* upgradeRootSaga(): Saga<void> {
  yield takeEvery(upgrade.OPEN_VIEW, clean)
  yield takeEvery(upgrade.SUBMIT_SUCCESS, submitSuccess)
  yield takeEvery(upgrade.SUBMIT_MNEMONIC_REQUEST, submitMnemonicRequest)
  yield takeEvery(upgrade.SUBMIT_PRIVATE_KEY_REQUEST, submitPrivateKeyRequest)
}
