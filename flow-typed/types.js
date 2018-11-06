// @flow

/* eslint-disable no-unused-vars */

import type { Reducer } from 'redux'
import type { Saga } from 'redux-saga'
import type { Persistor } from 'redux-persist/lib/types'

/**
 * General
 */
declare type Index = number
declare type EthereumAddress = 'Ethereum'
declare type Address = string | EthereumAddress
declare type Addresses = Array<Address>
declare type Bignumber = any
declare type Decimals = number
declare type Balances = { [Address]: number }
declare type AddressNames = { [Address]: string }
declare type AddressBalancePairs = Array<[Address, number]>
declare type LanguageCode = 'en' | 'ko' | 'zh' | 'ja'

declare type FormFields = { [string]: ?string }

declare type Reducers = { [string]: Reducer<any, any> }

declare type DerivationPath = {
  +path: string,
  +description: string,
}

declare type DerivationPaths = Array<DerivationPath>

declare type WorkerError = {|
  +message: string,
|}

declare type HMR = {|
  +accept: (string, (void) => void) => void,
|}

/**
 * Router
 */
declare type RouterData = {
  +locationBeforeTransitions: {
    +pathname: string,
  },
}

/**
 * Entire state
 */
declare type State = {|
  // wallets
  +wallets: WalletsState,
  +walletsCreate: WalletsCreateState,
  +walletsImport: WalletsImportState,
  +walletsBackup: WalletsBackupState,
  +walletsAddresses: WalletsAddressesState,
  +walletsRenameAddress: WalletsRenameAddressState,
  // networks
  +networks: NetworksData,
  // digitalAssets
  +digitalAssets: DigitalAssetsData,
  +customAsset: CustomAssetState,
  // transactions
  +transactions: TransactionsData,
  // funds
  +receiveFunds: ReceiveFundsData,
  +sendFunds: SendFundsData,
  // router
  +router: RouterData,
|}

/**
 * Errors
 */
declare type InvalidFieldError = {
  +fieldName: string,
  +message: string,
}

/* eslint-enable no-unused-vars */
