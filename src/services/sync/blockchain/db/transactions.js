// @flow strict

import {
  type IDBPDatabase,
} from 'idb'
import { type DBTransaction } from '../types'

export async function storeTransactions(
  db: IDBPDatabase,
  transactions: DBTransaction[],
) {
  const tx = db.transaction('Transactions', 'readwrite')
  const store = tx.objectStore('Transactions')

  transactions.forEach(t => store.put(t))

  await tx.done
}

export async function getStoredTransaction(
  db: IDBPDatabase,
  id: string,
): Promise<DBTransaction> {
  return db.get('Transactions', id)
}
