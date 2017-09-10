import FileSaver from 'file-saver'
import Storage from 'react-native-storage'

import defaults from './defaults'
import { uuidv4 } from './uuidv4'

class StorageWrapper {
  static exportFileName = 'keys.txt'
  static exportFileParameters = { type: 'text/plain;charset=utf-8' }

  constructor(contructorOptions) {
    this.Storage = new Storage(Object.assign({}, defaults, contructorOptions))

    if (window) window.storage = this.Storage
  }

  save(key, data, keyId) {
    const id = keyId || uuidv4()
    this.Storage.save({ key, data, id })
    return id
  }

  load(key, id) {
    const request = id ? {
      key,
      id,
    } : {
      key,
    }

    return this.Storage.load(request)
  }

  remove(key) {
    this.Storage.clearMapForKey(key)
    this.Storage.remove(key)
  }

  clear() {
    this.Storage.clearMap()
  }
  /**
   * read text file from <input type="file"
   */
  importFromFile(fileData) {
    const key = uuidv4()

    const reader = new window.FileReader()

    reader.onload = function onReaderLoad(e) {
      const contents = e.target.result
      if (fileData.size) {
        this.save(key, contents)
      }
    }
    reader.onerror = function onReaderError(err) {
      throw new Error(err)
    }

    reader.readAsText(fileData)

    return key
  }

  /**
   * 
   * retrieve param and save to text file
   */
  exportToFile(key) {
    const data = this.Storage.getAllDataForKey(key)
    if (data) {
      const blob = new Blob(data, this.exportFileParameters)
      FileSaver.saveAs(blob, this.exportFileName)
    }
  }
}

export default StorageWrapper
