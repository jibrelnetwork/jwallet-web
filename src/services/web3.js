// @flow

import Promise from 'bluebird'
import jibrelContractsApi from 'jibrel-contracts-jsapi'
import { flatten, sortBy } from 'lodash'

import config from 'config'
import { getFormattedDateString, isJNTContract } from 'utils'

const { defaultDecimals } = config

let rpcProps = {
  rpcaddr: '127.0.0.1',
  rpcport: 8545,
  ssl: false,
}

function setRpcProps(props: any) {
  rpcProps = props
}

function getRpcProps() {
  return rpcProps
}

function getETHBalance(address: Address) {
  if (!(address && address.length)) {
    return 0
  }

  return jibrelContractsApi.eth
    .getBalance({ ...rpcProps, address })
    .then(balance => (balance.toNumber() / (10 ** defaultDecimals)))
    .catch((err) => {
      console.error(err.message)

      return 0
    })
}

function getTokenBalance(
  contractAddress: Address,
  owner: Address,
  decimals: number = defaultDecimals,
) {
  if (!(owner && owner.length)) {
    return 0
  }

  return jibrelContractsApi.contracts.erc20
    .balanceOf({ ...rpcProps, contractAddress, owner })
    .then(balance => (balance.toNumber() / (10 ** decimals)))
    .catch((err) => {
      console.error(err.message)

      return 0
    })
}

function getETHTransactions(address: Address) {
  if (!(address && address.length)) {
    return []
  }

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
    .catch(handleTransactionsError)
}

function getTransactionsInfo(list: any, isContract: boolean) {
  return Promise.all([
    getBlocks(list),
    getTransactions(list, isContract),
    getTransactionReceipts(list),
  ]).then(([blocksData, transactionsData, transactionReceiptsData]) => {
    return list.map(({ transactionHash, blockHash, address, from, to, value }, index) => ({
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
    }))
  })
}

function getLast50(list: any = []) {
  return list.slice(-50)
}

function getTransactionStatus(blockHash: Hash) {
  return blockHash
    ? i18n('transactions.table.statusValue.accepted')
    : i18n('transactions.table.statusValue.pending')
}

function getBlocks(list: any) {
  return Promise.all(list.map(getBlock)).then(getBlocksData)
}

function getBlock(item: any) {
  const blockId = item.blockHash

  return blockId ? jibrelContractsApi.eth.getBlock({ ...rpcProps, blockId }) : {}
}

function getBlocksData(blocksData: any = []) {
  return blocksData.map((blockData = {}) => {
    // web3 returns timestamp in unix format, so for new Date it should be converted (mul by 1000)
    return { timestamp: (blockData.timestamp || 0) * 1000 }
  })
}

function getTransactions(list: any, isContract: boolean) {
  return Promise.all(list.map(getTransaction)).then(data => getTransactionsData(data, isContract))
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
  return Promise.all(list.map(getTransactionReceipt)).then(getTransactionReceiptsData)
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

function parseTransactions(list: any, decimals: number) {
  return list.map(item => parseTransaction(item, decimals))
}

function parseTransaction(item: any, decimals: number) {
  const { timestamp, address, from, to, value, gas, gasPrice, isRejected, removed } = item

  // case-insensitive comparison
  const isSender = (address.toLowerCase() === from.toLowerCase())

  return {
    ...item,
    contractAddress: '',
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
  return sortBy(list, ['timestamp']).reverse()
}

function handleTransactionsError(err: any) {
  console.error(err)

  return []
}

function getContractTransactions(contractAddress: Address, owner: Address, decimals: number) {
  if (!(owner && owner.length)) {
    return []
  }

  const transferTransactions = getERC20Transactions(contractAddress, owner, decimals)

  if (!isJNTContract(contractAddress)) {
    return transferTransactions
  }

  const mintableTransactions = getJNTTransactions(contractAddress, owner, decimals)

  return Promise
    .all([transferTransactions, mintableTransactions])
    .then(([transfer, mintable]) => transfer.concat(mintable))
    .then(sortTransactions)
}

function getJNTTransactions(contractAddress: Address, owner: Address, decimals: number) {
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
    .catch(handleTransactionsError)
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
    .catch(handleTransactionsError)
}

function filterJNTEvents(events: any, owner: Address) {
  return events
    // case-insensitive comparison
    .filter(event => (event.owner.toLowerCase() === owner.toLowerCase()))
    .map(event => ({
      ...event,
      from: isMintEvent(event) ? '' : owner,
      to: isMintEvent(event) ? owner : '',
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
  setRpcProps,
  getRpcProps,
  getETHBalance,
  getTokenBalance,
  getETHTransactions,
  getContractTransactions,
  sendETHTransaction,
  sendContractTransaction,
}
