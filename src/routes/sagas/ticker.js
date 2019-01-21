// @flow

import {
  put,
  call,
  takeEvery,
} from 'redux-saga/effects'

import tickerService from 'services/ticker'

import * as ticker from '../modules/ticker'

const DEFAULT_FIAT_CURRENCY: FiatCurrency = 'USD'

function* fiatCoursesRequest(action: ExtractReturn<typeof ticker.fiatCoursesRequest>): Saga<void> {
  const { fiatIds } = action.payload
  const currentFiatCurrency: FiatCurrency = DEFAULT_FIAT_CURRENCY

  if (!(fiatIds.length && currentFiatCurrency)) {
    yield put(ticker.fiatCoursesSuccess({}))
  }

  try {
    const fiatCoursesAPI: FiatCoursesAPI = yield call(
      tickerService.requestCourses,
      DEFAULT_FIAT_CURRENCY,
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
  yield takeEvery(ticker.FIAT_COURSES_REQUEST, fiatCoursesRequest)
}
