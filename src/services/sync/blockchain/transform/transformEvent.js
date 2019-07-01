// @flow strict

import {
  has,
  isNumber,
} from 'lodash-es'

import { getAddressChecksum } from 'utils/address'
import { toBigNumber } from 'utils/numbers'

import { TOPICS } from '../network/web3'
import {
  type RawEvent,
  type RawTransactionReceipt,
  type RawTransaction,
  type DBTransaction,
  type DBBlock,
} from '../types'

import { TRANSACTION_TYPES } from './constants'

function extractParticipants(rawEvent: RawEvent) {
  const { topics } = rawEvent
  const topic = topics[0]

  switch (topic) {
    case TOPICS.TRANSFER: {
      return {
        from: getAddressChecksum(topics[1].slice(26)),
        to: getAddressChecksum(topics[2].slice(26)),
      }
    }
    case TOPICS.MINT:
    case TOPICS.BURN: {
      return {
        // source of mint and burn events is contract
        from: getAddressChecksum(rawEvent.address),
        to: getAddressChecksum(topics[1].slice(26)),
      }
    }
    default: {
      return {
        from: undefined,
        to: undefined,
      }
    }
  }
}

function typeFromTopics(topics: string[], incoming: boolean = true) {
  const topic = topics[0]

  switch (topic) {
    case TOPICS.TRANSFER: {
      return incoming
        ? TRANSACTION_TYPES.TRANSFER_IN
        : TRANSACTION_TYPES.TRANSFER_OUT
    }
    case TOPICS.BURN: {
      return TRANSACTION_TYPES.BURN
    }
    case TOPICS.MINT: {
      return TRANSACTION_TYPES.MINT
    }
    default:
      return TRANSACTION_TYPES.UNKNOWN
  }
}

function toDecimalString(value: string) {
  return value.startsWith('0x')
    ? toBigNumber(value, 16).toString()
    : value
}

export function transformEvent(
  ownerAddress: string,
  rawEvent: RawEvent,
  block: DBBlock,
  rawTransactionReceipt: RawTransactionReceipt,
  transaction: RawTransaction | DBTransaction,
): DBTransaction {
  const participants = extractParticipants(rawEvent)

  return {
    id: `${rawEvent.transactionHash}${parseInt(rawEvent.logIndex, 16)}`,
    assetAddress: rawEvent.address,
    timestamp: block.timestamp,
    type: typeFromTopics(rawEvent.topics, participants.to === ownerAddress),
    blockNumber: parseInt(rawEvent.blockNumber, 16),
    blockHash: rawEvent.blockHash,
    ...participants,
    amount: toBigNumber(rawEvent.data, 16).toString(),
    hash: rawEvent.transactionHash,
    gasLimit: has(transaction, 'gasLimit')
      ? transaction.gasLimit
      : toDecimalString(transaction.gas),
    gasUsed: toDecimalString(rawTransactionReceipt.gasUsed),
    gasPrice: toDecimalString(transaction.gasPrice),
    status: parseInt(rawTransactionReceipt.status, 16),
    nonce: isNumber(transaction.nonce)
      ? transaction.nonce
      : parseInt(transaction.nonce, 16),
  }
}
