const isKeystoreInitialised = (keystore: KeystoreData): boolean => {
  return !!keystore.currentAccount.id
}

export default isKeystoreInitialised
