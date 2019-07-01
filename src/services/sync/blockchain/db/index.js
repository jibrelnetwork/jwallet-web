// @flow strict

import { openDB } from 'idb'

const DB_VERSION = 1

export async function init(id: string) {
  // eslint-disable-next-line no-return-await
  return await openDB(id, DB_VERSION, {
    upgrade(db) {
      const transactionsObjectStore =
        db.createObjectStore('Transactions', { keyPath: 'id' })
      transactionsObjectStore.createIndex('assetAddress', 'assetAddress')
      transactionsObjectStore.createIndex('timestamp', 'timestamp')
      transactionsObjectStore.createIndex('type', 'type')
      transactionsObjectStore.createIndex('blockNumber', 'blockNumber')

      db.createObjectStore('Blocks', { keyPath: 'id' })
        .createIndex('hash', 'hash')

      db.createObjectStore('HistoryMeta')
    },
    blocked() {
      console.warn('DB IS BLOCKED')
    },
    blocking() {
      console.warn('DB IS BLOCKING')
    },
  })
}
