import isEmpty from 'lodash/isEmpty'
import jibrelContractsApi from 'jibrel-contracts-jsapi'

import config from 'config'
import getFormattedDateString from 'utils/getFormattedDateString'

const { defaultDecimals } = config

let rpcProps = {
  rpcaddr: '127.0.0.1',
  rpcprops: '8545',
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
    .then(getBlocks)
    .then(getTransactions)
    .then(getTransactionReceipts)
    .then(parseTransactions)
    .catch((err) => {
      console.error(err.message)

      return 0
  })
}

function getLast20(list = []) {
  return list.slice(-20)
}

function getBlocks(list) {
  return Promise
    .all(list.map(getBlock))
    .then(blocksData => list.map((item, index) => addBlockData(item, blocksData[index])))
}

function getBlock(item) {
  return jibrelContractsApi.eth.getBlock({ ...rpcProps, blockId: item.blockHash })
}

function addBlockData(item, blockData = {}) {
  // web3 returns timestamp in unix format, so for new Date it should be converted (mul by 1000)
  return { ...item, timestamp: blockData.timestamp * 1000 }
}

function getTransactions(list) {
  return Promise
    .all(list.map(getTransaction))
    .then(txsData => list.map((item, index) => addTransactionData(item, txsData[index])))
}

function getTransaction(item) {
  return jibrelContractsApi.eth
    .getTransaction({ ...rpcProps, transactionHash: item.transactionHash })
}

function addTransactionData(item, txData = {}) {
  const { from, to, value, gasPrice } = txData

  return { ...item, from, to, value: value.toNumber(), gasPrice: gasPrice.toNumber() }
}

function getTransactionReceipts(list) {
  return Promise
    .all(list.map(getTransactionReceipt))
    .then(receipts => list.map((item, index) => addTransactionReceipt(item, receipts[index])))
}

function getTransactionReceipt(item) {
  return jibrelContractsApi.eth
    .getTransactionReceipt({ ...rpcProps, transactionHash: item.transactionHash })
}

function addTransactionReceipt(item, receipt = {}) {
  return { ...item, fee: (receipt.cumulativeGasUsed * item.gasPrice) }
}

function parseTransactions(list) {
  return list.map(parseTransaction)
}

function parseTransaction(item) {
  const { timestamp, address, from } = item

  return {
    ...item,
    status: 'Accepted',
    type: (address === from) ? 'send' : 'receive',
    date: getFormattedDateString(new Date(timestamp), 'hh:mm MM/DD/YYYY'),
  }
}

function getContractTransactions(contractAddress, owner, decimals) {
  const fromProps = getEventsProps(contractAddress, { from: owner })
  const toProps = getEventsProps(contractAddress, { to: owner })

  const getEvents = jibrelContractsApi.contracts.erc20.getPastEvents

  return Promise.all([getEvents(fromProps), getEvents(toProps)]).then(([from, to]) => {
    return [...parseEvents(from, decimals, true), ...parseEvents(to, decimals)]
  })
}

function getEventsProps(contractAddress, filter = null) {
  return {
    ...rpcProps,
    contractAddress,
    event: 'Transfer',
    options: { filter, fromBlock: 0, toBlock: 'latest' },
  }
}

function parseEvents(events = [], decimals = defaultDecimals, from = false) {
  return events.map(event => parseEvent(event, decimals, from))
}

function parseEvent(event, decimals, from) {
  if (isEmpty(event) || isEmpty(event.args)) {
    return {}
  }

  const { args, blockNumber, removed, transactionHash } = event
  const amount = (args.value.toNumber() / (10 ** decimals))
  const timestamp = Date.now()

  return {
    amount,
    timestamp,
    to: args.to,
    from: args.from,
    symbol: 'JNT',
    status: 'Accepted',
    txHash: transactionHash,
    fee: '0.0005 ETH 1.5 JNT',
    address: from ? args.to : args.from,
    amountFixed: amount.toFixed(3),
    type: from ? 'send' : 'receive',
    date: getFormattedDateString(new Date(timestamp), 'hh:mm MM/DD/YYYY'),
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
