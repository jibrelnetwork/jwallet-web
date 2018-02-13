import isMnemonicType from './isMnemonicType'

const getCurrentAddress = (keystore) => {
  const { currentAccount, addressesFromMnemonic } = keystore
  const { type, address, addressIndex } = currentAccount

  return isMnemonicType(type) ? addressesFromMnemonic.items[addressIndex] : address
}

export default getCurrentAddress
