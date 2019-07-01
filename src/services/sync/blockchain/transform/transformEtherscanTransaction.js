// @flow strict

import { getAddressChecksum } from 'utils/address'

import {
  type RawEtherscanTransaction,
  type DBTransaction,
} from '../types'

import { TRANSACTION_TYPES } from './constants'

// for algorithm description see:
// eslint-disable-next-line max-len
// https://jibrelnetwork.atlassian.net/wiki/spaces/JWALLET/pages/769327162/Ethereum+blockchain+events
function detectTxType(
  rawEtherscanTransaction: RawEtherscanTransaction,
  ownerAddress: string,
): string {
  const value = parseInt(rawEtherscanTransaction.value, 10)

  // TX Amount is not zero
  if (value > 0) {
    if (ownerAddress === rawEtherscanTransaction.from) {
      return TRANSACTION_TYPES.TRANSFER_OUT
    }

    return TRANSACTION_TYPES.TRANSFER_IN
  }

  // TX is contract deployment
  if (rawEtherscanTransaction.contractAddress !== '') {
    return TRANSACTION_TYPES.CONTRACT_CALL
  }

  // TX Signature is not empty
  if (rawEtherscanTransaction.input !== '') {
    // TX Signature is ERC20 transfer
    if (rawEtherscanTransaction.input.startsWith('0xa9059cbb')) {
      return TRANSACTION_TYPES.TRANSFER_PARENT
    } else {
      return TRANSACTION_TYPES.CONTRACT_CALL
    }
  }

  // Recipient address is a Cancellation TX address
  if (
    // eslint-disable-next-line max-len
    // see https://jibrelnetwork.atlassian.net/wiki/spaces/JWALLET/pages/765919433/UI+UX+of+the+event+details#UI/UXoftheeventdetails-Cancel
    // hex-encoded word "cancelled"
    rawEtherscanTransaction.to === '0x000000000000000000000063616e63656c6c6564'
  ) {
    return TRANSACTION_TYPES.CANCELLED
  }

  if (ownerAddress === rawEtherscanTransaction.from) {
    return TRANSACTION_TYPES.TRANSFER_OUT
  }

  return TRANSACTION_TYPES.TRANSFER_IN
}

export function transformEtherscanTransaction(
  rawEtherscanTransaction: RawEtherscanTransaction,
  ownerAddress: string,
): DBTransaction {
  return {
    id: rawEtherscanTransaction.hash,
    assetAddress: 'Ethereum',
    timestamp: parseInt(rawEtherscanTransaction.timeStamp, 10),
    type: detectTxType(rawEtherscanTransaction, ownerAddress),
    blockNumber: parseInt(rawEtherscanTransaction.blockNumber, 10),
    blockHash: rawEtherscanTransaction.blockHash,
    from: getAddressChecksum(rawEtherscanTransaction.from),
    to: getAddressChecksum(rawEtherscanTransaction.to),
    amount: rawEtherscanTransaction.value,
    hash: rawEtherscanTransaction.hash,
    gasLimit: rawEtherscanTransaction.gas,
    gasUsed: rawEtherscanTransaction.gasUsed,
    gasPrice: rawEtherscanTransaction.gasPrice,
    status: parseInt(rawEtherscanTransaction.txreceipt_status, 10),
    nonce: parseInt(rawEtherscanTransaction.nonce, 10),
  }
}
