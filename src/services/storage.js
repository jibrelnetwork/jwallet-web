import storage from 'jwallet-web-storage'

const storageKeys = {
  digitalAssets: 'JWALLET-DIGITAL-ASSETS',
  digitalAssetsBalances: 'JWALLET-DIGITAL-ASSETS-BALANCES',
  digitalAssetsCurrent: 'JWALLET-DIGITAL-ASSETS-CURRENT',
  keystore: 'JWALLET-KEYSTORE',
  keystoreCurrentAccount: 'JWALLET-KEYSTORE-CURRENT-ACCOUNT',
  keystoreAddressesFromMnemonic: 'JWALLET-KEYSTORE-ADDRESSES-FROM-MNEMONIC',
  networks: 'JWALLET-NETWORKS',
  networksCurrent: 'JWALLET-NETWORKS-CURRENT',
  notificationSaleClosed: 'JWALLET-NOTIFICATION-SALE-CLOSED',
}

const storageMethods = {}
let isStorageInited = false

function getStorage() {
  if (isStorageInited) {
    return storageMethods
  }

  isStorageInited = true

  Object.keys(storageKeys).forEach((key) => {
    const keyCapitalized = `${key.charAt(0).toUpperCase()}${key.slice(1)}`

    addStorageMethods(keyCapitalized, storageKeys[key])
  })

  return storageMethods
}

function addStorageMethods(key, value) {
  storageMethods[`get${key}`] = function getItem(suffix = '') {
    return storage.getItem(getStorageKey(value, suffix))
  }

  storageMethods[`set${key}`] = function setItem(data = '', suffix = '') {
    storage.setItem(getStorageKey(value, suffix), data)
  }

  storageMethods[`remove${key}`] = function removeItem(suffix = '') {
    storage.removeItem(getStorageKey(value, suffix))
  }
}

function getStorageKey(key, suffix) {
  const additional = (suffix && suffix.length) ? `-${suffix.replace(/ /g, '-').toUpperCase()}` : ''

  return `${key}${additional}`
}

export function isMemoryStorage() {
  return storage.isMemory || false
}

export default getStorage()
