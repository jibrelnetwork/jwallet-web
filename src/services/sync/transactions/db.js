// @flow strict

import {
  openDB,
  type IDBPTransactionExtends,
} from 'idb'

export function addListToDB(tx: IDBPTransactionExtends) {
  return async (list: any[]): Promise<boolean> => {
    try {
      list.forEach((item) => { tx.store.put(item) })

      await tx.done
    } catch (error) {
      throw new Error(error)
    }

    return true
  }
}

export async function init(address: string, version: number = 1) {
  // eslint-disable-next-line no-return-await
  return await openDB(address, version, {
    upgrade(db) {
      const addressStore = db.createObjectStore('History', { keyPath: 'id' })
      addressStore.createIndex('blockNumber', 'blockNumber')
      addressStore.createIndex('timestamp', 'blockData.timestamp')

      const blockStore = db.createObjectStore('Blocks', { keyPath: 'id' })
      blockStore.createIndex('status', 'status')
      blockStore.createIndex('timestamp', 'timestamp')

      db.createObjectStore('HistoryMeta')
    },
    blocked() {
      console.log('DB IS BLOCKED')
    },
    blocking() {
      console.log('DB IS BLOCKING')
    },
  })
}

export default {
  init,
}
