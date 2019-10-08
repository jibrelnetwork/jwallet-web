// @flow strict

const DB_NAME: string = 'localforage'
const STORE_NAME: string = 'keyvaluepairs'
const VERSION_KEY: string = 'persist:jwallet-web-version'

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const openRequest: IDBOpenDBRequest = window.indexedDB.open(DB_NAME)

    /* eslint-disable fp/no-mutation */
    openRequest.onsuccess = function openDBSuccess() {
      // $FlowFixMe
      resolve(openRequest.result)
    }

    openRequest.onerror = function openDBError() {
      reject(new Error(`Database "${DB_NAME}" open error`))
    }
    /* eslint-enable fp/no-mutation */
  })
}

export function initTransaction(): Promise<IDBTransaction> {
  return openDB().then((db: IDBDatabase) => {
    const transaction: IDBTransaction = db.transaction(STORE_NAME, 'readwrite')

    /* eslint-disable fp/no-mutation */
    transaction.onerror = function transactionError() {
      throw new Error('Transaction failed')
    }

    transaction.oncomplete = function transactionComplete() {
      // console.log('Transaction completed')
    }

    return Promise.resolve(transaction)
    /* eslint-enable fp/no-mutation */
  })
}

export function getStoreVersion(): Promise<number> {
  return initTransaction().then((transaction: IDBTransaction) => new Promise((resolve, reject) => {
    const objectStore: IDBObjectStore = transaction.objectStore(STORE_NAME)
    const objectStoreRequest: IDBRequest = objectStore.get(VERSION_KEY)

    /* eslint-disable fp/no-mutation */
    objectStoreRequest.onsuccess = function objectStoreSuccess() {
      resolve(parseInt(objectStoreRequest.result, 10) || 0)
    }

    objectStoreRequest.onerror = function objectStoreError() {
      reject(new Error('Request failed'))
    }
    /* eslint-enable fp/no-mutation */
  }))
}

export function setStoreVersion(
  version: number,
  transaction: IDBTransaction,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const objectStore: IDBObjectStore = transaction.objectStore(STORE_NAME)
    const objectStoreRequest: IDBRequest = objectStore.put(version.toString(), VERSION_KEY)

    /* eslint-disable fp/no-mutation */
    objectStoreRequest.onsuccess = function objectStoreSuccess() {
      resolve()
    }

    objectStoreRequest.onerror = function objectStoreError() {
      reject(new Error('Request failed'))
    }
    /* eslint-enable fp/no-mutation */
  })
}

export function getStoreData(key: string): Promise<Object> {
  return initTransaction().then((transaction: IDBTransaction) => new Promise((resolve, reject) => {
    const objectStore: IDBObjectStore = transaction.objectStore(STORE_NAME)
    const objectStoreRequest: IDBRequest = objectStore.get(key)

    /* eslint-disable fp/no-mutation */
    objectStoreRequest.onsuccess = function objectStoreSuccess() {
      try {
        if (typeof objectStoreRequest.result !== 'string') {
          resolve({})

          return
        }

        const result = JSON.parse(objectStoreRequest.result)
        const persist = JSON.parse(result.persist)

        resolve(persist)
      } catch (error) {
        reject(error)
      }
    }

    objectStoreRequest.onerror = function objectStoreError() {
      reject(new Error('Request failed'))
    }
    /* eslint-enable fp/no-mutation */
  }))
}

function setStoreDataWithinTransaction(
  data: Object,
  key: string,
  transaction: IDBTransaction,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const storeData = {
      persist: JSON.stringify(data),
    }

    const objectStore: IDBObjectStore = transaction.objectStore(STORE_NAME)
    const objectStoreRequest: IDBRequest = objectStore.put(JSON.stringify(storeData), key)

    /* eslint-disable fp/no-mutation */
    objectStoreRequest.onsuccess = function objectStoreSuccess() {
      resolve()
    }

    objectStoreRequest.onerror = function objectStoreError() {
      reject(new Error('Request failed'))
    }
    /* eslint-enable fp/no-mutation */
  })
}

export function setStoreData(
  data: Object,
  key: string,
  transaction?: IDBTransaction,
): Promise<void> {
  if (transaction) {
    return setStoreDataWithinTransaction(
      data,
      key,
      transaction,
    )
  }

  return initTransaction().then((tx: IDBTransaction) => new Promise((resolve, reject) => {
    const storeData = {
      persist: JSON.stringify(data),
    }

    const objectStore: IDBObjectStore = tx.objectStore(STORE_NAME)
    const objectStoreRequest: IDBRequest = objectStore.put(JSON.stringify(storeData), key)

    /* eslint-disable fp/no-mutation */
    objectStoreRequest.onsuccess = function objectStoreSuccess() {
      resolve()
    }

    objectStoreRequest.onerror = function objectStoreError() {
      reject(new Error('Request failed'))
    }
    /* eslint-enable fp/no-mutation */
  }))
}

export function deleteStoreData(
  key: string,
  transaction: IDBTransaction,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const objectStore: IDBObjectStore = transaction.objectStore(STORE_NAME)
    const objectStoreRequest: IDBRequest = objectStore.delete(key)

    /* eslint-disable fp/no-mutation */
    objectStoreRequest.onsuccess = function objectStoreSuccess() {
      resolve()
    }

    objectStoreRequest.onerror = function objectStoreError() {
      reject(new Error('Request failed'))
    }
    /* eslint-enable fp/no-mutation */
  })
}
