import { put, select, takeEvery } from 'redux-saga/effects'
import { delay } from 'redux-saga'

import {
  NETWORKS_GET_FROM_STORAGE,
  NETWORKS_SET,
  NETWORKS_SET_ACTIVE,
  NETWORKS_SAVE_CUSTOM_NETWORK,
  NETWORKS_REMOVE_CUSTOM_NETWORK,
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

  yield put({ type: NETWORKS_SET_ACTIVE, currentActiveIndex })
  yield put({ type: NETWORKS_SET, items })
}

function* saveCustomNetwork(action) {
  const { customNetworkRpc } = action
  const { items } = yield select(getStateNetworks)

  const newItems = [...items]
  newItems.push({ title: customNetworkRpc, rpcAddr: customNetworkRpc, isCustom: true })
  const currentActiveIndex = newItems.length - 1

  yield put({ type: NETWORKS_SET_ACTIVE, currentActiveIndex })
  yield put({ type: NETWORKS_SET, items: newItems })
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

  yield put({ type: NETWORKS_SET_ACTIVE, currentActiveIndex: newCurrentActiveIndex })
  yield put({ type: NETWORKS_SET, items: newItems })
}

export function* watchGetActiveNetwork() {
  yield takeEvery(NETWORKS_GET_FROM_STORAGE, getNetworksFromCache)
}

export function* watchSaveCustomNetwork() {
  yield takeEvery(NETWORKS_SAVE_CUSTOM_NETWORK, saveCustomNetwork)
}

export function* watchRemoveCustomNetwork() {
  yield takeEvery(NETWORKS_REMOVE_CUSTOM_NETWORK, removeCustomNetwork)
}
