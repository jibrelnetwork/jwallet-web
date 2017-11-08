import config from 'config'

import getFormattedDateString from 'utils/getFormattedDateString'

const { etherscanApiOptions, defaultDecimals } = config
let endpoint = 'api'

const enpointNames = ['api', 'ropsten', 'kovan', 'rinkeby']

function setEndpoint(index = 0) {
  endpoint = enpointNames[index] || 'api'
}

function getEndpoint() {
  return endpoint
}

function getETHTransactions(address) {
  return getTransactions(address).then(filterETHTransactions)
}

function getTransactions(address) {
  return callApi({
    address,
    module: 'account',
    action: 'txlist',
    sort: 'desc',
    page: 1,
    offset: 50,
    // startblock: 0,
    // endblock: 99999999,
    // apikey: 'JibrelNetworkApiKeyToken',
  }).then((response) => {
    const { message, result } = response

    if (message !== 'OK') {
      throw (new Error('Can not get transactions'))
    }

    return parseTransactions(result, address)
  }).catch(() => [])
}

function parseTransactions(list, address, decimals = defaultDecimals) {
  return list.map((item) => {
    const {
      hash,
      blockNumber,
      to,
      from,
      value,
      timeStamp,
      gasPrice,
      cumulativeGasUsed,
      contractAddress,
      isError,
    } = item

    /**
     * etherscan returns unix timestamp in seconds
     * js Date requires ms
     */
    const timestamp = timeStamp * 1000
    const status = blockNumber ? 'Accepted' : 'Pending'
    const isRejected = (parseInt(isError, 10) === 1)

    return {
      to,
      from,
      address,
      timestamp,
      contractAddress,
      transactionHash: hash,
      status: isRejected ? 'Rejected' : status,
      amount: (value / (10 ** decimals)),
      type: (address === from) ? 'send' : 'receive',
      fee: ((cumulativeGasUsed * gasPrice) / (10 ** defaultDecimals)),
      date: getFormattedDateString(new Date(timestamp), 'hh:mm MM/DD/YYYY'),
    }
  })
}

function filterETHTransactions(list) {
  return list.filter((item) => {
    const { amount, contractAddress } = item
    const isEmptyAmount = (amount === 0)
    const isContractCreation = !!contractAddress.length

    return !(isEmptyAmount && !isContractCreation)
  })
}

function callApi(params) {
  const apiEnpoint = `https://${endpoint}.etherscan.io/api`

  return fetch(`${apiEnpoint}?${getQueryParams(params)}`, etherscanApiOptions).then(r => r.json())
}

function getQueryParams(params) {
  if (!params) {
    return ''
  }

  return Object.keys(params).map(key => `${key}=${params[key]}`).join('&').replace(/&$/, '')
}

export default { setEndpoint, getEndpoint, getETHTransactions }
