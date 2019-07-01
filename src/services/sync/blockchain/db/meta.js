// @flow strict

import {
  type IDBPDatabase,
} from 'idb'

export async function storeSavedBlocksStart(
  db: IDBPDatabase,
  contractAddress: string,
  blockNumber: number,
) {
  return db.put('HistoryMeta', blockNumber, `${contractAddress}:saved:start`)
}

export async function getSavedBlocksStart(
  db: IDBPDatabase,
  contractAddress: string,
) {
  return db.get('HistoryMeta', `${contractAddress}:saved:start`)
}

export async function storeSavedBlocksEnd(
  db: IDBPDatabase,
  contractAddress: string,
  blockNumber: number,
) {
  return db.put('HistoryMeta', blockNumber, `${contractAddress}:saved:end`)
}

export async function getSavedBlocksEnd(
  db: IDBPDatabase,
  contractAddress: string,
) {
  return db.get('HistoryMeta', `${contractAddress}:saved:end`)
}

export async function getSavedBlocksRange(
  db: IDBPDatabase,
  contractAddress: string,
) {
  const start = await db.get('HistoryMeta', `${contractAddress}:saved:start`)
  const end = await db.get('HistoryMeta', `${contractAddress}:saved:end`)

  return {
    start,
    end,
  }
}
