// @flow strict

import {
  isString,
} from 'lodash-es'

import {
  type RawTransaction,
  type RawBlock,
  type DBBlock,
} from '../types'

function transactionsToHashes(transactions: string[] | RawTransaction[]): string[] {
  if (transactions.length === 0 || isString(transactions[0])) {
    return transactions
  }

  return transactions.map(tx => tx.hash)
}

export function transformBlock(rawBlock: RawBlock): DBBlock {
  const number = parseInt(rawBlock.number, 16)

  return {
    id: number.toString(),
    number,
    hash: rawBlock.hash,
    parentHash: rawBlock.parentHash,
    timestamp: parseInt(rawBlock.timestamp, 16),
    transactions: transactionsToHashes(rawBlock.transactions),
  }
}
