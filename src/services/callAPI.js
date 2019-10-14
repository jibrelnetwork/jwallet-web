// @flow strict

import Promise from 'bluebird'

import { gaSendException } from 'utils/analytics'

function handleRequestError(
  requestInfo: RequestInfo,
  options: RequestOptions,
  params: Object,
  retryCount: number,
): Promise<any> {
  return Promise
    .delay((2 ** ((retryCount > 6) ? 6 : retryCount)) * 1000)
    // eslint-disable-next-line no-use-before-define
    .then(() => callAPI(
      requestInfo,
      options,
      params,
      retryCount + 1,
    ))
}

export function callAPI(
  requestInfo: RequestInfo,
  options: RequestOptions,
  params?: ?Object,
  retryCount?: number = 0,
): Promise<any> {
  return fetch(requestInfo, {
    ...options,
    body: params ? JSON.stringify(params) : null,
  }).catch(() => handleRequestError(
    requestInfo,
    options,
    params,
    retryCount,
  )).then((response: Response): Promise<any> => {
    if (response.ok) {
      return response.json()
    }

    gaSendException({
      exDescription: 'Response from API is not ok',
      exFatal: false,
    })

    return handleRequestError(
      requestInfo,
      options,
      params,
      retryCount,
    )
  })
}
