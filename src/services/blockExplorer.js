// @flow

import { t } from 'ttag'

import {
  isNil,
  isObject,
} from 'lodash-es'

import config from 'config'
import isZero from 'utils/numbers/isZero'
import getENVVar from 'utils/config/getENVVar'
import { getAddressChecksum } from 'utils/address'
import * as type from 'utils/type'

const { blockExplorerAPIOptions }: AppConfig = config

const ENDPOINT_NAMES_BY_NETWORK_ID: { [NetworkId]: BlockExplorerAPISubdomain } = {
  '1': 'mainnet',
  '3': 'ropsten',
  '42': 'kovan',
  '4': 'rinkeby',
}

const BLOCKEXPLORER_API: string =
  getENVVar('__BLOCKEXPLORER_API__') || __DEFAULT_BLOCKEXPLORER_API__

type BlockExplorerAPIParams = {|
  +action: 'txlist',
  +sort: SortDirection,
  +page?: number,
  +offset?: number,
  +endblock?: number,
  +startblock?: number,
|}

function callApi(
  params: BlockExplorerAPIParams,
  networkId: NetworkId,
  address: OwnerAddress,
): Promise<any> {
  const apiSubdomain: ?BlockExplorerAPISubdomain = ENDPOINT_NAMES_BY_NETWORK_ID[networkId]

  if (!apiSubdomain) {
    throw new Error(t`BlockExplorerPrivateNetworkError`)
  }

  const apiEnpoint: string = `${BLOCKEXPLORER_API}/v1/${apiSubdomain}/${address}/transactions`

  const queryParams: string = Object
    .keys(params)
    .map(key => (key && (params[key] != null)) ? `${key}=${params[key]}` : '')
    .join('&')
    .replace(/&$/, '')

  const requestInfo: RequestInfo = `${apiEnpoint}?${queryParams}`

  return fetch(requestInfo, blockExplorerAPIOptions)
    .then((response: Response): Promise<any> => response.json())
}

function handleTransactionsResponse(response: any): any[] {
  if (type.isVoid(response) || !type.isObject(response)) {
    return []
  }

  const {
    result,
    message,
  }: Object = response

  const isResultValid: boolean = type.isArray(result)
  const isRequestFailed: boolean = (message !== 'OK')
  const isResultFound: boolean = (message !== 'No transactions found')

  if (!(isResultFound && isResultValid)) {
    return []
  } else if (isRequestFailed) {
    throw new Error(t`BlockExplorerRequestTransactionsError`)
  }

  return result
}

function checkETHTransaction(data: Object): boolean {
  return (
    type.isString(data.to) &&
    type.isString(data.gas) &&
    type.isString(data.from) &&
    type.isString(data.hash) &&
    type.isString(data.value) &&
    type.isString(data.gasUsed) &&
    type.isString(data.isError) &&
    type.isString(data.blockHash) &&
    type.isString(data.timeStamp) &&
    type.isString(data.blockNumber) &&
    type.isString(data.contractAddress)
  )
}

function filterETHTransactions(list: any[]): Object[] {
  return list.filter((item: any): boolean => {
    if (isNil(item) || !isObject(item)) {
      return false
    }

    const {
      value,
      isError,
      contractAddress,
    }: Object = item

    const isEmptyAmount: boolean = isZero(value)
    const isFailed: boolean = (parseInt(isError, 16) === 1)
    const isContractCreation: boolean = !!contractAddress.length

    return !(isEmptyAmount && !isContractCreation && !isFailed)
  })
}

function prepareETHTransactions(data: Object[]): Transactions {
  return data.reduce((result: Transactions, item: Object): Transactions => {
    if (!checkETHTransaction(item)) {
      return result
    }

    const {
      to,
      from,
      hash,
      value,
      gasUsed,
      isError,
      gasPrice,
      blockHash,
      timeStamp,
      blockNumber,
      contractAddress,
    }: TransactionFromBlockExplorer = item

    const newTransaction: Transaction = {
      data: {
        gasPrice,
      },
      blockData: {
        timestamp: parseInt(timeStamp, 10) || 0,
      },
      receiptData: {
        gasUsed: parseInt(gasUsed, 10) || 0,
        status: (parseInt(isError, 16) === 1) ? 0 : 1,
      },
      hash,
      blockHash,
      amount: value,
      from: getAddressChecksum(from),
      to: to.length ? getAddressChecksum(to) : null,
      contractAddress: contractAddress.length ? getAddressChecksum(contractAddress) : null,
      eventType: 0,
      blockNumber: parseInt(blockNumber, 10) || 0,
      isRemoved: false,
    }

    return {
      ...result,
      [hash]: newTransaction,
    }
  }, {})
}

function getETHTransactions(
  networkId: NetworkId,
  owner: OwnerAddress,
  startblock: number,
  endblock: number,
): Promise<any> {
  return callApi({
    endblock,
    startblock,
    sort: 'desc',
    action: 'txlist',
  }, networkId, owner)
    .then(handleTransactionsResponse)
    .then(filterETHTransactions)
    .then(prepareETHTransactions)
}

export default {
  getETHTransactions,
}
