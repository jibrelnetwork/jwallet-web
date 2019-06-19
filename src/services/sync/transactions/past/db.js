export async function storeBlocksStatus(db, status, startBlock, endBlock) {
  const tx = db.transaction('Blocks', 'readwrite')
  const store = tx.objectStore('Blocks')

  // eslint-disable-next-line more/no-c-like-loops, fp/no-let, fp/no-mutation, no-plusplus
  for (let blockNumber = startBlock; blockNumber <= endBlock; blockNumber++) {
    store.put({
      id: blockNumber,
      status,
    })
  }

  await tx.done
}

export async function getAllBlocksStatus(db) {
  const tx = db.transaction('Blocks', 'readonly')
  const store = tx.objectStore('Blocks')

  return store.getAll()
}

export async function storeETHTransactions(db, transactions) {
  const tx = db.transaction('History', 'readwrite')
  const store = tx.objectStore('History')

  transactions.forEach(t => store.put(t))

  await tx.done
}

export async function storeRecentBlocksSynced(db, contractAddress, data) {
  return db
    .transaction('HistoryMeta', 'readwrite')
    .objectStore('HistoryMeta')
    .put(data, `${contractAddress}:sync:recent`)
}

export async function getRecentBlocksSynced(db, contractAddress) {
  return db
    .transaction('HistoryMeta', 'readwrite')
    .objectStore('HistoryMeta')
    .get(`${contractAddress}:sync:recent`)
}

export async function storeSyncHighest(db, contractAddress, blockNumber) {
  const tx = db.transaction('HistoryMeta', 'readwrite')
  const store = tx.objectStore('HistoryMeta')

  return store.put(blockNumber, `${contractAddress}:sync:past:highest`)
}

export async function storeSyncLowest(db, contractAddress, blockNumber) {
  const tx = db.transaction('HistoryMeta', 'readwrite')
  const store = tx.objectStore('HistoryMeta')

  return store.put(blockNumber, `${contractAddress}:sync:past:lowest`)
}

export async function getSyncHighest(db, contractAddress) {
  const tx = db.transaction('HistoryMeta', 'readonly')
  const store = tx.objectStore('HistoryMeta')

  return store.get(`${contractAddress}:sync:past:highest`)
}

export async function getSyncLowest(db, contractAddress) {
  const tx = db.transaction('HistoryMeta', 'readonly')
  const store = tx.objectStore('HistoryMeta')

  return store.get(`${contractAddress}:sync:past:lowest`)
}
