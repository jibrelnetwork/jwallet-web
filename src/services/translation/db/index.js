// @flow strict

import {
  openDB,
} from 'idb'

const DB_VERSION = 1

export type DBType = {
  Lang: {
    lang: string,
  },
}

export async function init() {
  // eslint-disable-next-line no-return-await
  return await openDB<DBType>('Translation', DB_VERSION, {
    // $FlowFixMe
    upgrade(db) {
      db.createObjectStore('Lang')
    },
    blocked() {
      console.warn('DB IS BLOCKED')
    },
    blocking() {
      console.warn('DB IS BLOCKING')
    },
  })
}
