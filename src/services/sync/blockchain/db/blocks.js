// @flow strict

import {
  type IDBPDatabase,
} from 'idb'
import { type DBBlock } from '../types'

export async function storeBlock(
  db: IDBPDatabase,
  block: DBBlock,
) {
  return db.put('Blocks', block)
}

export async function getStoredBlock(
  db: IDBPDatabase,
  id: number | string,
) {
  return db.get('Blocks', id.toString())
}
