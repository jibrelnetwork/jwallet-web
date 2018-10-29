// @flow

import Promise from 'bluebird'
import jibrelContractsApi from '@jibrelnetwork/contracts-jsapi'
import { flatten, prop, sortBy, reverse } from 'ramda'
import { keccak256 } from 'js-sha3'

import config from 'config'
import checkJNTAsset from 'utils/digitalAssets/checkJNTAsset'
import getFormattedDateString from 'utils/time/getFormattedDateString'

const PUSH_INSTRUCTION = '63'

export const EMPTY_CONTRACT_CODE = '0x'

const { defaultDecimals } = config

type RPCProps = {
  rpcaddr: string,
  rpcport: number,
  ssl: boolean,
}

/* eslint-disable-next-line fp/no-let */
let rpcProps: RPCProps = {
  rpcaddr: 'ropsten-node.jwallet.network',
  rpcport: 443,
  ssl: true,
}

function setRpcProps(props: RPCProps): void {
  /* eslint-disable-next-line fp/no-mutation */
  rpcProps = props
}

function getRpcProps(): RPCProps {
  return rpcProps
}

function getETHBalance(address: Address): Promise<number> {
  return jibrelContractsApi.eth
    .getBalance({ ...rpcProps, address })
    .then(balance => (balance.toNumber() / (10 ** defaultDecimals)))
}

function getTokenBalance(
  contractAddress: Address,
  owner: Address,
  decimals: Decimals = defaultDecimals,
): Promise<number> {
  return jibrelContractsApi.contracts.erc20
    .balanceOf({ ...rpcProps, contractAddress, owner })
    .then(balance => (balance.toNumber() / (10 ** decimals)))
}

function getAssetBalance(
  contractAddress: Address,
  owner: Address,
  decimals: Decimals,
): Promise<number> {
  return jibrelContractsApi.contracts.erc20
    .balanceOf({ ...rpcProps, contractAddress, owner })
    .then(balance => (balance.toNumber() / (10 ** decimals)))
}

function getContractDecimals(
  contractAddress: Address
): Promise<number> {
  return jibrelContractsApi.contracts.erc20Named
    .decimals({ ...rpcProps, contractAddress })
    .then(decimals => parseInt(decimals.c, 10))
}

function getContractName(
  contractAddress: Address
): Promise<string> {
  return jibrelContractsApi.contracts.erc20Named
    .name({ ...rpcProps, contractAddress })
}

function getContractSymbol(
  contractAddress: Address
): Promise<string> {
  return jibrelContractsApi.contracts.erc20Named
    .symbol({ ...rpcProps, contractAddress })
}

function getContractCode(
  contractAddress: Address
): Promise<string> {
  return jibrelContractsApi.eth.getCode({ ...rpcProps, address: contractAddress })
}

/**
 * @function checkSignatureInContract
 *
 * @description Check existatce of function signature in contract
 *
 * @param {string} contractCode - code of contract, use eth.getCode to get it
 * @param {string} signature - signature (function name) to check
 *
 * @returns {boolean}
 *
 * @example
 *    const code = <some contract code> 0xABABABABABBDDSBBD....
 *    const signature = 'transferFrom(address,address,uint256)'
 *    console.log(checkSignature(code, signature))
 */
function checkSignatureInContract(contractCode: string, signature: string): boolean {
  return (contractCode
    .toLowerCase()
    .indexOf(PUSH_INSTRUCTION + keccak256(signature).substring(0, 8)) !== -1
  )
}

/**
 * Check that contract code has all required ERC20 methods
 *
 * @param {string} contractCode
 * @returns {boolean}
 */
function checkContractCodeIsERC20(contractCode: string): boolean {
  const signatures = [
    'totalSupply()',
    'transferFrom(address,address,uint256)',
    'balanceOf(address)',
    'transfer(address,uint256)',
    'allowance(address,address)',
    'approve(address,uint256)',
  ]

  // run checkSignatureInContract and try to find False in result
  // if at least one False in array- contract is not ERC20 compatible
  const falseFound = signatures
    .map(sign => checkSignatureInContract(contractCode, sign))
    .find(isFound => !isFound)

  return (falseFound !== false)
}

function getETHTransactions(address: Address) {
  return jibrelContractsApi.eth
    .getPastLogs({
      ...rpcProps,
      options: {
        address,
        fromBlock: 0,
        toBlock: 'latest',
      },
    })
    .then(list => getTransactionsInfo(list, false))
    .then(list => parseTransactions(list, defaultDecimals))
    .then(sortTransactions)
}

function getTransactionsInfo(list: any, isContract: boolean) {
  return Promise.all([
    getBlocks(list),
    getTransactions(list, isContract),
    getTransactionReceipts(list),
  ]).then(([
    blocksData,
    transactionsData,
    transactionReceiptsData,
  ]) => list.map(({ transactionHash, blockHash, address, from, to, value }, index) => ({
    ...blocksData[index],
    ...transactionsData[index],
    ...transactionReceiptsData[index],
    to,
    from,
    value,
    address,
    blockHash,
    transactionHash,
    status: getTransactionStatus(blockHash),
  })))
}

function getLast50(list: any) {
  return list.slice(-50)
}

function getTransactionStatus(blockHash: Hash) {
  return blockHash
    ? i18n('transactions.table.statusValue.accepted')
    : i18n('transactions.table.statusValue.pending')
}

function getBlocks(list: any) {
  return Promise.all(list.map(item => getBlock(item))).then(getBlocksData)
}

function getBlock(item: { blockHash: Hash }) {
  const blockId = item.blockHash

  return blockId ? jibrelContractsApi.eth.getBlock({ ...rpcProps, blockId }) : {}
}

function getBlocksData(blocksData: any = []) {
  return blocksData.map((blockData = {}) => ({
    /**
     * web3 returns timestamp in unix format,
     * so for new Date it should be converted (mul by 1000)
     */
    timestamp: (blockData.timestamp || 0) * 1000,
  }))
}

function getTransactions(list: any, isContract: boolean) {
  return Promise
    .all(list.map(item => getTransaction(item)))
    .then(data => getTransactionsData(data, isContract))
}

function getTransaction(item: any) {
  return jibrelContractsApi.eth
    .getTransaction({ ...rpcProps, transactionHash: item.transactionHash })
}

function getTransactionsData(transactionsData: any = [], isContract: boolean = false) {
  return transactionsData.map((transactionData = {}) => {
    const { from, to, value, gasPrice } = transactionData
    const _gasPrice = gasPrice ? (gasPrice.toNumber() / (10 ** defaultDecimals)) : 0
    const _value = value ? value.toNumber() : 0

    return isContract ? { gasPrice: _gasPrice } : { from, to, value: _value, gasPrice: _gasPrice }
  })
}

function getTransactionReceipts(list: any) {
  return Promise
    .all(list.map(item => getTransactionReceipt(item)))
    .then(getTransactionReceiptsData)
}

function getTransactionReceipt(item: any) {
  return jibrelContractsApi.eth
    .getTransactionReceipt({ ...rpcProps, transactionHash: item.transactionHash })
}

function getTransactionReceiptsData(transactionReceiptsData: any = []) {
  return transactionReceiptsData.map((transactionReceiptData) => {
    const { gasUsed, status } = transactionReceiptData

    return {
      gas: (gasUsed || 0),
      /**
       * status flag contains 0 if tx was rejected and 1 otherwise
       * (see Byzantium changes)
       */
      isRejected: (status === 0),
    }
  })
}

function parseTransactions(list: any, decimals: Decimals) {
  return list.map(item => parseTransaction(item, decimals))
}

function parseTransaction(item: any, decimals: Decimals) {
  const { timestamp, address, from, to, value, gas, gasPrice, isRejected, removed } = item

  // case-insensitive comparison
  const isSender: boolean = (!!from && (address.toLowerCase() === from.toLowerCase()))

  return {
    ...item,
    contractAddress: null,
    fee: (gas * gasPrice),
    address: isSender ? to : from,
    amount: (value / (10 ** decimals)),
    type: isSender ? 'send' : 'receive',
    /**
     * removed flag is present for contract events only
     * (see https://github.com/ethereum/wiki/wiki/JavaScript-API#contract-events)
     */
    status: (isRejected || removed) ? i18n('transactions.table.statusValue.rejected') : item.status,
    date: timestamp ? getFormattedDateString(new Date(timestamp), 'hh:mm MM/DD/YYYY') : 'n/a',
  }
}

function sortTransactions(list: any) {
  const listSorted = sortBy(prop('timestamp'))(list)
  const listReversed = reverse(listSorted)

  return listReversed
}

function getContractTransactions(contractAddress: Address, owner: Address, decimals: Decimals) {
  const transferTransactions = getERC20Transactions(contractAddress, owner, decimals)

  if (!checkJNTAsset(contractAddress)) {
    return transferTransactions
  }

  const mintableTransactions = getJNTTransactions(contractAddress, owner, decimals)

  return Promise
    .all([transferTransactions, mintableTransactions])
    .then(([transfer, mintable]) => transfer.concat(mintable))
    .then(sortTransactions)
}

function getJNTTransactions(contractAddress: Address, owner: Address, decimals: Decimals) {
  const mintEventProps = getEventsProps(contractAddress, 'MintEvent')
  const burnEventProps = getEventsProps(contractAddress, 'BurnEvent')
  const getEventsHandler = jibrelContractsApi.contracts.erc20Mintable.getPastEvents

  return Promise
    .all([getEventsHandler(mintEventProps), getEventsHandler(burnEventProps)])
    .then(events => mergeEvents(events, owner))
    .then(events => filterJNTEvents(events, owner))
    .then(getLast50)
    .then(list => getTransactionsInfo(list, true))
    .then(list => parseTransactions(list, decimals))
    .then(addJNTFlag)
}

function getERC20Transactions(contractAddress: Address, owner: Address, decimals: number) {
  const fromProps = getEventsProps(contractAddress, 'Transfer', { from: owner })
  const toProps = getEventsProps(contractAddress, 'Transfer', { to: owner })
  const getEventsHandler = jibrelContractsApi.contracts.erc20.getPastEvents

  return Promise
    .all([getEventsHandler(fromProps), getEventsHandler(toProps)])
    .then(events => mergeEvents(events, owner))
    .then(getLast50)
    .then(list => getTransactionsInfo(list, true))
    .then(list => parseTransactions(list, decimals))
    .then(sortTransactions)
}

function filterJNTEvents(events: any, owner: Address) {
  return events
    // case-insensitive comparison
    .filter(event => (event.owner.toLowerCase() === owner.toLowerCase()))
    .map(event => ({
      ...event,
      from: isMintEvent(event) ? null : owner,
      to: isMintEvent(event) ? owner : null,
    }))
}

function mergeEvents(events: any, owner: Address) {
  // events contains [from, to] list
  return flatten(events.map(list => list.map(event => getContractEventData(event, owner))))
}

function getContractEventData(item: any, address: Address) {
  const { args, blockHash, transactionHash, event, removed } = item || {}

  return { blockHash, transactionHash, event, removed, address, ...args }
}

function getEventsProps(contractAddress: Address, event: string = 'Transfer', filter: any = {}) {
  return {
    ...rpcProps,
    event,
    contractAddress,
    options: { filter, fromBlock: 0, toBlock: 'latest' },
  }
}

function sendETHTransaction(props: any = {}) {
  return jibrelContractsApi.eth.sendTransaction({ ...rpcProps, ...props })
}

function sendContractTransaction(props: any = {}) {
  return jibrelContractsApi.contracts.erc20.transfer({ ...rpcProps, ...props })
}

function isMintEvent(data: { event: string }) {
  return (data.event === 'MintEvent')
}

function addJNTFlag(list: any) {
  return list.map(item => ({ ...item, isJNT: true }))
}

export default {
  EMPTY_CONTRACT_CODE,
  setRpcProps,
  getRpcProps,
  getETHBalance,
  getTokenBalance,
  getAssetBalance,
  getETHTransactions,
  getContractTransactions,
  sendETHTransaction,
  sendContractTransaction,
  getContractName,
  getContractSymbol,
  getContractDecimals,
  getContractCode,
  checkContractCodeIsERC20,
  checkSignatureInContract,
}
