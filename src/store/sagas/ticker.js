// @flow

import {
  delay,
  type Task,
} from 'redux-saga'

import {
  put,
  call,
  fork,
  take,
  cancel,
  select,
  takeEvery,
} from 'redux-saga/effects'

import config from 'config'
import tickerService from 'services/ticker'
import { selectSettingsFiatCurrency } from 'store/selectors/settings'
import { selectActiveDigitalAssets } from 'store/selectors/digitalAssets'

import * as ticker from '../modules/ticker'

function getActiveAssetsFiatIds(items: DigitalAsset[]): FiatId[] {
  return items.reduce((result: FiatId[], { priceFeed }: DigitalAsset): FiatId[] => {
    if (!priceFeed) {
      return result
    }

    const { currencyID }: DigitalAssetPriceFeed = priceFeed

    return [
      ...result,
      currencyID.toString(),
    ]
  }, [])
}

function* syncFiatCourses(): Saga<void> {
  while (true) {
    const activeAssets: ExtractReturn<typeof selectActiveDigitalAssets> =
      yield select(selectActiveDigitalAssets)

    if (!activeAssets.length) {
      yield delay(config.fiatCoursesSyncTimeout)
      continue
    }

    const fiatIds: FiatId[] = getActiveAssetsFiatIds(activeAssets)

    yield put(ticker.fiatCoursesRequest(fiatIds))
    yield delay(config.fiatCoursesSyncTimeout)
  }
}

function* syncStart(): Saga<void> {
  const syncFiatCoursesTask: Task<typeof syncFiatCourses> = yield fork(syncFiatCourses)

  yield take(ticker.SYNC_STOP)
  yield cancel(syncFiatCoursesTask)
}

function* syncRestart(): Saga<void> {
  yield put(ticker.syncStop())
  yield put(ticker.syncStart())
}

function* fiatCoursesRequest(action: ExtractReturn<typeof ticker.fiatCoursesRequest>): Saga<void> {
  const { fiatIds } = action.payload

  const currentFiatCurrency: ExtractReturn<typeof selectSettingsFiatCurrency> =
    yield select(selectSettingsFiatCurrency)

  if (!(fiatIds.length && currentFiatCurrency)) {
    yield put(ticker.fiatCoursesSuccess({}))
  }

  try {
    const fiatCoursesAPI: FiatCoursesAPI = yield call(
      tickerService.requestCourses,
      currentFiatCurrency,
      fiatIds,
    )

    const fiatCourses: FiatCourses = fiatIds.reduce((
      result: FiatCourses,
      fiatId: FiatId,
    ): FiatCourses => {
      const fiatCourseByTime: FiatCourse = fiatCoursesAPI[fiatId] || {}

      const fiatCourseById: FiatCourseById = {
        latest: fiatCourseByTime,
      }

      return {
        ...result,
        [fiatId]: fiatCourseById,
      }
    }, {})

    yield put(ticker.fiatCoursesSuccess(fiatCourses))
  } catch (err) {
    yield put(ticker.fiatCoursesError(err))
  }
}

export function* tickerRootSaga(): Saga<void> {
  yield takeEvery(ticker.SYNC_START, syncStart)
  yield takeEvery(ticker.SYNC_RESTART, syncRestart)
  yield takeEvery(ticker.FIAT_COURSES_REQUEST, fiatCoursesRequest)
}
