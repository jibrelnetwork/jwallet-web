// @flow
// Checking necessary compatibility browser features
declare var Modernizr: any

const checkIndexedDB = () => new Promise((resolve, reject) => {
  Modernizr.on('indexeddb', (indexedDBAvailable) => {
    if (
      !indexedDBAvailable ||
      !Modernizr.cookies ||
      !Modernizr.getrandomvalues ||
      !Modernizr.filereader ||
      !Modernizr.localstorage ||
      !Modernizr.webworkers
    ) {
      return reject(
        new Error('Some of required browser APIs are not available')
      )
    }

    return resolve()
  })
})

const checkWorkerRNG = () => new Promise((resolve, reject) => {
  Modernizr.on('workerscrypto', (workerRNGAvailable) => {
    if (!workerRNGAvailable) {
      return reject(
        new Error('Some of required browser APIs are not available')
      )
    }

    return resolve()
  })
})

const browsercheck: () => Promise<void> = () => {
  if (!Modernizr) {
    // modernizr turned off? you are on your own now
    return Promise.resolve()
  }

  return Promise
    .resolve()
    .then(checkIndexedDB)
    .then(checkWorkerRNG)
}

export default browsercheck
