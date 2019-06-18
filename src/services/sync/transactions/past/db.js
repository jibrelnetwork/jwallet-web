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
