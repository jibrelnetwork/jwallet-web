// @flow

import { push } from 'react-router-redux'

import {
  put,
  race,
  take,
  select,
  takeEvery,
} from 'redux-saga/effects'

import walletsWorker from 'workers/wallets'

import {
  getWallet,
  updateWallet,
  checkMnemonicType,
} from 'utils/wallets'

import {
  selectWalletsItems,
  selectWalletsPersist,
} from 'store/selectors/wallets'

import { WalletInconsistentDataError } from 'errors'

import * as wallets from 'store/modules/wallets'

function* openView(): Saga<void> {
  yield put(wallets.clean())
  yield put(wallets.setActiveWallet(null))

  const items: ExtractReturn<typeof selectWalletsItems> = yield select(selectWalletsItems)

  if (!items.length) {
    yield put(push('/wallets/start'))
  }
}

function* setActiveWallet(action: ExtractReturn<typeof wallets.setActiveWallet>): Saga<void> {
  const { activeWalletId } = action.payload

  if (!activeWalletId) {
    return
  }

  const items: ExtractReturn<typeof selectWalletsItems> = yield select(selectWalletsItems)

  try {
    const {
      type,
      isSimplified,
    }: Wallet = getWallet(items, activeWalletId)

    const isAddressRequired: boolean = checkMnemonicType(type) && !isSimplified
    yield put(push(isAddressRequired ? '/wallets/addresses' : '/digital-assets/grid'))
  } catch (err) {
    yield put(push('/digital-assets/grid'))
  }
}

export class GetPrivateKeyError extends Error {
  // eslint-disable-next-line fp/no-rest-parameters
  constructor(...args: any) {
    super(...args)
    this.name = 'GetPrivateKeyError'
  }
}

export function* getPrivateKey(walletId: string, password: string): Saga<string> {
  const walletsPersist: ExtractReturn<typeof selectWalletsPersist> =
    yield select(selectWalletsPersist)

  const wallet: Wallet = getWallet(walletsPersist.items, walletId)

  walletsWorker.privateKeyRequest(walletsPersist, wallet, password)

  while (true) {
    const {
      response,
      error,
    } = yield race({
      response: take(wallets.PRIVATE_KEY_SUCCESS),
      error: take(wallets.PRIVATE_KEY_ERROR),
    })

    if (response) {
      if (response.payload.walletId !== walletId) {
        continue
      }

      return response.payload.privateKey
    } else if (error) {
      if (error.payload.walletId !== walletId) {
        continue
      }

      throw new GetPrivateKeyError(error.payload.message)
    }
  }
}

export function* getPrivateKeyCancel(walletId: string): Saga<void> {
  yield put(wallets.privateKeyError(walletId, 'Cancelled'))
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
  yield takeEvery(wallets.OPEN_VIEW, openView)
  yield takeEvery(wallets.SIMPLIFY_WALLET, simplifyWallet)
  yield takeEvery(wallets.SET_ACTIVE_WALLET, setActiveWallet)
}
