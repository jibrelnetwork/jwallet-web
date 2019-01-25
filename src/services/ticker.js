// @flow

import config from 'config'
import currenciesData from 'data/currencies'
import getENVVar from 'utils/config/getENVVar'
import { typeUtils } from 'utils'

const { tickerAPIOptions } = config

const TICKER_API: string = getENVVar('_TICKER_API__') || __DEFAULT_TICKER_API__

type TickerAPIParams = {|
  +id: FiatId[],
  +convert: FiatCurrency[],
  +source: 'coinmarketcap',
|}

function callApi(params: TickerAPIParams, retryCount: number = 4): Promise<any> {
  const requestInfo: RequestInfo = `${TICKER_API}/v2/quotes`

  const handleRequestError = () => {
    if (retryCount > 0) {
      return callApi(params, (retryCount - 1))
    }

    throw new Error('TickerRequestError')
  }

  return fetch(requestInfo, {
    ...tickerAPIOptions,
    body: JSON.stringify(params),
  }).catch(handleRequestError).then((response: Response): Promise<any> => {
    if (response.ok) {
      return response.json()
    }

    return handleRequestError()
  })
}

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

  return responseKeys.reduce((result: FiatCoursesAPI, fiatId: string): FiatCoursesAPI => {
    const isKeyValid: boolean = !Number.isNaN(fiatId)

    if (!isKeyValid) {
      return result
    }

    const value: any = data[fiatId]

    if (typeUtils.isVoid(value) || !typeUtils.isObject(value)) {
      return result
    }

    const fiatCodes: any[] = Object.keys(value)

    const fiatCourse: FiatCourse = fiatCodes.reduce((
      resultCourse: FiatCourse,
      fiatCode: any,
    ): FiatCourse => {
      // filter invalid currency codes
      if (!Object.keys(currenciesData).includes(fiatCode)) {
        return resultCourse
      }

      return {
        ...resultCourse,
        [fiatCode]: value[fiatCode].toString(),
      }
    }, {})

    return {
      ...result,
      [fiatId]: fiatCourse,
    }
  }, {})
}

function requestCourses(fiatCurrency: FiatCurrency, fiatIds: FiatId[]): Promise<FiatCoursesAPI> {
  return callApi({
    id: fiatIds,
    convert: [fiatCurrency],
    source: 'coinmarketcap',
  })
    .then(handleFiatCoursesResponse)
    .then(prepareFiatCourses)
}

export default {
  requestCourses,
}
