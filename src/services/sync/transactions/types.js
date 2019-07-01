// @flow strict

export type DBTransaction = {|
  id: string, // primary key
  assetAddress: string, // index
  timestamp: number, // index
  type: string, // index
    // transferIn
    // transferOut
    // mint
    // burn
    // contractCall
    // ...
  blockNumber: number, // index
  blockHash: string,
  from: string,
  to: string,
  amount: string, // in decimal format
  hash: string, // parent tx hash for events
  gasLimit: string, // in decimal format, parent value for events
  gasUsed: string, // in decimal format
  gasPrice: string, // in decimal format, parent value for events
  status: number, // 1 for success, 0 for fail
  nonce: number, // parent value for events
|}

export type DBBlock = {
  id: string, // primary key, block number as string for now
  number: number,
  hash: string, // index
  parentHash: string,
  timestamp: number,
  transactions: string[],
}
