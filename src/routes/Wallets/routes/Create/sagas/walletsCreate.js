// @flow

import { put, select, takeEvery } from 'redux-saga/effects'

import walletsWorker from 'workers/wallets'
import { selectWallets, selectWalletsCreate } from 'store/stateSelectors'
import * as wallets from 'routes/Wallets/modules/wallets'

import * as walletsCreate from '../modules/walletsCreate'

function* checkName(): Saga<void> {
  const { items }: WalletsState = yield select(selectWallets)
  const { name }: WalletsCreateState = yield select(selectWalletsCreate)

  if (!name) {
    yield put(walletsCreate.setInvalidField('name', 'Name should not be empty'))

    return
  }

  walletsWorker.checkNameRequest(items, name)
}

function* checkNameError(action: { payload: Error }): Saga<void> {
  yield put(walletsCreate.setInvalidField('name', action.payload.message))
}

function* checkNameSuccess(): Saga<void> {
  yield put(walletsCreate.setCurrentStep(walletsCreate.STEPS.PASSWORD))
}

function* createWallet(): Saga<void> {
  const walletsData: WalletsState = yield select(selectWallets)

  const {
    name,
    password,
    passwordHint,
    passwordConfirm,
  }: WalletsCreateState = yield select(selectWalletsCreate)

  const isPasswordExists: boolean = !!walletsData.testPasswordData

  if (!isPasswordExists) {
    if (password !== passwordConfirm) {
      yield put(
        walletsCreate.setInvalidField('passwordConfirm', 'Password does not match confirmation'),
      )

      return
    }

    if (!passwordHint) {
      yield put(
        walletsCreate.setInvalidField('passwordHint', 'Password hint is required'),
      )

      return
    }

    if (password === passwordHint) {
      yield put(
        walletsCreate.setInvalidField('passwordHint', 'Password and hint should not be equal'),
      )

      return
    }
  }

  yield walletsWorker.createRequest(walletsData, name, password, passwordHint)
}

function* createError(action: { payload: Error }): Saga<void> {
  yield put(walletsCreate.setInvalidField('password', action.payload.message))
}

function* createSuccess(action: ExtractReturn<typeof wallets.setWallets>): Saga<void> {
  const { payload } = action

  yield put(wallets.setWallets(payload))

  const { items } = payload
  const createdWallet: Wallet = items[items.length - 1]

  yield put(wallets.setActiveWallet(createdWallet.id))
}

function* openView(): Saga<void> {
  yield put(walletsCreate.clean())
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

function* goToWalletsStartView(): Saga<void> {
  yield put(walletsCreate.goToStartView())
}

function* goToWalletsCreateNameStep(): Saga<void> {
  yield put(walletsCreate.setCurrentStep(walletsCreate.STEPS.NAME))
}

function* setPrevStep(): Saga<void> {
  const { currentStep }: WalletsCreateState = yield select(selectWalletsCreate)

  switch (currentStep) {
    case walletsCreate.STEPS.NAME: {
      yield* goToWalletsStartView()
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

export function* walletsCreateRootSaga(): Saga<void> {
  yield takeEvery(walletsCreate.OPEN_VIEW, openView)
  yield takeEvery(walletsCreate.GO_TO_NEXT_STEP, setNextStep)
  yield takeEvery(walletsCreate.GO_TO_PREV_STEP, setPrevStep)
  yield takeEvery(walletsCreate.CHECK_NAME_SUCCESS, checkNameSuccess)
  yield takeEvery(walletsCreate.CHECK_NAME_ERROR, checkNameError)
  yield takeEvery(walletsCreate.CREATE_SUCCESS, createSuccess)
  yield takeEvery(walletsCreate.CREATE_ERROR, createError)
}
