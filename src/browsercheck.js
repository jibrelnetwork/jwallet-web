// @flow

// Checking necessary compatibility browser features

declare var Modernizr: any

function checkBasicFeatures() {
  if (
    !Modernizr.cookies ||
    !Modernizr.getrandomvalues ||
    !Modernizr.filereader ||
    !Modernizr.localstorage ||
    !Modernizr.webworkers ||
    !Modernizr.crosstabstoreevents
  ) {
    throw new Error('Basic required browser APIs are not available')
  }
}

const checkIndexedDB = () => new Promise((resolve, reject) => {
  Modernizr.on('indexeddb', (indexedDBAvailable) => {
    if (!indexedDBAvailable) {
      return reject(new Error('IndexedDB API is not available'))
    }

    return resolve()
  })
})

const checkWorkerRNG = () => new Promise((resolve, reject) => {
  Modernizr.on('workerscrypto', (workerRNGAvailable) => {
    if (!workerRNGAvailable) {
      return reject(new Error('Crypto RNG API inside WEB Workers is not available'))
    }

    return resolve()
  })
})

function checkIOS() {
  return new Promise((resolve, reject) => {
    if (Modernizr.ios) {
      return reject(new Error('iOS devices are not available'))
    }

    return resolve()
  })
}

const browsercheck: () => Promise<void> = () => {
  if (!Modernizr) {
    // modernizr turned off? you are on your own now
    return Promise.resolve()
  }

  return Promise
    .resolve()
    .then(checkBasicFeatures)
    .then(checkIndexedDB)
    .then(checkWorkerRNG)
    .then(checkIOS)
}

export default browsercheck
