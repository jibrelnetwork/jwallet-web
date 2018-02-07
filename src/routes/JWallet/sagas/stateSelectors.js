import find from 'lodash/find'

import isMnemonicType from 'utils/isMnemonicType'

export function selectDigitalAssets({ currencies }) {
  return currencies
}

export function selectCurrentDigitalAsset({ currencies }) {
  return find(currencies.items, { address: currencies.currentAddress })
}

export function selectSendFundsModal({ sendFundsModal }) {
  const {
    onClose,
    currentAccount,
    password,
    address,
    amount,
    symbol,
    gas,
    gasPrice,
  } = sendFundsModal

  const accountId = currentAccount.id

  return { onClose, password, address, accountId, amount, symbol, gas, gasPrice }
}

export function selectCurrentKeystoreAddress({ keystore }) {
  const { currentAccount, addressesFromMnemonic } = keystore
  const { type, address, addressIndex } = currentAccount

  return isMnemonicType(type) ? addressesFromMnemonic.items[addressIndex] : address
}

export function selectNetworks({ networks }) {
  return networks
}

export function selectCurrentNetwork({ networks }) {
  return `${networks.items[networks.currentNetworkIndex]}`
}

export function selectCurrentNetworkId({ networks }) {
  return `${networks.items[networks.currentNetworkIndex].id}`
}

export function selectKeystoreData({ keystore }) {
  return keystore
}

export function selectCurrentAccountId({ keystore }) {
  return keystore.currentAccount.id
}

export function selectTransactions({ transactions }) {
  return transactions
}

export function selectClearKeystoreData({ clearKeystoreModal }) {
  return clearKeystoreModal
}

export function selectImportAccountModalData({ importKeystoreAccountModal }) {
  return importKeystoreAccountModal
}

export function selectNewAccountModalData({ newKeystoreAccountModal }) {
  return newKeystoreAccountModal
}

export function selectNewDerivationPathModalData({ newDerivationPathModal }) {
  return newDerivationPathModal
}

export function selectAlphaWarningModalData({ alphaWarningModal }) {
  return alphaWarningModal
}

export function selectBackupKeystoreModalData({ backupKeystoreModal }) {
  return backupKeystoreModal
}
