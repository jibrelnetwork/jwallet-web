// @flow strict

import config from 'config'
import getENVVar from 'utils/config/getENVVar'
import { typeUtils } from 'utils'
import { CURRENCIES } from 'data'

import { callAPI } from './callAPI'

type TickerAPIParams = {|
  +id: FiatId[],
  +convert: FiatCurrency[],
  +source: 'coinmarketcap',
|}

const AVAILABLE_CURRENCIES: string[] = Object.keys(CURRENCIES)
const TICKER_API: string = getENVVar('__TICKER_API__') || __DEFAULT_TICKER_API__

function handleFiatCoursesResponse(response: any): Object {
  if (typeUtils.isVoid(response) || !typeUtils.isObject(response)) {
    return {}
  }

  if (response.errors) {
    return {}
  }

  return response
}

function prepareFiatCourses(data: Object): FiatCoursesAPI {
  const responseKeys: string[] = Object.keys(data)

  return responseKeys.reduce((
    reduceResult: FiatCoursesAPI,
    fiatId: string,
  ): FiatCoursesAPI => {
    const isKeyValid: boolean = !Number.isNaN(fiatId)

    if (!isKeyValid) {
      return reduceResult
    }

    const value: any = data[fiatId]

    if (typeUtils.isVoid(value) || !typeUtils.isObject(value)) {
      return reduceResult
    }

    const fiatCodes: string[] = Object.keys(value)

    const fiatCourse: FiatCourse = fiatCodes.reduce((
      resultCourse: FiatCourse,
      fiatCode: any,
    ): FiatCourse => {
      // filter invalid currency codes
      if (!AVAILABLE_CURRENCIES.includes(fiatCode)) {
        return resultCourse
      }

      return {
        ...resultCourse,
        [fiatCode]: value[fiatCode].toString(),
      }
    }, {})

    reduceResult[fiatId] = fiatCourse

    return reduceResult
  }, {})
}

function requestLatestCourses(
  fiatCurrency: FiatCurrency,
  fiatIds: FiatId[],
): Promise<FiatCoursesAPI> {
  const params: TickerAPIParams = {
    id: fiatIds,
    convert: [fiatCurrency],
    source: 'coinmarketcap',
  }

  return callAPI(
    `${TICKER_API}/v2/quotes`,
    config.tickerAPIOptions,
    params,
  )
    .then(handleFiatCoursesResponse)
    .then(prepareFiatCourses)
}

export default {
  requestLatestCourses,
}
