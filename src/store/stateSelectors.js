// @flow

import { find, propEq } from 'ramda'

import { ethereum } from 'utils/getDefaultDigitalAssets'

export function selectDigitalAssets(state: State): DigitalAssetsData {
  return state.currencies
}

export function selectDigitalAssetsItems(state: State): DigitalAssets {
  return state.currencies.items
}

export function selectDigitalAssetItem(state: State, symbol: string): DigitalAsset {
  return find(propEq('symbol', symbol))(state.currencies.items) || ethereum
}

export function selectKeystore(state: State): KeystoreData {
  return state.keystore
}

export function selectKeystoreKeys(state: State): Accounts {
  return state.keystore.accounts
}

export function selectReceiveFunds(state: State): ReceiveFundsData {
  return state.receiveFunds
}

export function selectSendFunds(state: State): SendFundsData {
  return state.sendFunds
}

export function selectCurrentKeyId(state: State): AccountId {
  return state.keystore.currentAccount.id
}

export function selectCreateKey(state: State): CreateKeyData {
  return state.createKey
}

export function selectImportKey(state: State): ImportKeyData {
  return state.importKey
}
