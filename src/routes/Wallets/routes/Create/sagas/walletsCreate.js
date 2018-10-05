// @flow

import { delay } from 'redux-saga'
import { put, select, takeEvery } from 'redux-saga/effects'

import config from 'config'
import walletsWorker from 'workers/wallets'
import { selectWallets, selectWalletsCreate } from 'store/stateSelectors'

import { setWallets, setActiveWallet } from 'routes/Wallets/modules/wallets'

import {
  STEPS,
  OPEN_VIEW,
  CLOSE_VIEW,
  CREATE_ERROR,
  CREATE_SUCCESS,
  GO_TO_NEXT_STEP,
  GO_TO_PREV_STEP,
  CHECK_NAME_ERROR,
  CHECK_NAME_SUCCESS,
  clean,
  goToStartView,
  setCurrentStep,
  setInvalidField,
} from '../modules/walletsCreate'

function* checkName(): Saga<void> {
  const { items }: WalletsState = yield select(selectWallets)
  const { name }: WalletsCreateState = yield select(selectWalletsCreate)

  if (!name) {
    yield put(setInvalidField('name', 'Name should not be empty'))

    return
  }

  walletsWorker.checkNameRequest(items, name)
}

function* checkNameError(action: { payload: Error }): Saga<void> {
  yield put(setInvalidField('name', action.payload.message))
}

function* checkNameSuccess(): Saga<void> {
  yield put(setCurrentStep(STEPS.PASSWORD))
}

function* create(): Saga<void> {
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
      yield put(setInvalidField('passwordConfirm', 'Password does not match confirmation'))

      return
    }

    if (!passwordHint) {
      yield put(setInvalidField('passwordHint', 'Password hint is required'))

      return
    }

    if (password === passwordHint) {
      yield put(setInvalidField('passwordHint', 'Password and hint should not be equal'))

      return
    }
  }

  yield walletsWorker.createRequest(walletsData, name, password, passwordHint)
}

function* createError(action: { payload: Error }): Saga<void> {
  yield put(setInvalidField('password', action.payload.message))
}

function* createSuccess(action: ExtractReturn<typeof setWallets>): Saga<void> {
  const { payload } = action

  yield put(setWallets(payload))

  const wallets: Wallets = payload.items
  const createdWallet: Wallet = wallets[wallets.length - 1]

  yield put(setActiveWallet(createdWallet.id))
}

function* openView(): Saga<void> {
  yield put(clean())
}

function* closeView(): Saga<void> {
  yield delay(config.delayBeforeFormClean)
  yield put(clean())
}

function* setNextStep(): Saga<void> {
  const { currentStep }: WalletsCreateState = yield select(selectWalletsCreate)

  switch (currentStep) {
    case STEPS.NAME: {
      yield* checkName()
      break
    }

    case STEPS.PASSWORD: {
      yield* create()
      break
    }

    default:
      break
  }
}

function* goToWalletsStartView(): Saga<void> {
  yield put(goToStartView())
}

function* goToWalletsCreateNameStep(): Saga<void> {
  yield put(setCurrentStep(STEPS.NAME))
}

function* setPrevStep(): Saga<void> {
  const { currentStep }: WalletsCreateState = yield select(selectWalletsCreate)

  switch (currentStep) {
    case STEPS.NAME: {
      yield* goToWalletsStartView()
      break
    }

    case STEPS.PASSWORD: {
      yield* goToWalletsCreateNameStep()
      break
    }

    default:
      break
  }
}

export function* walletsCreateRootSaga(): Saga<void> {
  yield takeEvery(OPEN_VIEW, openView)
  yield takeEvery(CLOSE_VIEW, closeView)
  yield takeEvery(GO_TO_NEXT_STEP, setNextStep)
  yield takeEvery(GO_TO_PREV_STEP, setPrevStep)
  yield takeEvery(CHECK_NAME_SUCCESS, checkNameSuccess)
  yield takeEvery(CHECK_NAME_ERROR, checkNameError)
  yield takeEvery(CREATE_SUCCESS, createSuccess)
  yield takeEvery(CREATE_ERROR, createError)
}
