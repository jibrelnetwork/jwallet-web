// @flow strict

import axios, { CancelToken } from 'axios'
import getENVVar from 'utils/config/getENVVar'

export const TRANSACTIONS_PER_PAGE = 500
const BLOCKEXPLORER_API =
  getENVVar('__BLOCKEXPLORER_API__') || __DEFAULT_BLOCKEXPLORER_API__

const source = CancelToken.source()

export const cancelAllGetEthTransactions = source.cancel

export async function getEthTransactions(
  networkId: string,
  ownerAddress: string,
  endBlock: number,
  page: number,
) {
  return axios
    .get(`${BLOCKEXPLORER_API}/v1/${networkId}/${ownerAddress}/transactions`, {
      params: {
        action: 'txlist',
        endblock: endBlock,
        offset: TRANSACTIONS_PER_PAGE,
        page,
        sort: 'desc',
      },
      cancelToken: source.token,
    })
}

