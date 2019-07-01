// @flow strict

import {
  map,
  last,
} from 'lodash-es'

import { type IDBPDatabase } from 'idb'

import {
  storeBlock,
  getStoredBlock,
} from '../../db/blocks'
import {
  getStoredTransaction,
} from '../../db/transactions'

import {
  getBlock,
  getTransaction,
  getTransactionReceipt,
  getAssetEventsByPage,
  BLOCKS_PER_PAGE,
} from '../../network/web3'
import {
  getEthTransactions,
  TRANSACTIONS_PER_PAGE,
} from '../../network/etherscan'

import { transformEtherscanTransaction }
  from '../../transform/transformEtherscanTransaction'
import { transformEvent } from '../../transform/transformEvent'
import { transformBlock } from '../../transform/transformBlock'

async function getBlockFromDBOrNode(
  db: IDBPDatabase,
  networkId: string,
  blockNumber: number,
) {
  const storedBlock = await getStoredBlock(db, blockNumber)

  if (storedBlock) {
    return storedBlock
  }

  const rawBlock = await getBlock(networkId, blockNumber)
  const block = transformBlock(rawBlock)

  await storeBlock(db, block)

  return block
}

async function getTransactionFromDBOrNode(
  db: IDBPDatabase,
  networkId: string,
  txHash: string,
) {
  const storedTx = await getStoredTransaction(db, txHash)

  if (storedTx) {
    return storedTx
  }

  return getTransaction(networkId, txHash)
}

export async function getEvents(
  db: IDBPDatabase,
  networkId: string,
  assetAddress: string,
  ownerAddress: string,
  endBlock: number,
  page: number,
  minBlock: number,
) {
  const rawEvents = await getAssetEventsByPage(
    networkId,
    ownerAddress,
    assetAddress,
    endBlock,
    page,
    minBlock,
  )
  const initialStartBlock = endBlock - page * BLOCKS_PER_PAGE
  const startBlock = initialStartBlock < minBlock ? minBlock : initialStartBlock

  const result = await Promise.all(
    map(
      rawEvents,
      async (event) => {
        const [blockData, receiptData, transactionData] = await Promise.all([
          getBlockFromDBOrNode(db, networkId, parseInt(event.blockNumber, 16)),
          getTransactionReceipt(networkId, event.transactionHash),
          getTransactionFromDBOrNode(db, networkId, event.transactionHash),
        ])

        return transformEvent(
          ownerAddress,
          event,
          blockData,
          receiptData,
          transactionData,
        )
      },
    ),
  )

  return {
    isLast: startBlock === minBlock,
    lowestBlock: startBlock,
    result,
  }
}

export async function getTransactions(
  networkId: string,
  ownerAddress: string,
  endBlock: number,
  page: number,
) {
  return getEthTransactions(networkId, ownerAddress, endBlock, page)
    .then((response) => {
      const {
        status,
        result: rawResult,
      } = response.data

      const result = rawResult.map(tx => transformEtherscanTransaction(tx, ownerAddress))
      const lowestBlock = result.length === 0
        ? 0
        : last(result).blockNumber

      return {
        isLast: status === '0' || result.length < TRANSACTIONS_PER_PAGE,
        lowestBlock,
        result,
      }
    })
}
