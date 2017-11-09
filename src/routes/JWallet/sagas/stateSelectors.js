import isMnemonicType from 'utils/isMnemonicType'

export function selectCurrencies(state) {
  return state.currencies
}

export function selectCurrentCurrency(state) {
  const { items, currentActiveIndex } = state.currencies

  return items[currentActiveIndex]
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

export function selectKeystore(state) {
  return state.keystore
}

export function selectCurrentAccountId(state) {
  return state.keystore.currentAccount.id
}

export function selectTransactions(state) {
  return state.transactions
}
