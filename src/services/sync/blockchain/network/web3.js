// @flow strict

import axios, { CancelToken } from 'axios'
import { ONE_SECOND } from 'data/intervals'
import { add0x } from 'utils/address'
import { nodeUrlFromNetworkId } from 'utils/blockchain'

import {
  type RawEvent,
  type RawBlock,
  type RawTransactionReceipt,
  type RawTransaction,
} from '../types'

const source = CancelToken.source()

const REQUEST_RETRY = {
  MIN_INTERVAL: 3 * ONE_SECOND,
  HOPS_TO_MAX: 5,
  HOP_RATIO: 1.6,
}

const axiosInstance = axios.create({
  timeout: 30 * ONE_SECOND,
  cancelToken: source.token,
})

export const cancelAllGetAssetEvents = source.cancel

function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time))
}

async function nodeRequestWithRetries(url: string, body: any, tryNumber: number = 0) {
  try {
    const result = await axiosInstance.post(url, body)

    return result.data
  } catch (err) {
    // We retry failing request continuously with exponentially increasing interval
    // unless we get cancel signal
    if (axios.isCancel(err)) {
      throw err
    }

    await delay(REQUEST_RETRY.MIN_INTERVAL * (REQUEST_RETRY.HOP_RATIO ** tryNumber))

    return nodeRequestWithRetries(
      url,
      body,
      Math.min(tryNumber + 1, REQUEST_RETRY.HOPS_TO_MAX),
    )
  }
}

export const BLOCKS_PER_PAGE = 250000
export const TOPICS = {
  // Transfer(address,address,uint256)
  TRANSFER: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
  // MintEvent(address,uint256)
  MINT: '0x3fffaa5804a26fcec0d70b1d0fb0a2d0031df3a5f9c8af2127c2f4360e97b463',
  // BurnEvent(address,uint256)
  BURN: '0x512586160ebd4dc6945ba9ec5d21a1f723f26f3c7aa36cdffb6818d4e7b88030',
}

export async function getAssetEvents(
  networkId: string,
  ownerAddress: string,
  assetAddress: string,
  endBlock: number,
  startBlock: number,
): Promise<RawEvent[]> {
  const nodeUrl = nodeUrlFromNetworkId(networkId)

  const fromBlock = startBlock > 0
    ? add0x(startBlock.toString(16))
    : add0x('0')

  const ownerAddressTopic = `0x000000000000000000000000${ownerAddress.slice(2)}`
  const toBlock = add0x(endBlock.toString(16))

  const eventsMintBurnTransferFrom = await nodeRequestWithRetries(
    nodeUrl,
    {
      jsonrpc: '2.0',
      method: 'eth_getLogs',
      params: [{
        fromBlock,
        toBlock,
        address: assetAddress,
        topics: [
          [
            TOPICS.TRANSFER,
            TOPICS.MINT,
            TOPICS.BURN,
          ],
          [ownerAddressTopic],
        ],
      }],
      id: +new Date(),
    },
  )

  const eventsTransferTo = await nodeRequestWithRetries(
    nodeUrl,
    {
      jsonrpc: '2.0',
      method: 'eth_getLogs',
      params: [{
        fromBlock,
        toBlock,
        address: assetAddress,
        topics: [
          [TOPICS.TRANSFER],
          [],
          [ownerAddressTopic],
        ],
      }],
      id: +new Date(),
    },
  )

  return [
    ...eventsMintBurnTransferFrom.result,
    ...eventsTransferTo.result,
  ]
}

export async function getAssetEventsByPage(
  networkId: string,
  ownerAddress: string,
  assetAddress: string,
  endBlock: number,
  page: number,
  deploymentBlock: number,
): Promise<RawEvent[]> {
  const pageStartBlock = endBlock - BLOCKS_PER_PAGE * page
  const fromBlock = pageStartBlock > deploymentBlock
    ? pageStartBlock
    : deploymentBlock

  return getAssetEvents(networkId, ownerAddress, assetAddress, endBlock, fromBlock)
}

export async function getBlock(
  networkId: string,
  blockNumber: number,
): Promise<RawBlock> {
  const nodeUrl = nodeUrlFromNetworkId(networkId)

  const blockNumberInHex = add0x(blockNumber.toString(16))

  const data = await nodeRequestWithRetries(
    nodeUrl,
    {
      jsonrpc: '2.0',
      method: 'eth_getBlockByNumber',
      params: [
        blockNumberInHex,
        false, // only transaction hashes, not actual transactions
      ],
      id: +new Date(),
    },
  )

  return data.result
}

export async function getTransactionReceipt(
  networkId: string,
  txHash: string,
): Promise<RawTransactionReceipt> {
  const nodeUrl = nodeUrlFromNetworkId(networkId)

  const data = await nodeRequestWithRetries(
    nodeUrl,
    {
      jsonrpc: '2.0',
      method: 'eth_getTransactionReceipt',
      params: [txHash],
      id: +new Date(),
    },
  )

  return data.result
}

export async function getTransaction(
  networkId: string,
  txHash: string,
): Promise<RawTransaction> {
  const nodeUrl = nodeUrlFromNetworkId(networkId)

  const data = await nodeRequestWithRetries(
    nodeUrl,
    {
      jsonrpc: '2.0',
      method: 'eth_getTransactionByHash',
      params: [txHash],
      id: +new Date(),
    },
  )

  return data.result
}
