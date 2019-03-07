// @flow

import { type Deferred } from 'utils/misc'

export const REQUEST_PRIVATE_KEY = '@@digitalAssetsSendWizard/REQUEST_PRIVATE_KEY'
export const SEND_TRANSACTION = '@@digitalAssetsSendWizard/SEND_TRANSACTION'
export const ADD_PENDING_TRANSACTION = '@@digitalAssetsSendWizard/ADD_PENDING_TRANSACTION'

export type RequestPrivateKeyPayload = {|
  walletId: WalletId,
  password: string,
|}

export type RequestPrivateKeyResult = {|
  privateKey: string,
|}

export function requestPrivateKey(
  payload: RequestPrivateKeyPayload,
  resolver: Deferred<RequestPrivateKeyResult>,
) {
  return {
    type: REQUEST_PRIVATE_KEY,
    payload,
    meta: {
      resolver,
    },
  }
}

export type SendTransactionPayload = {|
  privateKey: string,
  asset: AssetAddress,
  recipient: Address,
  amount: string,
  gasPrice?: number,
  gasLimit?: number,
  nonce?: number,
|}

export type SendTransactionResult = {|
  txHash: Hash,
|}

export function sendTransaction(
  payload: SendTransactionPayload,
  resolver: Deferred<SendTransactionResult>,
) {
  return {
    type: SEND_TRANSACTION,
    payload,
    meta: {
      resolver,
    },
  }
}

export type AddPendingTransactionPayload = {|
  sendTransactionPayload: SendTransactionPayload,
  txHash: Hash,
|}

export type AddPendingTransactionResult = void

export function addPendingTransaction(
  payload: AddPendingTransactionPayload,
  resolver: Deferred<AddPendingTransactionResult>,
) {
  return {
    type: ADD_PENDING_TRANSACTION,
    payload,
    meta: {
      resolver,
    },
  }
}

export type DigitalAssetsSendWizardAction =
  ExtractReturn<typeof requestPrivateKey> |
  ExtractReturn<typeof sendTransaction>
