import jibrelContractsApi from 'jibrel-contracts-jsapi'

import config from 'config'
import getFormattedDateString from 'utils/getFormattedDateString'

const { defaultDecimals } = config

let rpcProps = {
  rpcaddr: '127.0.0.1',
  rpcport: 8545,
  ssl: false,
}

function setRpcProps(props) {
  rpcProps = props
}

function getRpcProps() {
  return rpcProps
}

function getETHBalance(address) {
  return jibrelContractsApi.eth
    .getBalance({ ...rpcProps, address })
    .then(balance => (balance.toNumber() / (10 ** defaultDecimals)))
    .catch((err) => {
      console.error(err.message)

      return 0
    })
}

function getTokenBalance(contractAddress, owner, decimals = defaultDecimals) {
  return jibrelContractsApi.contracts.erc20
    .balanceOf({ ...rpcProps, contractAddress, owner })
    .then(balance => (balance.toNumber() / (10 ** decimals)))
    .catch((err) => {
      console.error(err.message)

      return 0
    })
}

function getETHTransactions(address) {
  return jibrelContractsApi.eth
    .getPastLogs({
      ...rpcProps,
      options: {
        address,
        fromBlock: 0,
        toBlock: 'latest',
      },
    })
    .then(getLast20)
    .then(list => getTransactionsInfo(list))
    .then(list => parseTransactions(list, defaultDecimals))
    .catch(handleTransactionsError)
}

function getTransactionsInfo(list, isContract) {
  return Promise.all([
    getBlocks(list),
    getTransactions(list, isContract),
    getTransactionReceipts(list),
  ]).then(([blocksData, transactionsData, transactionReceiptsData]) => {
    return list.map((item, index) => {
      return {
        ...item,
        ...blocksData[index],
        ...transactionsData[index],
        ...transactionReceiptsData[index],
      }
    })
  })
}

function getLast20(list = []) {
  return list.slice(-20).map((item) => {
    const { transactionHash, blockHash, address } = item
    const status = getTransactionStatus(blockHash)
    const to = item.to || 'n/a'

    return { transactionHash, blockHash, address, status, to }
  })
}

function getTransactionStatus(blockHash) {
  return blockHash ? 'Accepted' : 'Pending'
}

function getBlocks(list) {
  return Promise.all(list.map(getBlock)).then(getBlocksData)
}

function getBlock(item) {
  const blockId = item.blockHash

  return blockId ? jibrelContractsApi.eth.getBlock({ ...rpcProps, blockId }) : {}
}

function getBlocksData(blocksData = []) {
  return blocksData.map((blockData = {}) => {
    // web3 returns timestamp in unix format, so for new Date it should be converted (mul by 1000)
    return { timestamp: (blockData.timestamp || 0) * 1000 }
  })
}

function getTransactions(list, isContract) {
  return Promise.all(list.map(getTransaction)).then(data => getTransactionsData(data, isContract))
}

function getTransaction(item) {
  return jibrelContractsApi.eth
    .getTransaction({ ...rpcProps, transactionHash: item.transactionHash })
}

function getTransactionsData(transactionsData = [], isContract = false) {
  return transactionsData.map((transactionData = {}) => {
    const { from, to, value, gasPrice } = transactionData
    const _gasPrice = gasPrice ? (gasPrice.toNumber() / (10 ** defaultDecimals)) : 0
    const _value = value ? value.toNumber() : 0

    return isContract ? { gasPrice: _gasPrice } : { from, to, value: _value, gasPrice: _gasPrice }
  })
}

function getTransactionReceipts(list) {
  return Promise.all(list.map(getTransactionReceipt)).then(getTransactionReceiptsData)
}

function getTransactionReceipt(item) {
  return jibrelContractsApi.eth
    .getTransactionReceipt({ ...rpcProps, transactionHash: item.transactionHash })
}

function getTransactionReceiptsData(transactionReceiptsData = []) {
  return transactionReceiptsData.map((transactionReceiptData) => {
    const { cumulativeGasUsed, status } = transactionReceiptData

    return {
      gas: (cumulativeGasUsed || 0),
      /**
       * status flag contains 0 if tx was rejected and 1 otherwise
       * (see Byzantium changes)
       */
      isRejected: (status === 0),
    }
  })
}

function parseTransactions(list, decimals) {
  return list.map(item => parseTransaction(item, decimals))
}

function parseTransaction(item, decimals) {
  const { timestamp, address, from, value, gas, gasPrice, isRejected, removed } = item

  return {
    ...item,
    fee: (gas * gasPrice),
    amount: (value / (10 ** decimals)),
    type: (address === from) ? 'send' : 'receive',
    /**
     * removed flag is present for contract events only
     * (see https://github.com/ethereum/wiki/wiki/JavaScript-API#contract-events)
     */
    status: (isRejected || removed) ? 'Rejected' : item.status,
    date: timestamp ? getFormattedDateString(new Date(timestamp), 'hh:mm MM/DD/YYYY') : 'n/a',
  }
}

function handleTransactionsError(err) {
  console.error(err.message)

  return []
}

function getContractTransactions(contractAddress, owner, decimals) {
  const fromProps = getEventsProps(contractAddress, { from: owner })
  const toProps = getEventsProps(contractAddress, { to: owner })
  const getEventsHandler = jibrelContractsApi.contracts.erc20.getPastEvents

  return Promise
    .all([getEventsHandler(fromProps), getEventsHandler(toProps)])
    .then(mergeEvents)
    .then(getLast20)
    .then(list => getTransactionsData(list, true))
    .then(list => parseTransactions(list, decimals))
    .catch(handleTransactionsError)
}

function mergeEvents(events) {
  const mergedEvents = []

  // events contains [from, to] list
  events.forEach(list => list.forEach((item) => {
    const { args, address, blockHash, removed, transactionHash } = item

    mergedEvents.push({ address, blockHash, transactionHash, removed, ...args })
  }))

  return mergedEvents
}

function getEventsProps(contractAddress, filter = null) {
  return {
    ...rpcProps,
    contractAddress,
    event: 'Transfer',
    options: { filter, fromBlock: 0, toBlock: 'latest' },
  }
}

export default {
  setRpcProps,
  getRpcProps,
  getETHBalance,
  getTokenBalance,
  getETHTransactions,
  getContractTransactions,
}
