import { put, select, takeEvery } from 'redux-saga/effects'
import findIndex from 'lodash/findIndex'

import config from 'config'
import { gtm, etherscan, storage, web3 } from 'services'
import getDefaultNetworks from 'utils/getDefaultNetworks'

import {
  NETWORKS_GET,
  NETWORKS_SET,
  NETWORKS_SET_CURRENT,
  NETWORKS_SAVE_CUSTOM_NETWORK,
  NETWORKS_REMOVE_CUSTOM_NETWORK,
} from '../modules/networks'

import { CURRENCIES_GET } from '../modules/currencies'

import { selectNetworks } from './stateSelectors'

const ETHEREUM_MAINNET_CHAIN_ID = 1

function* onGetNetworks() {
  const defaultNetworks = getDefaultNetworks()

  let customNetworks = []
  let currentNetworkIndex = 0

  try {
    const networksFromStorage = storage.getNetworks()
    const networkIdFromStorage = storage.getNetworksCurrent()

    customNetworks = networksFromStorage ? JSON.parse(networksFromStorage) : []
    const currentNetworkId = parseInt(networkIdFromStorage, 10) || ETHEREUM_MAINNET_CHAIN_ID
    currentNetworkIndex = findIndex(defaultNetworks, { id: currentNetworkId })
  } catch (err) {
    console.error(err)
  }

  const mergedNetworks = [...defaultNetworks, ...customNetworks]

  yield setNetworks(mergedNetworks, currentNetworkIndex)
}

function onSetNetworks({ items }) {
  const customNetworks = items.filter(({ isCustom }) => isCustom)

  storage.setNetworks(JSON.stringify(customNetworks))
}

function* getCurrencies() {
  yield put({ type: CURRENCIES_GET })
}

function* onSetCurrentNetwork({ currentNetworkIndex }) {
  const { items } = yield select(selectNetworks)

  storage.setNetworksCurrent(items[currentNetworkIndex].id || ETHEREUM_MAINNET_CHAIN_ID)

  yield setNetworkRpcProps(currentNetworkIndex)

  // need to change currencies if current network changed
  yield getCurrencies()
}

function* onSaveCustomNetwork({ customNetworkRpc, onSuccess, onError }) {
  const { items } = yield select(selectNetworks)

  try {
    checkCustomNetworkRpc(items, customNetworkRpc)

    const newCustomNetwork = parseCustomNetworkRpc(customNetworkRpc)
    const newItems = [...items, newCustomNetwork]
    const newCurrentNetworkIndex = newItems.length - 1

    yield setNetworks(newItems, newCurrentNetworkIndex)

    gtm.pushAddCustomNetwork()

    return onSuccess ? onSuccess() : null
  } catch (err) {
    return onError ? onError(err) : null
  }
}

function* onRemoveCustomNetwork({ networkIndex }) {
  const { items, currentNetworkIndex } = yield select(selectNetworks)

  const newItems = [...items]
  newItems.splice(networkIndex, 1)

  let newCurrentNetworkIndex = currentNetworkIndex

  if (currentNetworkIndex === networkIndex) {
    newCurrentNetworkIndex = 0
  } else if (currentNetworkIndex > networkIndex) {
    newCurrentNetworkIndex = currentNetworkIndex - 1
  }

  yield setNetworks(newItems, newCurrentNetworkIndex)
}

function* setNetworkRpcProps(currentNetworkIndex) {
  const { items } = yield select(selectNetworks)
  const { id, rpcaddr, rpcport, ssl } = items[currentNetworkIndex]

  web3.setRpcProps({ rpcaddr, rpcport, ssl })
  etherscan.setEndpoint(id)
}

function* setNetworks(items, currentNetworkIndex) {
  yield put({ type: NETWORKS_SET, items, currentNetworkIndex })
  yield onSetCurrentNetwork({ currentNetworkIndex })
}

function checkCustomNetworkRpc(items, customNetworkRpc) {
  // check validity
  if (!config.urlRe.test(customNetworkRpc)) {
    throw (new Error('Invalid RPC address'))
  }

  // check uniqueness
  items.forEach(({ title }) => {
    if (title.toLowerCase() === customNetworkRpc.toLowerCase()) {
      throw (new Error('This RPC address already exists'))
    }
  })
}

function parseCustomNetworkRpc(customNetworkRpc) {
  const ssl = /^https:\/\//i.test(customNetworkRpc)
  const withoutProtocol = customNetworkRpc.replace(/^http(s?):\/\//i, '')
  const [rpcaddr, rpcport = ssl ? '443' : '80'] = withoutProtocol.split(':')

  return { title: customNetworkRpc, rpcaddr, rpcport, ssl, isCustom: true, id: 0 }
}

export function* watchGetNetworks() {
  yield takeEvery(NETWORKS_GET, onGetNetworks)
}

export function* watchSetNetworks() {
  yield takeEvery(NETWORKS_SET, onSetNetworks)
}

export function* watchSetCurrentNetwork() {
  yield takeEvery(NETWORKS_SET_CURRENT, onSetCurrentNetwork)
}

export function* watchSaveCustomNetwork() {
  yield takeEvery(NETWORKS_SAVE_CUSTOM_NETWORK, onSaveCustomNetwork)
}

export function* watchRemoveCustomNetwork() {
  yield takeEvery(NETWORKS_REMOVE_CUSTOM_NETWORK, onRemoveCustomNetwork)
}
