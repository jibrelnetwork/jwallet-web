// @flow

import { type Deffered } from 'utils/misc'

export const REQUEST_PRIVATE_KEY = '@@digitalAssetsSendWizard/REQUEST_PRIVATE_KEY'
export const SEND_TRANSACTION = '@@digitalAssetsSendWizard/SEND_TRANSACTION'
export const ADD_PENDING_TRANSACTION = '@@digitalAssetsSendWizard/ADD_PENDING_TRANSACTION'

export type RequestPrivateKeyPayload = {|
  walletId: WalletId,
  password: string,
|}

export type RequestPrivateKeyResult = {|
  result: {
    privateKey: string,
  },
|}

export function requestPrivateKey(
  payload: RequestPrivateKeyPayload,
  resolver: Deffered<RequestPrivateKeyResult>,
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
  result: {
    txHash: Hash,
  },
|}

export function sendTransaction(
  payload: SendTransactionPayload,
  resolver: Deffered<SendTransactionResult>,
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
  resolver: Deffered<AddPendingTransactionResult>,
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
