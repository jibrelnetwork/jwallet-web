// @flow strict

import BigNumber from 'bignumber.js'

import {
  type DBBlock,
  type DBTransaction,
} from 'services/sync/types'

const ERC20_TRANSFER_TOPIC: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
= '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
const JNT_MINT_TOPIC: '0x3fffaa5804a26fcec0d70b1d0fb0a2d0031df3a5f9c8af2127c2f4360e97b463'
= '0x3fffaa5804a26fcec0d70b1d0fb0a2d0031df3a5f9c8af2127c2f4360e97b463'
const JNT_BURN_TOPIC: '0x512586160ebd4dc6945ba9ec5d21a1f723f26f3c7aa36cdffb6818d4e7b88030'
= '0x512586160ebd4dc6945ba9ec5d21a1f723f26f3c7aa36cdffb6818d4e7b88030'

type EventMethodsKeccak256
  = typeof ERC20_TRANSFER_TOPIC
  | typeof JNT_MINT_TOPIC
  | typeof JNT_BURN_TOPIC

type TransferTopic = [
  typeof ERC20_TRANSFER_TOPIC,
  // address from
  string,
  // address to
  string,
]

type MintTopic = [
  typeof JNT_MINT_TOPIC,
  // address target
  string,
]

type BurnTopic = [
  typeof JNT_BURN_TOPIC,
  // address target
  string,
]

type Topics = TransferTopic | MintTopic | BurnTopic

type LogItem = {|
  address: Address, // asset address
  topics: Topics,
  data: string, // hexed number (amount of event)
  blockNumber: string, // hexed number
  transactionHash: string,
  transactionIndex: string, // hexed number
  blockHash: string, // hexed number
  logIndex: string, // hexed number
  removed: boolean,
|}

type EventName = 'TransferEvent' | 'BurnEvent' | 'MintEvent'
type TopicData = {
  type: EventName,
  from: Address,
  to: Address,
}

function getTopicData(item: LogItem): TopicData {
  const TOPICS_MAP: { [EventMethodsKeccak256]: (LogItem) => TopicData } = {
    [ERC20_TRANSFER_TOPIC]: result => ({
      type: 'TransferEvent',
      from: result.topics[1],
      // $FlowFixMe
      to: result.topics[2],
    }),
    [JNT_BURN_TOPIC]: result => ({
      type: 'BurnEvent',
      from: result.address,
      to: result.topics[1],
    }),
    [JNT_MINT_TOPIC]: result => ({
      type: 'MintEvent',
      from: result.address,
      to: result.topics[1],
    }),
  }

  const methodTopic = item.topics[0]

  return TOPICS_MAP[methodTopic](item) || null
}

export function handleLogsItem(
  logItem: LogItem,
  block: DBBlock,
  {
    gasPrice,
    nonce,
  }: TransactionData,
  {
    gasUsed,
    status,
  }: TransactionReceiptData,
  parentTransaction: DBTransaction,
): DBTransaction {
  const {
    address,
    blockHash,
    blockNumber,
    transactionHash,
    data,
    logIndex,
  } = logItem

  const {
    type,
    from,
    to,
  } = getTopicData(logItem)
  const id = `${transactionHash}${logIndex}`
  const amount = new BigNumber(data, 10)
  const parsedBlockNumber = Number(blockNumber)

  return {
    id,
    type,
    assetAddress: address,
    blockNumber: parsedBlockNumber,
    blockHash,
    hash: transactionHash,
    amount,
    from,
    to,
    gasPrice,
    gasUsed: String(gasUsed),
    status: Number(status),
    nonce,
    timestamp: block.timestamp,
    gasLimit: parentTransaction.gasLimit,
  }
}
