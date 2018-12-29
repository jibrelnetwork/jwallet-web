// @flow

import config from 'config'
import isZero from 'utils/numbers/isZero'
import getAddressWithChecksum from 'utils/wallets/getAddressWithChecksum'
import * as type from 'utils/type'

const { blockExplorerApiOptions } = config

const ENDPOINT_NAMES_BY_NETWORK_ID: { [NetworkId]: BlockExplorerAPISubdomain } = {
  '1': 'api',
  '3': 'ropsten',
  '42': 'kovan',
  '4': 'rinkeby',
}

type BlockExplorerAPIParams = {|
  +address: OwnerAddress,
  +action: 'txlist',
  +module: 'account',
  +sort: SortDirection,
  +page?: number,
  +offset?: number,
  +endblock?: number,
  +startblock?: number,
|}

const MAIN_NETWORK_ETHERSCAN_API_SUBDOMAIN: string = 'api'

function getMainEthersanAPIEndpoint(apiSubdomain: BlockExplorerAPISubdomain): string {
  const isMainNetwork: boolean = (apiSubdomain === MAIN_NETWORK_ETHERSCAN_API_SUBDOMAIN)

  return (__DEV__ && isMainNetwork)
    ? 'http://ropsten.etherscan.io/api'
    : `http://${apiSubdomain}.etherscan.io/api`
}

function callApi(params: BlockExplorerAPIParams, networkId: NetworkId): Promise<any> {
  const apiSubdomain: ?BlockExplorerAPISubdomain = ENDPOINT_NAMES_BY_NETWORK_ID[networkId]

  if (!apiSubdomain) {
    throw new Error('Block explorer is not supported for private networks')
  }

  const apiEnpoint: string = getMainEthersanAPIEndpoint(apiSubdomain)

  const queryParams: string = Object
    .keys(params)
    .map(key => (key && (params[key] != null)) ? `${key}=${params[key]}` : '')
    .join('&')
    .replace(/&$/, '')

  const requestInfo: RequestInfo = `${apiEnpoint}?${queryParams}`

  return fetch(requestInfo, blockExplorerApiOptions)
    .then((response: Response): Promise<any> => response.json())
}

function handleTransactionsResponse(response: any): Array<any> {
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
    throw new Error('Can not get transactions')
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

function filterETHTransactions(list: Array<any>): Array<Object> {
  return list.filter((item: any): boolean => {
    if (type.isVoid(item) || !type.isObject(item)) {
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
      from: getAddressWithChecksum(from),
      to: to.length ? getAddressWithChecksum(to) : null,
      contractAddress: contractAddress.length ? getAddressWithChecksum(contractAddress) : null,
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
  owner: Address,
  startblock: number,
  endblock: number,
): Promise<any> {
  return callApi({
    endblock,
    startblock,
    sort: 'desc',
    address: owner,
    action: 'txlist',
    module: 'account',
  }, networkId)
    .then(handleTransactionsResponse)
    .then(filterETHTransactions)
    .then(prepareETHTransactions)
}

export default {
  getETHTransactions,
}
