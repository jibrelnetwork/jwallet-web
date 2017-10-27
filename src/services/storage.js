import storage from 'jwallet-web-storage'

const storageKeys = {
  currencies: 'JWALLET-CURRENCIES',
  currenciesBalances: 'JWALLET-CURRENCIES-BALANCES',
  currenciesCurrent: 'JWALLET-CURRENCIES-CURRENT',
  keystore: 'JWALLET-KEYSTORE',
  keystoreCurrentAccount: 'JWALLET-KEYSTORE-CURRENT-ACCOUNT',
  keystoreAddressesFromMnemonic: 'JWALLET-KEYSTORE-ADDRESSES-FROM-MNEMONIC',
  networks: 'JWALLET-NETWORKS',
  networksCurrent: 'JWALLET-NETWORKS-CURRENT',
}

const storageMethods = {}
let isStorageInited = false

function getStorage() {
  if (isStorageInited) {
    return storageMethods
  }

  isStorageInited = true

  Object.keys(storageKeys).forEach((key) => {
    const keyUpperCase = `${key.charAt(0).toUpperCase()}${key.slice(1)}`

    addStorageMethods(keyUpperCase, storageKeys[key])
  })

  return storageMethods
}

function addStorageMethods(key, value) {
  storageMethods[`get${key}`] = function(suffix = '') {
    return storage.getItem(getStorageKey(value, suffix))
  }

  storageMethods[`set${key}`] = function(data = '', suffix = '') {
    storage.setItem(getStorageKey(value, suffix), data)
  }

  storageMethods[`remove${key}`] = function(suffix = '') {
    storage.removeItem(getStorageKey(value, suffix))
  }
}

function getStorageKey(key, suffix) {
  const additional = (suffix && suffix.length) ? `-${suffix.replace(' ', '-').toUpperCase()}` : ''

  return `${key}${additional}`
}

export default getStorage()
