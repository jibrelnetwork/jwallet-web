/**
 * далее этот файл планируется выделить в 
 * отдельную библиотеку - если это будет выглядеть полезным
 * 
 * пока пока для удобства разработки вся логика работы со стораджем будет тут
 */

import Storage from 'react-native-storage'

import defaults from './defaults'

class storageWrapper {
  static Storage;

  constructor(contructorOptions) {
    this.Storage = new Storage(Object.assign({}, defaults, contructorOptions))

    if (window) window.storage = this.Storage
  }

  save() {

  }

  load() {

  }

  remove() {

  }

  clear() {

  }

  import() {

  }

  export() {

  }
}

export default storageWrapper
