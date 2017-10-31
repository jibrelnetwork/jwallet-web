import { put, select, takeEvery } from 'redux-saga/effects'

import config from 'config'
import { storage, web3 } from 'services'
import defaultNetworks from 'utils/defaultNetworks'

import {
  NETWORKS_GET,
  NETWORKS_SET,
  NETWORKS_SET_CURRENT,
  NETWORKS_SAVE_CUSTOM_NETWORK,
  NETWORKS_REMOVE_CUSTOM_NETWORK,
} from '../modules/networks'

import { CURRENCIES_GET } from '../modules/currencies'

function getStateNetworks(state) {
  return state.networks
}

function* getCurrencies() {
  yield put({ type: CURRENCIES_GET })
}

function* getNetworksFromStorage() {
  let items = defaultNetworks
  let currentActiveIndex = 0

  try {
    const networksFromStorage = storage.getNetworks()
    const networkIndexFromStorage = storage.getNetworksCurrent()

    items = networksFromStorage ? JSON.parse(networksFromStorage) : defaultNetworks
    currentActiveIndex = parseInt(networkIndexFromStorage, 10) || 0
  } catch (e) {
    console.error(e)
  }

  yield setNetworks(items, currentActiveIndex)
}

function setNetworksToStorage(action) {
  const { items, currentActiveIndex } = action

  storage.setNetworks(JSON.stringify(items || defaultNetworks))
  storage.setNetworksCurrent(currentActiveIndex || 0)
}

function* setCurrentNetwork(action) {
  const { currentActiveIndex } = action
  storage.setNetworksCurrent(currentActiveIndex || 0)

  yield setNetworkRpcProps(currentActiveIndex)

  // need to change currencies if current network changed
  yield getCurrencies()
}

function* setNetworkRpcProps(currentActiveIndex) {
  const { items } = yield select(getStateNetworks)
  const { rpcaddr, rpcport, ssl } = items[currentActiveIndex]

  web3.setRpcProps({ rpcaddr, rpcport, ssl })
}

function* setNetworks(items, currentActiveIndex) {
  yield put({ type: NETWORKS_SET, items, currentActiveIndex })
  yield setCurrentNetwork({ currentActiveIndex })
}

function* saveCustomNetwork(action) {
  const { customNetworkRpc, onSuccess, onError } = action
  const { items } = yield select(getStateNetworks)

  try {
    checkCustomNetworkRpc(items, customNetworkRpc)

    const newCustomNetwork = parseCustomNetworkRpc(customNetworkRpc)
    const newItems = [...items, newCustomNetwork]
    const newCurrentActiveIndex = (newItems.length - 1)

    yield setNetworks(newItems, newCurrentActiveIndex)

    return onSuccess ? onSuccess() : null
  } catch (e) {
    return onError ? onError(e) : null
  }
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

  return { title: customNetworkRpc, rpcaddr, rpcport, ssl, isCustom: true }
}

function* removeCustomNetwork(action) {
  const { networkIndex } = action
  const { items, currentActiveIndex } = yield select(getStateNetworks)

  const newItems = [...items]
  newItems.splice(networkIndex, 1)

  let newCurrentActiveIndex = currentActiveIndex

  if (currentActiveIndex === networkIndex) {
    newCurrentActiveIndex = 0
  } else if (currentActiveIndex > networkIndex) {
    newCurrentActiveIndex = currentActiveIndex - 1
  }

  yield setNetworks(newItems, newCurrentActiveIndex)
}

export function* watchGetNetworksFromStorage() {
  yield takeEvery(NETWORKS_GET, getNetworksFromStorage)
}

export function* watchSetNetworks() {
  yield takeEvery(NETWORKS_SET, setNetworksToStorage)
}

export function* watchSetCurrentNetwork() {
  yield takeEvery(NETWORKS_SET_CURRENT, setCurrentNetwork)
}

export function* watchSaveCustomNetwork() {
  yield takeEvery(NETWORKS_SAVE_CUSTOM_NETWORK, saveCustomNetwork)
}

export function* watchRemoveCustomNetwork() {
  yield takeEvery(NETWORKS_REMOVE_CUSTOM_NETWORK, removeCustomNetwork)
}
