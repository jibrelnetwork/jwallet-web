/**
 * далее этот файл планируется выделить в 
 * отдельную библиотеку - если это будет выглядеть полезным
 * 
 * пока пока для удобства разработки вся логика работы со стораджем будет тут
 */

import Storage from 'react-native-storage'

class storageWrapper {
    static Storage

    constructor() {
      this.Storage = new Storage({
        // maximum capacity, default 1000 
        size: 1000,

        // Use AsyncStorage for RN, or window.localStorage for web.
        // If not set, data would be lost after reload.
        storageBackend: window.localStorage,

        // expire time, default 1 day(1000 * 3600 * 24 milliseconds).
        // can be null, which means never expire.
        defaultExpires: 1000 * 3600 * 24,

        // cache data in the memory. default is true.
        enableCache: true,

        // if data was not found in storage or expired,
        // the corresponding sync method will be invoked and return 
        // the latest data.
        sync: {
          // we'll talk about the details later.
        },
      })
    }
}

export default storageWrapper
