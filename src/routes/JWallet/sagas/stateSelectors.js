import find from 'lodash/find'

import isMnemonicType from 'utils/isMnemonicType'

export function selectDigitalAssets(state: { currencies: any }) {
  return state.currencies
}

export function selectCurrentDigitalAsset(state: { currencies: any }) {
  return find(state.currencies.items, { address: state.currencies.currentAddress })
}

export function selectSendFundsModal(state: { sendFundsModal: any }) {
  return state.sendFundsModal
}

export function selectCurrentKeystoreAddress(state: { keystore: any }) {
  const { currentAccount, addressesFromMnemonic } = state.keystore
  const { type, address, addressIndex } = currentAccount

  return isMnemonicType(type) ? addressesFromMnemonic.items[addressIndex] : address
}

export function selectNetworks(state: { networks: any }) {
  return state.networks
}

export function selectCurrentNetwork(state: { networks: any }) {
  return state.networks.items[state.networks.currentNetworkIndex]
}

export function selectCurrentNetworkId(state: { networks: any }) {
  return `${state.networks.items[state.networks.currentNetworkIndex].id}`
}

export function selectKeystoreData(state: { keystore: any }) {
  return state.keystore
}

export function selectCurrentAccount(state: { keystore: any }) {
  return state.keystore.currentAccount
}

export function selectCurrentAccountId(state: { keystore: any }) {
  return state.keystore.currentAccount.id
}

export function selectTransactions(state: { transactions: any }) {
  return state.transactions
}

export function selectClearKeystoreData(state: { clearKeystoreModal: any }) {
  return state.clearKeystoreModal
}

export function selectImportAccountModalData(state: { importKeystoreAccountModal: any }) {
  return state.importKeystoreAccountModal
}

export function selectNewAccountModalData(state: { newKeystoreAccountModal: any }) {
  return state.newKeystoreAccountModal
}

export function selectNewDerivationPathModalData(state: { newDerivationPathModal: any }) {
  return state.newDerivationPathModal
}

export function selectAlphaWarningModalData(state: { alphaWarningModal: any }) {
  return state.alphaWarningModal
}

export function selectBackupKeystoreModalData(state: { backupKeystoreModal: any }) {
  return state.backupKeystoreModal
}
