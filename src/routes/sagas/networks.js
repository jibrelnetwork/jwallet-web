// @flow

import { propEq } from 'ramda'
import { put, select, takeEvery } from 'redux-saga/effects'

import networks from 'data/networks'
import { etherscan, validate, web3 } from 'services'
import { selectNetworks, selectNetworksItems, selectDigitalAssets } from 'store/stateSelectors'
import { init as initDigitalAssets } from 'routes/DigitalAssets/modules/digitalAssets'

import {
  SET_NETWORKS,
  SET_CURRENT,
  SAVE_CUSTOM_NETWORK,
  REMOVE_CUSTOM_NETWORK,
  setNetworksSuccess,
  setNetworksError,
  setCurrentNetworkSuccess,
  setCurrentNetworkError,
  saveCustomNetworkSuccess,
  saveCustomNetworkError,
} from '../modules/networks'

function* setNetworks(action: { payload: { items: Networks } }): Saga<void> {
  try {
    const mergedItems: Networks = mergeNetworks(action.payload.items)
    yield put(setNetworksSuccess(mergedItems))
  } catch (err) {
    yield put(setNetworksError(err))
  }
}

function* setCurrent(action: { payload: { currentNetwork: ?NetworkId } }): Saga<void> {
  try {
    const items: Networks = yield select(selectNetworksItems)
    const { currentNetwork }: { currentNetwork: ?NetworkId } = action.payload
    const foundNetwork: Network = items.find(propEq('id', currentNetwork)) || networks[0]

    yield put(setCurrentNetworkSuccess(foundNetwork.id))
    setNetworkRpcProps(foundNetwork)

    // need to update digital assets if current network changed
    const { isInitialised }: DigitalAssetsData = yield select(selectDigitalAssets)

    if (isInitialised) {
      yield put(initDigitalAssets())
    }
  } catch (err) {
    yield put(setCurrentNetworkError(err))
  }
}

function* saveCustomNetwork(): Saga<void> {
  try {
    const { items, customNetworkRPC } = yield select(selectNetworks)
    validate.customNetworkRPC(customNetworkRPC, items)

    const id = `private/${items.length}`
    const newCustomNetwork: Network = parseCustomNetworkRPC(customNetworkRPC, id)
    const newNetworks = items.concat(newCustomNetwork)

    yield put(saveCustomNetworkSuccess(newNetworks))
  } catch (err) {
    yield put(saveCustomNetworkError(err))
  }
}

function* removeCustomNetwork(action: { payload: { networkId: NetworkId } }): Saga<void> {
  const { items, currentNetwork } = yield select(selectNetworks)
  const { networkId }: { networkId: NetworkId } = action.payload
  const newNetworks = items.filter(!propEq('id', networkId))
  const currentNetworkIndex = items.findIndex(propEq('id', currentNetwork))

  if (networkId === currentNetwork) {
    yield put(setCurrentNetworkSuccess(networks[0].id))
  } else if (currentNetwork > networkId) {
    yield put(setCurrentNetworkSuccess(networks[currentNetworkIndex - 1].id))
  }

  yield put(setNetworksSuccess(newNetworks))
}

function mergeNetworks(customNetworksFromStorage: Networks): Networks {
  if (!(customNetworksFromStorage && customNetworksFromStorage.length)) {
    return networks
  }

  customNetworksFromStorage.forEach((networkFromStorage: Network): void => {
    validate.customNetworkRPC(networkFromStorage.title, networks)
  })

  return networks.concat(customNetworksFromStorage)
}

function setNetworkRpcProps({ id, rpcaddr, rpcport, ssl }: Network) {
  web3.setRpcProps({ rpcaddr, rpcport, ssl })
  etherscan.setEndpoint(id)
}

function parseCustomNetworkRPC(customNetworkRPC: string, id: NetworkId): Network {
  const ssl: boolean = /^https:\/\//i.test(customNetworkRPC)
  const withoutProtocol: string = customNetworkRPC.replace(/^http(s?):\/\//i, '')
  const [rpcaddr, rpcport = ssl ? '443' : '80'] = withoutProtocol.split(':')

  return {
    id,
    ssl,
    rpcaddr,
    rpcport,
    title: customNetworkRPC,
    isCustom: true,
  }
}

export function* watchNetworksSetNetworks(): Saga<void> {
  yield takeEvery(SET_NETWORKS, setNetworks)
}

export function* watchNetworksSetCurrent(): Saga<void> {
  yield takeEvery(SET_CURRENT, setCurrent)
}

export function* watchNetworksSaveCustomNetwork(): Saga<void> {
  yield takeEvery(SAVE_CUSTOM_NETWORK, saveCustomNetwork)
}

export function* watchNetworksRemoveCustomNetwork(): Saga<void> {
  yield takeEvery(REMOVE_CUSTOM_NETWORK, removeCustomNetwork)
}
