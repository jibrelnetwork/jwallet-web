import lightwallet from 'eth-lightwallet'

import StorageWrapper from './storage'
import { uuidv4 } from './uuidv4'

class KeyManager {
  constructor(password) {
    this.Keystore = lightwallet.keyStore.createVault({ password })
    this.store = new StorageWrapper()
    this.key = uuidv4()
    this.hasSeed = false
  }

  createFromPass() {
    this.store.save(this.key, this.Keystore.serialize())
  }
  createFromSeedPhrase(seedPhrase) {
    if (seedPhrase) {
      this.hasSeed = true
    } else {
      // keystore.generateRandomSeed
    }
  }

  // public API

  showSeed() {
    return this.hasSeed ? this.Keystore.getSeed() : null
  }
  signTransaction(passwd, rawTx, signingAddress) {
    this.Keystore.keyFromPassword(passwd, function (err, pwDerivedKey) {
      lightwallet.signing.signTx(this.Keystore, pwDerivedKey, rawTx, signingAddress)
    })
  }
}

export default KeyManager
