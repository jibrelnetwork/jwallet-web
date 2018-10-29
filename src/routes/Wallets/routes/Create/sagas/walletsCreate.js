// @flow

import { push } from 'react-router-redux'
import { put, select, takeEvery } from 'redux-saga/effects'

import keystore from 'services/keystore'
import walletsWorker from 'workers/wallets'
import { selectWallets, selectWalletsCreate } from 'store/stateSelectors'
import * as wallets from 'routes/Wallets/modules/wallets'

import * as walletsCreate from '../modules/walletsCreate'

function* checkName(): Saga<void> {
  const { persist, name }: WalletsState = yield select(selectWallets)
  const nameCleaned: string = name.trim()

  if (!nameCleaned) {
    yield put(wallets.setInvalidField('name', 'Name should not be empty'))

    return
  }

  try {
    keystore.checkWalletUniqueness(persist.items, nameCleaned, 'name')
    yield put(walletsCreate.setCurrentStep(walletsCreate.STEPS.PASSWORD))
  } catch (err) {
    yield put(wallets.setInvalidField('name', err.message))
  }
}

function* createWallet(): Saga<void> {
  const walletsData: WalletsState = yield select(selectWallets)

  const {
    persist,
    name,
    password,
    passwordHint,
    passwordConfirm,
  }: WalletsState = walletsData

  const isPasswordExists: boolean = !!persist.testPasswordData

  if (!isPasswordExists) {
    if (password === name) {
      yield put(
        wallets.setInvalidField('password', 'Password should not be equal with wallet name'),
      )

      return
    }

    if (password !== passwordConfirm) {
      yield put(
        wallets.setInvalidField('passwordConfirm', 'Password does not match confirmation'),
      )

      return
    }

    if (!passwordHint) {
      yield put(
        wallets.setInvalidField('passwordHint', 'Password hint is required'),
      )

      return
    }

    if (password === passwordHint) {
      yield put(
        wallets.setInvalidField('passwordHint', 'Password and hint should not be equal'),
      )

      return
    }
  }

  yield put(wallets.setIsLoading(true))

  yield walletsWorker.createRequest(walletsData)
}

function* createError(action: { payload: Error }): Saga<void> {
  yield put(wallets.setInvalidField('password', action.payload.message))
  yield put(wallets.setIsLoading(false))
}

function* createSuccess(action: ExtractReturn<typeof wallets.setWallets>): Saga<void> {
  const { payload } = action

  yield put(wallets.setWallets(payload))
  yield put(wallets.setIsLoading(false))

  const { items } = payload
  const createdWallet: Wallet = items[items.length - 1]

  yield put(wallets.setActiveWallet(createdWallet.id))
}

function* setNextStep(): Saga<void> {
  const { currentStep }: WalletsCreateState = yield select(selectWalletsCreate)

  switch (currentStep) {
    case walletsCreate.STEPS.NAME: {
      yield* checkName()
      break
    }

    case walletsCreate.STEPS.PASSWORD: {
      yield* createWallet()
      break
    }

    default:
      break
  }
}

function* goToWalletsCreateNameStep(): Saga<void> {
  yield put(walletsCreate.setCurrentStep(walletsCreate.STEPS.NAME))
}

function* setPrevStep(): Saga<void> {
  const { persist }: WalletsState = yield select(selectWallets)
  const { currentStep }: WalletsCreateState = yield select(selectWalletsCreate)

  switch (currentStep) {
    case walletsCreate.STEPS.NAME: {
      const isEmptyWallets: boolean = !persist.items.length

      yield put(push(isEmptyWallets ? '/wallets/start' : '/wallets'))

      break
    }

    case walletsCreate.STEPS.PASSWORD: {
      yield* goToWalletsCreateNameStep()
      break
    }

    default:
      break
  }
}

function* clean(): Saga<void> {
  yield put(wallets.clean())
  yield put(walletsCreate.clean())
}

export function* walletsCreateRootSaga(): Saga<void> {
  yield takeEvery(walletsCreate.OPEN_VIEW, clean)
  yield takeEvery(walletsCreate.CLOSE_VIEW, clean)
  yield takeEvery(walletsCreate.GO_TO_NEXT_STEP, setNextStep)
  yield takeEvery(walletsCreate.GO_TO_PREV_STEP, setPrevStep)
  yield takeEvery(walletsCreate.CREATE_ERROR, createError)
  yield takeEvery(walletsCreate.CREATE_SUCCESS, createSuccess)
}
