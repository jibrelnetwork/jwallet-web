import qs from 'qs'
import getENVVar from 'utils/config/getENVVar'
import { keyBy } from 'lodash-es'

import { init } from '../db'
import {
  getAllBlocksStatus,
  storeBlocksStatus,
  storeETHTransactions,
} from './db'
import { handleTransaction } from '../handlers/handleTransaction'

const BLOCK_SYNC_STATES = {
  SUCCESS: 'success',
  ERROR: 'error',
}

const HIGHEST_BLOCK = 7975088
const LOWEST_BLOCK = 0

const BLOCKS_PER_STEP = 10000

const BLOCKEXPLORER_API =
  getENVVar('__BLOCKEXPLORER_API__') || __DEFAULT_BLOCKEXPLORER_API__

const ADDRESS = '0x6b05dD32BDCC1C162D0e3141D9e270c4d4A09918'

function createRanges(start, end, maxStep, excludeList = []) {
  const all = (new Array(end - start + 1)).fill(true)
  const ranges = all.reduce((reduceResult, item, idx) => {
    if (reduceResult.length === 0) {
      if (excludeList[idx]) {
        return reduceResult
      }

      // Add range that is available for future extension
      // eslint-disable-next-line fp/no-mutating-methods
      reduceResult.push({
        start: idx,
        end: idx,
        inProgress: true,
      })

      return reduceResult
    }

    const lastRangeIdx = reduceResult.length - 1
    const lastRange = reduceResult[lastRangeIdx]

    if (excludeList[idx]) {
      // Close latest range for extension
      reduceResult[lastRangeIdx] = {
        start: lastRange.start,
        end: lastRange.end,
      }

      return reduceResult
    }

    if (lastRange.inProgress && (lastRange.end - lastRange.start + 1 < maxStep)) {
      // Extend range
      reduceResult[lastRangeIdx].end = idx

      return reduceResult
    }

    // Close latest range for extension and open the new one
    reduceResult[lastRangeIdx] = {
      start: lastRange.start,
      end: lastRange.end,
    }

    // eslint-disable-next-line fp/no-mutating-methods
    reduceResult.push({
      start: idx,
      end: idx,
      inProgress: true,
    })

    return reduceResult
  }, [])

  const lastRange = ranges[ranges.length - 1]

  // eslint-disable-next-line fp/no-mutation
  ranges[ranges.length - 1] = {
    start: lastRange.start,
    end: lastRange.end,
  }

  return ranges
}

class PastTransactionsSync {
  constructor() {
    this.config = {}
    this.db = null
  }

  async start() {
    this.config = {
      address: ADDRESS,
    }

    this.db = await init(this.config.address)

    return this.startETHTransactionsSyncQueue()
  }

  async storeBlocksStatus(status, startBlock, endBlock) {
    return storeBlocksStatus(this.db, status, startBlock, endBlock)
  }

  async storeETHTransactions(transactions) {
    return storeETHTransactions(this.db, transactions)
  }

  async saveETHTransactionsByBlocks(startBlock, endBlock) {
    const query = qs.stringify({
      action: 'txlist',
      startblock: startBlock,
      endblock: endBlock,
      sort: 'desc',
    })

    return fetch(`${BLOCKEXPLORER_API}/v1/mainnet/${this.config.address}/transactions?${query}`)
      .then(rs => rs.json())
      .then((data) => {
        if (data.status === '1') {
          return this.storeETHTransactions(data.result.map(handleTransaction))
            .then(() => this.storeBlocksStatus(
              BLOCK_SYNC_STATES.SUCCESS,
              startBlock,
              endBlock,
            ))
        }

        return this.storeBlocksStatus(
          BLOCK_SYNC_STATES.SUCCESS,
          startBlock,
          endBlock,
        )
      })
      .catch((err) => {
        console.error(err)

        // FIXME: add resync

        // Error does not interrupt synchronization
        return Promise.resolve()
      })
  }

  async startETHTransactionsSyncQueue() {
    const allBlocksList = await getAllBlocksStatus(this.db)
    const allBlocks = keyBy(allBlocksList, 'id')
    // eslint-disable-next-line fp/no-mutating-methods
    const ranges = createRanges(LOWEST_BLOCK, HIGHEST_BLOCK, BLOCKS_PER_STEP, allBlocks).reverse()

    return ranges.reduce(
      (reduceResult, {
        start,
        end,
      }) =>
        reduceResult
          .then(() => this.saveETHTransactionsByBlocks(start, end)),
      Promise.resolve(),
    )
  }
}

export const pastTransactionsSyncer = new PastTransactionsSync()

pastTransactionsSyncer.start()
  .then(() => console.log('finished syncing'))
  .catch(err => console.error(err))
