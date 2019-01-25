// @flow
// Checking necessary compatibility browser features
declare var Modernizr: any

const browsercheck: () => Promise<void> = () => {
  if (!Modernizr) {
    // modernizr turned off? you are on your own now
    return Promise.resolve()
  }

  return new Promise((resolve, reject) => {
    Modernizr.on('indexeddb', (indexedDBAvailable) => {
      Modernizr.on('workerscrypto', (workerscryptoDBAvailable) => {
        if (
          !indexedDBAvailable ||
        !Modernizr.cookies ||
        !Modernizr.getrandomvalues ||
        !Modernizr.filereader ||
        !Modernizr.localstorage ||
        !Modernizr.webworkers ||
        !workerscryptoDBAvailable
        ) {
          return reject(
            new Error('Some of required browser APIs are not available')
          )
        }

        return resolve()
      })
    })
  })
}

export default browsercheck
