import { put, select, takeEvery } from 'redux-saga/effects'
import { delay } from 'redux-saga'

import {
  GET_NETWORKS_FROM_CACHE,
  SET_NETWORKS,
  SET_ACTIVE_NETWORK,
  SAVE_CUSTOM_NETWORK,
  REMOVE_CUSTOM_NETWORK,
} from '../modules/networks'

const networksStub = [
  { title: 'Main Ethereum Network', rpcAddr: '', isCustom: false },
  { title: 'Ropsten Test Network', rpcAddr: '', isCustom: false },
  { title: 'Kovan Test Network', rpcAddr: '', isCustom: false },
  { title: 'Rinkeby Test Network', rpcAddr: '', isCustom: false },
  { title: 'Localhost 8545', rpcAddr: 'http://localhost:8545', isCustom: false },
]

function getStateNetworks(state) {
  return state.networks
}

function* getNetworksFromCache() {
  yield delay(1000)

  const items = networksStub
  const currentActiveIndex = 0

  yield put({ type: SET_ACTIVE_NETWORK, currentActiveIndex })
  yield put({ type: SET_NETWORKS, items })
}

function* saveCustomNetwork(action) {
  const { customNetworkRpc } = action
  const { items } = yield select(getStateNetworks)

  const newItems = [...items]
  newItems.push({ title: customNetworkRpc, rpcAddr: customNetworkRpc, isCustom: true })
  const currentActiveIndex = newItems.length - 1

  yield put({ type: SET_ACTIVE_NETWORK, currentActiveIndex })
  yield put({ type: SET_NETWORKS, items: newItems })
}

function* removeCustomNetwork(action) {
  const { networkIndex } = action
  const { items, currentActiveIndex } = yield select(getStateNetworks)

  const newItems = [...items]

  let newCurrentActiveIndex = currentActiveIndex

  if (currentActiveIndex === networkIndex) {
    newCurrentActiveIndex = 0
  } else if (currentActiveIndex > networkIndex) {
    newCurrentActiveIndex = currentActiveIndex - 1
  }

  newItems.splice(networkIndex, 1)

  yield put({ type: SET_ACTIVE_NETWORK, currentActiveIndex: newCurrentActiveIndex })
  yield put({ type: SET_NETWORKS, items: newItems })
}

export function* watchGetActiveNetwork() {
  yield takeEvery(GET_NETWORKS_FROM_CACHE, getNetworksFromCache)
}

export function* watchSaveCustomNetwork() {
  yield takeEvery(SAVE_CUSTOM_NETWORK, saveCustomNetwork)
}

export function* watchRemoveCustomNetwork() {
  yield takeEvery(REMOVE_CUSTOM_NETWORK, removeCustomNetwork)
}
