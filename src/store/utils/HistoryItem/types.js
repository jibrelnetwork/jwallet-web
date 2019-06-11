// @flow strict

export const TRANSFER_IN_TYPE: '$TransferIn' = '$TransferIn'
export const TRANSFER_OUT_TYPE: '$TransferOut' = '$TransferOut'
export const TRANSFER_CANCEL_TYPE: '$TransferCancel' = '$TransferCancel'
export const CONTRACT_CALL_TYPE: '$ContractCall' = '$ContractCall'
export const EVENT_MINT_TYPE: '$EventMint' = '$EventMint'
export const EVENT_BURN_TYPE: '$EventBurn' = '$EventBurn'

export type HistoryItemsTypes
  = '$TransferIn'
  | '$TransferOut'
  | '$TransferCancel'
  | '$ContractCall'
  // | '$EventMint'
  // | '$EventBurn'

export type TransactionState
  = 'success'
  | 'pending'
  | 'fail'
  | 'stuck'

opaque type TransactionRecord = {|
  id: TransactionId,
  hash: Hash,
  status: TransactionState,
  asset: AssetAddress,
  from: Address, // FIXME: Contact: Address | OwnerAddress | ContactID
  to: Address,
  fee: string,
  note: string,
  timestamp: number,
|}

export type TransferIn = {|
  ...TransactionRecord,
  +type: typeof TRANSFER_IN_TYPE,
  amount: string,
|}

export type TransferOut = {|
  ...TransactionRecord,
  +type: typeof TRANSFER_OUT_TYPE,
  amount: string,
|}

export type TransferCancel = {|
  ...TransactionRecord,
  +type: typeof TRANSFER_CANCEL_TYPE,
|}

export type ContractCall = {|
  ...TransactionRecord,
  +type: typeof CONTRACT_CALL_TYPE,
  contractAddress: OwnerAddress,
|}

export type EventMint = {|
  +type: typeof EVENT_MINT_TYPE,
|}

export type EventBurn = {|
  +type: typeof EVENT_BURN_TYPE,
|}

export type HistoryItem
  = TransferIn
  | TransferOut
  | TransferCancel
  | ContractCall
  // | EventMint
  // | EventBurn
