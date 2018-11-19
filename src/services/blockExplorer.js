// @flow

import config from 'config'
import * as type from 'utils/type'

const ENDPOINT_NAMES = {
  '1': 'api',
  '3': 'ropsten',
  '42': 'kovan',
  '4': 'rinkeby',
}

type BlockExplorerAPIParams = {|
  address: Address,
  action: 'txlist',
  module: 'account',
  sort: 'asc' | 'desc',
  page: number,
  offset: number,
|}

function callApi(params: BlockExplorerAPIParams, networkId: NetworkId): Object {
  const apiEnpoint: string = `https://${ENDPOINT_NAMES[networkId]}.etherscan.io/api`

  const queryParams: string = Object
    .keys(params)
    .map(key => `${key}=${params[key]}`)
    .join('&')
    .replace(/&$/, '')

  return fetch(`${apiEnpoint}?${queryParams}`, config.blockExplorerApiOptions)
    .then(r => r.json())
}

function handlerTransactionsResponse(response: Object): Array<any> {
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
    throw (new Error('Can not get transactions'))
  }

  return result
}

function getTransactions(owner: Address, networkId: NetworkId) {
  return callApi({
    sort: 'desc',
    address: owner,
    action: 'txlist',
    module: 'account',
    page: 1,
    offset: 50,
    // endblock: currentBlock,
    // startblock: (currentBlock - (500 * 1000)),
  }, networkId).then(handlerTransactionsResponse)
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

function prepareETHTransactions(data: Array<Object>): Transactions {
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

    return {
      ...result,
      [hash]: {
        to,
        from,
        blockHash,
        contractAddress,
        eventType: 0,
        amount: parseInt(value, 10) || 0,
        status: parseInt(isError, 10) || 0,
        gasUsed: parseInt(gasUsed, 10) || 0,
        gasPrice: parseInt(gasPrice, 10) || 0,
        timestamp: parseInt(timeStamp, 10) || 0,
        blockNumber: parseInt(blockNumber, 10) || 0,
        isRemoved: false,
      },
    }
  }, {})
}

function filterETHTransactions(list: Array<any>): Array<Object> {
  return list.filter((item: any): boolean => {
    if (!type.isObject(item)) {
      return false
    }

    const {
      amount,
      contractAddress,
    }: Object = item

    const isEmptyAmount: boolean = (amount === 0)
    const isContractCreation: boolean = !!contractAddress.length

    return !(isEmptyAmount && !isContractCreation)
  })
}

function getETHTransactions(owner: Address, networkId: NetworkId): Promise<any> {
  return getTransactions(owner, networkId)
    .then(filterETHTransactions)
    .then(prepareETHTransactions)
}

export default {
  getETHTransactions,
}
