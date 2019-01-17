// @flow

import jibrelContractsApi from '@jibrelnetwork/contracts-jsapi'
import { keccak256 } from 'js-sha3'

import checkETH from 'utils/digitalAssets/checkETH'
import getAddressWithChecksum from 'utils/address/getAddressWithChecksum'
import * as type from 'utils/type'
import BigNumber from 'bignumber.js'

type ERC20MethodName =
  'approve' |
  'transfer' |
  'Transfer' |
  'balanceOf' |
  'allowance' |
  'totalSupply' |
  'transferFrom'

type ERC20InterfaceSignatures = { [ERC20MethodName]: ?Hash }

const ERC20_INTERFACE_SIGNATURES: ERC20InterfaceSignatures = {
  approve: keccak256('totalSupply()'),
  transfer: keccak256('balanceOf(address)'),
  balanceOf: keccak256('approve(address,uint256)'),
  allowance: keccak256('transfer(address,uint256)'),
  totalSupply: keccak256('allowance(address,address)'),
  Transfer: keccak256('Transfer(address,address,uint256)'),
  transferFrom: keccak256('transferFrom(address,address,uint256)'),
}

function isBigNumber(data: any): boolean {
  return (
    !type.isVoid(data) &&
    type.isObject(data) &&
    (typeof data.toString === 'function') &&
    (typeof data.toNumber === 'function')
  )
}

export function getAssetBalance(
  network: Network,
  owner: OwnerAddress,
  assetAddress: AssetAddress,
): Promise<string> {
  const {
    rpcaddr,
    rpcport,
    ssl,
  }: Network = network

  const balancePromise: Promise<any> = checkETH(assetAddress)
    ? jibrelContractsApi.eth.getBalance({
      rpcaddr,
      rpcport,
      ssl,
      address: owner,
    }) : jibrelContractsApi.contracts.erc20.balanceOf({
      owner,
      rpcaddr,
      rpcport,
      ssl,
      contractAddress: assetAddress,
    })

  return balancePromise.then((value: any) => {
    if (!isBigNumber(value)) {
      throw new Error('Returned balance is not an instance of BigNumber')
    }

    return value.toString()
  })
}

function getAssetDecimals(network: Network, assetAddress: AssetAddress): Promise<number> {
  const {
    rpcaddr,
    rpcport,
    ssl,
  }: Network = network

  return jibrelContractsApi.contracts.erc20Named.decimals({
    rpcaddr,
    rpcport,
    ssl,
    contractAddress: assetAddress,
  }).then((value: any) => {
    if (!isBigNumber(value)) {
      throw new Error('Returned decimals is not an instance of BigNumber')
    }

    return value.toNumber()
  })
}

function getAssetName(network: Network, assetAddress: AssetAddress): Promise<string> {
  const {
    rpcaddr,
    rpcport,
    ssl,
  }: Network = network

  return jibrelContractsApi.contracts.erc20Named.name({
    rpcaddr,
    rpcport,
    ssl,
    contractAddress: assetAddress,
  })
}

function getAssetSymbol(network: Network, assetAddress: AssetAddress): Promise<string> {
  const {
    rpcaddr,
    rpcport,
    ssl,
  }: Network = network

  return jibrelContractsApi.contracts.erc20Named.symbol({
    rpcaddr,
    rpcport,
    ssl,
    contractAddress: assetAddress,
  })
}

function getSmartContractCode(network: Network, assetAddress: AssetAddress): Promise<string> {
  const {
    rpcaddr,
    rpcport,
    ssl,
  }: Network = network

  return jibrelContractsApi.eth.getCode({
    rpcaddr,
    rpcport,
    ssl,
    address: assetAddress,
  })
}

function checkMethodSignatureInSmartContractCode(
  smartContractCode: string,
  methodName: ERC20MethodName,
): boolean {
  /**
   * For the reference please check:
   * https://medium.com/@hayeah/how-to-decipher-a-smart-contract-method-call-8ee980311603
   */
  const methodSignatureHash: ?string = ERC20_INTERFACE_SIGNATURES[methodName]

  if (!methodSignatureHash) {
    throw new Error(`Hash of signature is not found for ${methodName}`)
  }

  const firstFourBytesOfHash: string = methodSignatureHash.substring(0, 8)
  const code: string = smartContractCode.toLowerCase()
  const isFound: boolean = code.indexOf(firstFourBytesOfHash) !== -1

  return isFound
}

function checkERC20InterfaceCode(
  smartContractCode: string,
  isAllMethodsRequired: boolean = false,
): boolean {
  const signatures: ERC20MethodName[] = isAllMethodsRequired ? [
    'approve',
    'transfer',
    'Transfer',
    'allowance',
    'balanceOf',
    'totalSupply',
    'transferFrom',
  ] : [
    'transfer',
    'Transfer',
    'balanceOf',
  ]

  return !signatures.map((methodName: ERC20MethodName) => checkMethodSignatureInSmartContractCode(
    smartContractCode,
    methodName,
  )).find(isFound => !isFound)
}

function prepareBlock(data: any): BlockData {
  if (!(
    !type.isVoid(data) &&
    type.isObject(data) &&
    type.isString(data.hash) &&
    type.isString(data.parentHash) &&
    type.isNumber(data.number) &&
    type.isNumber(data.timestamp)
  )) {
    throw new Error('Invalid ETH block format')
  }

  const {
    hash,
    parentHash,
    number,
    timestamp,
  }: Object = data

  return {
    hash,
    parentHash,
    number,
    minedAt: timestamp,
    requestedAt: Date.now(),
    isBalancesLoading: true,
    isBalancesFetched: false,
    isTransactionsLoading: true,
    isTransactionsFetched: false,
  }
}

export function getBlock(network: Network, blockId: BlockId): Promise<BlockData> {
  const {
    rpcaddr,
    rpcport,
    ssl,
  }: Network = network

  return jibrelContractsApi.eth.getBlock({
    rpcaddr,
    rpcport,
    ssl,
    blockId,
  }).then(prepareBlock)
}

function getBlockData(network: Network, blockId: BlockId): Promise<TransactionBlockData> {
  return getBlock(network, blockId).then(({ minedAt }: BlockData): TransactionBlockData => ({
    timestamp: minedAt,
  }))
}

function prepareTransaction(data: any): TransactionData {
  if (!(
    !type.isVoid(data) &&
    type.isObject(data) &&
    isBigNumber(data.gasPrice)
  )) {
    throw new Error('Invalid ETH transaction format')
  }

  return {
    gasPrice: data.gasPrice.toString(),
  }
}

function getTransactionData(network: Network, hash: Hash): Promise<TransactionData> {
  const {
    rpcaddr,
    rpcport,
    ssl,
  }: Network = network

  return jibrelContractsApi.eth.getTransaction({
    rpcaddr,
    rpcport,
    ssl,
    transactionHash: hash,
  }).then(prepareTransaction)
}

function prepareTransactionReceipt(data: any): TransactionReceiptData {
  if (!(
    !type.isVoid(data) &&
    type.isObject(data) &&
    type.isNumber(data.gasUsed)
  )) {
    throw new Error('Invalid ETH transaction format')
  }

  const {
    gasUsed,
    status,
  }: Object = data

  return {
    gasUsed,
    /**
     * status flag contains 0 if tx was rejected and 1 otherwise
     * (see Byzantium changes)
     */
    status: (parseInt(status, 16) === 1) ? 1 : 0,
  }
}

function getTransactionReceiptData(network: Network, hash: Hash): Promise<TransactionReceiptData> {
  const {
    rpcaddr,
    rpcport,
    ssl,
  }: Network = network

  return jibrelContractsApi.eth.getTransactionReceipt({
    rpcaddr,
    rpcport,
    ssl,
    transactionHash: hash,
  }).then(prepareTransactionReceipt)
}

function handleEventsResponse(response: any): Array<any> {
  if (type.isVoid(response) || !type.isArray(response)) {
    throw new Error('Invalid contract events response')
  }

  return response
}

function filterEvents(list: Array<any>): Array<Object> {
  return list.filter((item: any): boolean => (!type.isVoid(item) && type.isObject(item)))
}

function checkTransferEvent(data: Object): boolean {
  return (
    type.isString(data.address) &&
    !type.isVoid(data.args) &&
    type.isObject(data.args) &&
    type.isString(data.args.to) &&
    isBigNumber(data.args.value) &&
    type.isString(data.args.from) &&
    type.isNumber(data.logIndex) &&
    type.isString(data.blockHash) &&
    type.isNumber(data.blockNumber) &&
    type.isString(data.transactionHash)
  )
}

function prepareTransferEvents(data: Array<Object>): Transactions {
  return data.reduce((result: Transactions, item: Object): Transactions => {
    if (!checkTransferEvent(item)) {
      return result
    }

    const {
      args,
      logIndex,
      blockHash,
      blockNumber,
      transactionHash,
      removed,
    }: TransferEventFromEthereumNode = item

    const {
      to,
      from,
      value,
    } = args

    const newTransaction: Transaction = {
      to: getAddressWithChecksum(to),
      from: getAddressWithChecksum(from),
      blockHash,
      blockNumber,
      data: null,
      blockData: null,
      receiptData: null,
      amount: value,
      hash: transactionHash,
      contractAddress: null,
      eventType: 1,
      isRemoved: !!removed,
    }

    return {
      ...result,
      [`${transactionHash}${logIndex}`]: newTransaction,
    }
  }, {})
}

function getTransferEvents(
  network: Network,
  assetAddress: AssetAddress,
  filter: SmartContractEventFilter,
  fromBlock: number,
  toBlock: number,
): Promise<Transactions> {
  const {
    rpcaddr,
    rpcport,
    ssl,
  }: Network = network

  const fromProps: SmartContractEventProps = {
    rpcaddr,
    rpcport,
    ssl,
    event: 'Transfer',
    contractAddress: assetAddress,
    options: {
      filter,
      toBlock,
      fromBlock,
    },
  }

  return jibrelContractsApi.contracts.erc20
    .getPastEvents(fromProps)
    .then(handleEventsResponse)
    .then(filterEvents)
    .then(prepareTransferEvents)
}

function getTransferEventsTo(
  network: Network,
  assetAddress: AssetAddress,
  to: OwnerAddress,
  fromBlock: number,
  toBlock: number,
): Promise<Transactions> {
  return getTransferEvents(network, assetAddress, { to }, fromBlock, toBlock)
}

function getTransferEventsFrom(
  network: Network,
  assetAddress: AssetAddress,
  from: OwnerAddress,
  fromBlock: number,
  toBlock: number,
): Promise<Transactions> {
  return getTransferEvents(network, assetAddress, { from }, fromBlock, toBlock)
}

function checkJNTEvent(data: Object): boolean {
  return (
    type.isString(data.event) &&
    type.isString(data.address) &&
    !type.isVoid(data.args) &&
    type.isObject(data.args) &&
    isBigNumber(data.args.value) &&
    type.isString(data.args.owner) &&
    type.isNumber(data.logIndex) &&
    type.isString(data.blockHash) &&
    type.isNumber(data.blockNumber) &&
    type.isString(data.transactionHash)
  )
}

function prepareJNTEvents(data: Array<Object>, assetAddress: AssetAddress): Transactions {
  return data.reduce((result: Transactions, item: Object): Transactions => {
    if (!checkJNTEvent(item)) {
      return result
    }

    const {
      args,
      event,
      logIndex,
      blockHash,
      blockNumber,
      transactionHash,
      removed,
    }: JNTEventFromEthereumNode = item

    const {
      owner,
      value,
    }: JNTEventArgs = args

    const ownerAddressChecksum: OwnerAddress = getAddressWithChecksum(owner)
    const assetAddressChecksum: AssetAddress = getAddressWithChecksum(assetAddress)

    const newTransaction: Transaction = {
      blockHash,
      blockNumber,
      data: null,
      blockData: null,
      receiptData: null,
      amount: value,
      hash: transactionHash,
      contractAddress: null,
      to: (event === 'MintEvent') ? ownerAddressChecksum : assetAddressChecksum,
      from: (event === 'BurnEvent') ? ownerAddressChecksum : assetAddressChecksum,
      eventType: 1,
      isRemoved: !!removed,
    }

    return {
      ...result,
      [`${transactionHash}${logIndex}`]: newTransaction,
    }
  }, {})
}

function getJNTEvents(
  network: Network,
  assetAddress: AssetAddress,
  event: JNTEventName,
  owner: OwnerAddress,
  fromBlock: number,
  toBlock: number,
): Promise<Transactions> {
  const {
    rpcaddr,
    rpcport,
    ssl,
  }: Network = network

  const fromProps: SmartContractEventProps = {
    rpcaddr,
    rpcport,
    ssl,
    event,
    contractAddress: assetAddress,
    options: {
      toBlock,
      fromBlock,
      filter: {
        owner,
      },
    },
  }

  return jibrelContractsApi.contracts.erc20Mintable
    .getPastEvents(fromProps)
    .then(handleEventsResponse)
    .then(filterEvents)
    .then((data: Array<Object>): Transactions => prepareJNTEvents(data, assetAddress))
}

function getMintEvents(
  network: Network,
  assetAddress: AssetAddress,
  ownerAddress: OwnerAddress,
  fromBlock: number,
  toBlock: number,
): Promise<Transactions> {
  return getJNTEvents(network, assetAddress, 'MintEvent', ownerAddress, fromBlock, toBlock)
}

function getBurnEvents(
  network: Network,
  assetAddress: AssetAddress,
  ownerAddress: OwnerAddress,
  fromBlock: number,
  toBlock: number,
): Promise<Transactions> {
  return getJNTEvents(network, assetAddress, 'BurnEvent', ownerAddress, fromBlock, toBlock)
}

function sendTransaction(
  network: Network,
  assetAddress: AssetAddress,
  props: SendTransactionProps,
): Promise<string> {
  const {
    rpcaddr,
    rpcport,
    ssl,
  }: Network = network

  const baseProps = {
    ...props,
    rpcaddr,
    rpcport,
    ssl,
  }

  if (checkETH(assetAddress)) {
    return jibrelContractsApi.eth.sendTransaction({
      ...baseProps,
    })
  } else {
    return jibrelContractsApi.contracts.erc20.transfer({
      ...baseProps,
      contractAddress: assetAddress,
    })
  }
}

function getGasPrice(network: Network): Promise<BigNumber> {
  const {
    rpcaddr,
    rpcport,
    ssl,
  } = network

  return jibrelContractsApi.eth.getGasPrice({
    rpcaddr,
    rpcport,
    ssl,
  })
}

function getNonce(network: Network, address: Address): Promise<number> {
  const {
    rpcaddr,
    rpcport,
    ssl,
  } = network

  return jibrelContractsApi.eth.getNonce({
    rpcaddr,
    rpcport,
    ssl,
    address,
  })
}

function estimateGas(
  network: Network,
  assetAddress: AssetAddress,
  props: SendTransactionProps,
): Promise<number> {
  const {
    rpcaddr,
    rpcport,
    ssl,
  }: Network = network

  if (checkETH(assetAddress)) {
    return jibrelContractsApi.eth.estimateGas({
      ssl,
      rpcaddr,
      rpcport,
      to: props.to,
      value: props.value,
    })
  } else {
    // to be fixed
    return jibrelContractsApi.contracts.erc20.estimateGas({
      ssl,
      rpcaddr,
      rpcport,
      contractAddress: assetAddress,
      privateKey: props.privateKey,
      method: 'transfer',
      args: [props.to, props.value],
    })
  }
}

export default {
  getBlock,
  getNonce,
  estimateGas,
  getGasPrice,
  getBlockData,
  getAssetName,
  getBurnEvents,
  getMintEvents,
  getAssetSymbol,
  getAssetBalance,
  getAssetDecimals,
  sendTransaction,
  getTransactionData,
  getTransferEventsTo,
  getSmartContractCode,
  getTransferEventsFrom,
  checkERC20InterfaceCode,
  getTransactionReceiptData,
}
