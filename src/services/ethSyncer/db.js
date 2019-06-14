// @flow strict

import {
  openDB,
  type IDBPTransactionExtends,
} from 'idb'

// export type BlockResponse = {
//   parentHash: string,
//   hash: string,
//   number: number,
//
//   difficulty: number,
//   timestamp: number,
//   nonce: string,
//   extraData: string,
//
//   gasLimit: string,
//   gasUsed: string,
//
//   miner: string,
//   transactions: string[],
// }
//
// export type TransactionResponse = {
//   // Only available for mined transactions
//   blockHash: ?string,
//   blockNumber: ?number,
//   timestamp: ?number,
//
//   // Exactly one of these will be present (send vs. deploy contract)
//   // They will always be a properly formatted checksum address
//   creates: ?string,
//   to: ?string,
//
//   // The transaction hash
//   hash: string,
//
//   // See above "Transaction Requests" for details
//   data: string,
//   from: string,
//   gasLimit: string,
//   gasPrice: string,
//   nonce: number,
//   value: string,
//
//   // The chain ID; 0 indicates replay-attack vulnerable
//   // (eg. 1 = Homestead mainnet, 3 = Ropsten testnet)
//   chainId: number,
//
//   // The signature of the transaction (TestRPC may fail to include these)
//   r: string,
//   s: string,
//   v: number,
//
//   // The raw transaction (TestRPC may be missing this)
//   raw: string,
// }

export function addListToDB(tx: IDBPTransactionExtends) {
  return async (list: any[]): Promise<boolean> => {
    try {
      list.forEach((item) => { tx.store.add(item) })

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
      const addressObjectStore =
        db.createObjectStore('History', { keyPath: 'transactionID' })
      addressObjectStore.createIndex('blockNumber', 'blockNumber')
    },
    blocked() {},
    blocking() {},
  })
}

export default {
  init,
}

/*
web3 structures
/!**
 * @see https://web3js.readthedocs.io/en/1.0/web3-eth.html#id45
 *!/
type BlockRecord = {
  number: number,
  hash: string,
  parentHash: string,
  nonce: string,
  sha3Uncles: string,
  logsBloom: string,
  transactionsRoot: string,
  stateRoot: string,
  receiptsRoot: string,
  miner: string,
  difficulty: string,
  totalDifficulty: string,
  size: number,
  extraData: string,
  gasLimit: number,
  gasUsed: number,
  timestamp: number,
  transactions: string[],
  uncles: string[],
}

/!**
 * @see https://web3js.readthedocs.io/en/1.0/web3-eth.html#eth-gettransaction-return
 *!/
type TransactionRecord = {
  hash: string,
  nonce: number,
  blockHash: ?string, // null when pending
  blockNumber: ?number, // null when pending
  transactionIndex: ?number, // null when pending
  from: string,
  to: ?string, // null when contract creation transaction
  value: string,
  gas: number,
  gasPrice: string,
  input: string,
} */
