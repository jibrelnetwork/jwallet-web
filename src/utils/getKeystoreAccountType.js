export default function getKeystoreAccountType({ type, isReadOnly }) {
  if (type === 'mnemonic') {
    if (isReadOnly) {
      return 'bip32Xpub'
    }

    return 'mnemonic'
  } else if (type === 'address') {
    if (isReadOnly) {
      return 'address'
    }

    return 'privateKey'
  }

  return null
}
