// @flow strict

import abiDecoder from 'abi-decoder'

import config from 'config'
import getENVVar from 'utils/config/getENVVar'
import { isZero } from 'utils/numbers'
import { getAddressChecksum } from 'utils/address'
import * as type from 'utils/type'

import { callAPI } from './callAPI'

type BlockExplorerAPIParams = {|
  +action: 'txlist',
  +sort: SortDirection,
  +page?: number,
  +offset?: number,
  +endblock?: number,
  +startblock?: number,
|}

const ERC20_TRANSFER_ABI = [{
  constant: false,
  inputs: [{
    name: 'to',
    type: 'address',
  }, {
    name: 'value',
    type: 'uint256',
  }],
  name: 'transfer',
  outputs: [{
    name: 'success',
    type: 'bool',
  }],
  payable: false,
  type: 'function',
}]

abiDecoder.addABI(ERC20_TRANSFER_ABI)

const ENDPOINT_NAMES_BY_NETWORK_ID: { [NetworkId]: BlockExplorerAPISubdomain } = {
  '1': 'mainnet',
  '3': 'ropsten',
  '42': 'kovan',
  '4': 'rinkeby',
}

const EXPLORER_API: string = getENVVar('__BLOCKEXPLORER_API__') || __DEFAULT_BLOCKEXPLORER_API__

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
    throw new Error('Block Explorer Request Transactions Error')
  }

  return result
}

function checkETHTransaction(data: Object): boolean {
  return (
    type.isString(data.to) &&
    type.isString(data.gas) &&
    type.isString(data.from) &&
    type.isString(data.hash) &&
    type.isString(data.input) &&
    type.isString(data.nonce) &&
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
    if (type.isVoid(item) || !type.isObject(item)) {
      return false
    }

    const {
      to,
      input,
      value,
      isError,
      contractAddress,
    }: Object = item

    const isNotEmptyAmount: boolean = isZero(value)
    const isNotEmptyInput: boolean = (input === '0x')
    const isCancel: boolean = (to === config.cancelAddress)
    const isFailed: boolean = (parseInt(isError, 16) === 1)
    const isContractCreation: boolean = !!contractAddress.length

    return isNotEmptyAmount || isNotEmptyInput || isCancel || isFailed || isContractCreation
  })
}

function checkTransferInput(name: string): boolean {
  return (name === 'transfer')
}

function getInputParams(params: any[]): TransactionContractTransferData {
  return params.reduce((
    result: TransactionContractTransferData,
    param: any,
  ): TransactionContractTransferData => {
    if (!param) {
      return result
    }

    const {
      name,
      value,
      type: paramType,
    } = param

    if ((name === 'to') && (paramType === 'address')) {
      return {
        ...result,
        to: getAddressChecksum(value),
      }
    } else if ((name === 'value') && (paramType === 'uint256')) {
      return {
        ...result,
        amount: value,
      }
    }

    return result
  }, {
    amount: '0',
    to: `0x${'0'.repeat(40)}`,
  })
}

function modifyTransferTransaction(
  item: Transaction,
  input: string,
): Transaction {
  const data = abiDecoder.decodeMethod(input)

  if (!(data && checkTransferInput(data.name))) {
    return item
  }

  return {
    ...item,
    contractTransferData: getInputParams(data.params),
  }
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
      input,
      nonce,
      value,
      gasUsed,
      isError,
      gasPrice,
      blockHash,
      timeStamp,
      blockNumber,
      contractAddress,
    }: TransactionFromBlockExplorer = item

    const hasInput: boolean = (input !== '0x')
    const status: TransactionStatus = (parseInt(isError, 16) === 1) ? 0 : 1

    const newTransaction: Transaction = {
      data: {
        gasPrice,
        hasInput,
        nonce: parseInt(nonce, 10) || 0,
      },
      blockData: {
        timestamp: parseInt(timeStamp, 10) || 0,
      },
      receiptData: {
        status,
        gasUsed: parseInt(gasUsed, 10) || 0,
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

    if (!status && hasInput) {
      return {
        ...result,
        [hash]: modifyTransferTransaction(
          newTransaction,
          input,
        ),
      }
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
  const apiSubdomain: ?BlockExplorerAPISubdomain = ENDPOINT_NAMES_BY_NETWORK_ID[networkId]

  if (!apiSubdomain) {
    throw new Error('Block Explorer Private Network Error')
  }

  const apiEnpoint: string = `${EXPLORER_API}/v1/${apiSubdomain}/${owner}/transactions`

  const params: BlockExplorerAPIParams = {
    endblock,
    startblock,
    sort: 'desc',
    action: 'txlist',
  }

  const queryParams: string = Object
    .keys(params)
    .map(key => (key && (params[key] != null)) ? `${key}=${params[key]}` : '')
    .join('&')
    .replace(/&$/, '')

  return callAPI(
    `${apiEnpoint}?${queryParams}`,
    config.blockExplorerAPIOptions,
  )
    .then(handleTransactionsResponse)
    .then(filterETHTransactions)
    .then(prepareETHTransactions)
}

export default {
  getETHTransactions,
}
