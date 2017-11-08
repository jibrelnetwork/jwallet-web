export function selectCurrencies(state = {}) {
  return state.currencies || {}
}

export function selectSendFundsModal(state = {}) {
  const {
    onClose,
    currentAccount,
    password,
    address,
    amount,
    symbol,
    gas,
    gasPrice,
  } = state.sendFundsModal || {}

  const accountId = currentAccount.id || ''

  return { onClose, password, address, accountId, amount, symbol, gas, gasPrice }
}
