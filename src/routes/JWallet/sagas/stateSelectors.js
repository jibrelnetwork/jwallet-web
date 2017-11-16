import find from 'lodash/find'

import isMnemonicType from 'utils/isMnemonicType'

export function selectDigitalAssets(state) {
  return state.currencies
}

export function selectCurrentDigitalAsset(state) {
  const { items, currentAddress } = state.currencies

  return find(items, { address: currentAddress })
}

export function selectSendFundsModal(state) {
  const {
    onClose,
    currentAccount,
    password,
    address,
    amount,
    symbol,
    gas,
    gasPrice,
  } = state.sendFundsModal

  const accountId = currentAccount.id

  return { onClose, password, address, accountId, amount, symbol, gas, gasPrice }
}

export function selectCurrentKeystoreAddress(state) {
  const { currentAccount, addressesFromMnemonic } = state.keystore
  const { type, address, addressIndex } = currentAccount

  return isMnemonicType(type) ? addressesFromMnemonic.items[addressIndex] : address
}

export function selectCurrentNetworkName(state) {
  const { items, currentActiveIndex } = state.networks

  return items[currentActiveIndex].title
}

export function selectKeystoreData(state) {
  return state.keystore
}

export function selectCurrentAccountId(state) {
  return state.keystore.currentAccount.id
}

export function selectTransactions(state) {
  return state.transactions
}

export function selectClearKeystoreData(state) {
  return state.clearKeystoreModal
}
