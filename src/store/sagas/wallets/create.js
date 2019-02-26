// @flow

import { push } from 'react-router-redux'
import { t } from 'ttag'

import {
  put,
  call,
  select,
  takeEvery,
} from 'redux-saga/effects'

import config from 'config'
import web3 from 'services/web3'
import walletsWorker from 'workers/wallets'
import checkWalletUniqueness from 'utils/wallets/checkWalletUniqueness'
import checkPasswordStrength from 'utils/encryption/checkPasswordStrength'
import { selectCurrentNetwork } from 'store/selectors/networks'

import {
  selectWallets,
  selectWalletsItems,
  selectWalletsCreate,
} from 'store/selectors/wallets'

import * as wallets from 'store/modules/wallets'
import * as walletsCreate from 'store/modules/walletsCreate'

function* openView(): Saga<void> {
  yield* clean()
  yield put(walletsCreate.blockNumbersRequest())
}

function* checkName(): Saga<void> {
  const {
    name,
    persist,
  }: ExtractReturn<typeof selectWallets> = yield select(selectWallets)

  const nameCleaned: string = name.trim()

  if (!nameCleaned) {
    yield put(wallets.setInvalidField('name', t`Name should not be empty`))

    return
  }

  try {
    checkWalletUniqueness(persist.items, nameCleaned, 'name')
    yield put(walletsCreate.setCurrentStep(walletsCreate.STEPS.PASSWORD))
  } catch (err) {
    yield put(wallets.setInvalidField('name', err.message))
  }
}

function* createWallet(): Saga<void> {
  const walletsData: ExtractReturn<typeof selectWallets> = yield select(selectWallets)

  const {
    persist,
    name,
    password,
    passwordHint,
    passwordConfirm,
  }: WalletsState = walletsData

  const isPasswordExists: boolean = !!persist.internalKey

  if (!isPasswordExists) {
    if (password === name) {
      yield put(
        wallets.setInvalidField('password', t`Password should not be equal with wallet name`),
      )

      return
    }

    if (password !== passwordConfirm) {
      yield put(
        wallets.setInvalidField('passwordConfirm', t`Password does not match confirmation`),
      )

      return
    }

    if (!passwordHint) {
      yield put(
        wallets.setInvalidField('passwordHint', t`Password hint is required`),
      )

      return
    }

    if (password === passwordHint) {
      yield put(
        wallets.setInvalidField('passwordHint', t`Password and hint should not be equal`),
      )

      return
    }

    const { score }: PasswordResult = checkPasswordStrength(password)

    if (score < config.minPasswordStrengthScore) {
      return
    }
  }

  const { createdBlockNumber }: ExtractReturn<typeof selectWalletsCreate> =
    yield select(selectWalletsCreate)

  yield put(wallets.setIsLoading(true))

  /**
   * @TODO
   * add check that latest block numbers already loaded
   *
   * there is another way to solve it:
   * send request(s) during creating of wallet and then append fetched results
   *
   * Current implementation is ok, because we send just one request
   * and we have enough time to get response while user enters name & password
   */
  yield walletsWorker.createRequest(walletsData, createdBlockNumber)
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
  const { currentStep }: ExtractReturn<typeof selectWalletsCreate> =
    yield select(selectWalletsCreate)

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
  const items: ExtractReturn<typeof selectWalletsItems> = yield select(selectWalletsItems)

  const { currentStep }: ExtractReturn<typeof selectWalletsCreate> =
    yield select(selectWalletsCreate)

  switch (currentStep) {
    case walletsCreate.STEPS.NAME: {
      const isEmptyWallets: boolean = !items.length

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

function* blockNumbersRequest(): Saga<void> {
  const network: ExtractReturn<typeof selectCurrentNetwork> = yield select(selectCurrentNetwork)

  if (!network) {
    return
  }

  try {
    /**
     * @TODO
     * add requests for each of network we support
     */
    const latestBlockMainnet: ?BlockData = yield call(web3.getBlock, network, 'latest')
    const latestBlockNumberMainnet: number = latestBlockMainnet ? latestBlockMainnet.number : 0

    yield put(walletsCreate.blockNumbersSuccess({
      kovan: 0,
      rinkeby: 0,
      ropsten: 0,
      mainnet: latestBlockNumberMainnet,
    }))
  } catch (err) {
    yield put(walletsCreate.blockNumbersError(err))
  }
}

function* clean(): Saga<void> {
  yield put(wallets.clean())
  yield put(walletsCreate.clean())
}

export function* walletsCreateRootSaga(): Saga<void> {
  yield takeEvery(walletsCreate.CLOSE_VIEW, clean)
  yield takeEvery(walletsCreate.OPEN_VIEW, openView)
  yield takeEvery(walletsCreate.GO_TO_NEXT_STEP, setNextStep)
  yield takeEvery(walletsCreate.GO_TO_PREV_STEP, setPrevStep)
  yield takeEvery(walletsCreate.CREATE_ERROR, createError)
  yield takeEvery(walletsCreate.CREATE_SUCCESS, createSuccess)
  yield takeEvery(walletsCreate.BLOCK_NUMBERS_REQUEST, blockNumbersRequest)
}
