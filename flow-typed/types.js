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
declare type AddressBalancePairs = Array<[Address, number]>
declare type LanguageCode = 'en' | 'ko' | 'zh' | 'ja'

declare type FormFields = { [string]: ?string }

declare type Reducers = { [string]: Reducer<any, any> }

declare type FSA = {|
  +type: string,
  +payload?: Object,
  +meta?: Object,
  +error?: boolean,
|}

declare type Next = FSA => FSA
declare type Dispatch = Object => Next
declare type GetState = () => State

declare type Store = {|
  +dispatch: Dispatch,
  +getState: GetState,
  +asyncReducers: Reducers,
  +replaceReducer: (Reducers) => void,
|}

declare type DerivationPath = {
  +path: string,
  +description: string,
}

declare type DerivationPaths = Array<DerivationPath>


declare type StrengthBarLevels = 0 | 1 | 2 | 3;

declare type WorkerError = {|
  +message: string,
|}

declare type HMR = {|
  +accept: (string, (void) => void) => void,
|}

/**
 * Networks
 */
declare type NetworkId = string
declare type NetworkTitleById = { [NetworkId]: string }

declare type Network = {
  +id: NetworkId,
  +title: string,
  +rpcaddr: string,
  +rpcport: string,
  +ssl: boolean,
  +isCustom: boolean,
}

declare type Networks = Array<Network>

declare type NetworksData = {
  +items: Networks,
  +invalidFields: FormFields,
  +customNetworkRPC: string,
  +isLoading: boolean,
  +isInitialised: boolean,
  +currentNetwork: ?NetworkId,
}

/**
 * Wallets
 */
declare type Password = string
declare type WalletId = string
declare type WalletType = 'address' | 'mnemonic'
declare type WalletCustomType = WalletType | 'bip32Xpub' | 'privateKey'
declare type WalletAction = 'edit' | 'backup' | 'change-password' | 'remove'

type EncryptedData = {|
  +data: string,
  +nonce: string,
|}

declare type WalletEncryptedData = {|
  +mnemonic: ?EncryptedData,
  +privateKey: ?EncryptedData,
|}

declare type ScryptParams = {|
  +N: number,
  +r: number,
  +p: number,
|}

declare type PasswordOptionsUser = {|
  +scryptParams?: ScryptParams,
  +salt?: string,
  +passwordHint?: string,
  +encryptionType?: string,
  +saltBytesCount?: number,
  +derivedKeyLength?: number,
|}

declare type MnemonicOptionsUser = {|
  +network?: ?Network,
  +passphrase?: ?string,
  +derivationPath?: string,
  +paddedMnemonicLength?: number,
|}

declare type PasswordOptions = {|
  +scryptParams: ScryptParams,
  +salt: string,
  +passwordHint: string,
  +encryptionType: string,
  +saltBytesCount: number,
  +derivedKeyLength: number,
|}

declare type MnemonicOptions = {|
  +network: Network,
  +passphrase: string,
  +derivationPath: string,
  +paddedMnemonicLength: number,
|}

declare type Wallet = {|
  +passwordOptions: ?PasswordOptions,
  +mnemonicOptions: ?MnemonicOptions,
  +encrypted: WalletEncryptedData,
  +id: string,
  +name: string,
  +type: WalletType,
  +address: ?string,
  +bip32XPublicKey: ?string,
  +customType: WalletCustomType,
  +addressIndex: ?number,
  +isReadOnly: boolean,
|}

declare type WalletUpdatedData = {|
  +passwordOptions?: PasswordOptions,
  +mnemonicOptions?: MnemonicOptions,
  +encrypted?: WalletEncryptedData,
  +name?: string,
  +bip32XPublicKey?: ?string,
  +customType?: ?WalletCustomType,
  +addressIndex?: ?number,
  +isReadOnly?: ?boolean,
|}

declare type WalletNewData = {|
  +passwordOptions: PasswordOptions,
  +mnemonicOptions: MnemonicOptions,
  +data: string,
  +name?: string,
|}

declare type WalletData = {|
  +passwordOptions: PasswordOptions,
  +mnemonicOptions: MnemonicOptions,
  +id: string,
  +data: string,
  +name: string,
|}

declare type WalletDecryptedData = {|
  +id: string,
  +name: string,
  +address: string,
  +mnemonic: string,
  +privateKey: string,
  +type: WalletCustomType,
  +readOnly: 'yes' | 'no',
  +bip32XPublicKey: string,
|}

declare type Wallets = Array<Wallet>

declare type PasswordResult = {|
  +score: number,
  +feedback: {|
    +warning: string,
    +suggestions: Array<string>,
  |},
|}

declare type WalletsState = {|
  +items: Wallets,
  +invalidFields: FormFields,
  +testPasswordData: ?EncryptedData,
  +passwordOptions: ?PasswordOptions,
  +mnemonicOptions: ?MnemonicOptions,
  +name: string,
  +password: string,
  +passwordHint: string,
  +passwordConfirm: string,
  +activeWalletId: ?WalletId,
  +toggledWalletId: ?WalletId,
  +isLoading: boolean,
|}

/**
 * Mnemonic addresses
 */
declare type MnemonicAddressesData = {
  +addresses: Addresses,
  +balances: Balances,
  +iteration: Index,
}

/**
 * Wallets Create
 */
declare type WalletsCreateNameStepIndex = 0
declare type WalletsCreatePasswordStepIndex = 1

declare type WalletsCreateStepIndex =
  WalletsCreateNameStepIndex |
  WalletsCreatePasswordStepIndex

declare type WalletsCreateSteps = {|
  +NAME: WalletsCreateNameStepIndex,
  +PASSWORD: WalletsCreatePasswordStepIndex,
|}

declare type WalletsCreateState = {|
  +currentStep: WalletsCreateStepIndex,
|}

/**
 * Wallets Import
 */
declare type WalletsImportNameStepIndex = 0
declare type WalletsImportDataStepIndex = 1
declare type WalletsImportPasswordStepIndex = 2

declare type WalletsImportStepIndex =
  WalletsImportNameStepIndex |
  WalletsImportDataStepIndex |
  WalletsImportPasswordStepIndex

declare type WalletsImportSteps = {|
  +NAME: WalletsImportNameStepIndex,
  +DATA: WalletsImportDataStepIndex,
  +PASSWORD: WalletsImportPasswordStepIndex,
|}

declare type WalletsImportState = {|
  +invalidFields: FormFields,
  +data: string,
  +passphrase: string,
  +derivationPath: string,
  +walletType: WalletCustomType,
  +currentStep: WalletsImportStepIndex,
|}

/**
 * Backup wallet
 */
declare type BackupWalletData = {
  +validFields: FormFields,
  +invalidFields: FormFields,
  +password: Password,
  +currentStep: Index,
}

/**
 * Change wallet password
 */
declare type ChangeWalletPasswordData = {
  +validFields: FormFields,
  +invalidFields: FormFields,
  +password: Password,
  +newPassword: Password,
  +confirmPassword: Password,
}

/**
 * Remove wallet
 */
declare type RemoveWalletData = {}

/**
 * Digital assets
 */
declare type DigitalAssetsListType = 'balance' | 'popular' | 'custom'

declare type DigitalAsset = {
  +address: Address,
  +symbol: string,
  +name: string,
  +decimals: Decimals,
  +isCustom: boolean,
  +isActive: boolean,
}

declare type DigitalAssetMainDataWithBalance = {
  +address: Address,
  +symbol: string,
  +name: string,
  +balance: number,
}

declare type DigitalAssets = Array<DigitalAsset>

declare type DigitalAssetsData = {
  +invalidFields: FormFields,
  +items: DigitalAssets,
  +foundAssets: Addresses,
  +balances: Balances,
  +searchQuery: string,
  +isInitialised: boolean,
  +isBalancesLoading: boolean,
  +currentAddress: ?Address,
}

/**
 * Custom digital asset
 */
declare type CustomAssetData = {
  +invalidFields: FormFields,
  +address: Address,
  +name: string,
  +symbol: string,
  +decimals: string,
}

/**
 * Transactions
 */
declare type Hash = string
declare type Hashes = Array<string>

declare type Transaction = {
  +type: string,
  +status: string,
  +transactionHash: Hash,
  +date: string,
  +contractAddress: Address,
  +fee: number,
  +amount: number,
  +timestamp: number,
  +from?: Address,
  +to?: Address,
  +address?: Address,
  +isJNT?: boolean,
}

declare type Transactions = Array<Transaction>
declare type TransactionsByPeriod = { [?string]: ?Transactions }

declare type TransactionsData = {
  +items: Transactions,
  +foundTransactions: Hashes,
  +invalidFields: FormFields,
  +searchQuery: string,
  +isLoading: boolean,
  +isBlockExplorerError: boolean,
  +activeTxHash: ?Hash,
}

/**
 * Funds
 */
declare type SendFundsData = {
  +invalidFields: FormFields,
  +alert: string,
  +amount: string,
  +assetAddress: string,
  +recipient: Address,
  +password: string,
  +currentStep: number,
  +gas?: string,
  +gasPrice?: string,
  +nonce?: string,
}

declare type ReceiveFundsData = {
  +invalidFields: FormFields,
  +assetAddress: Address,
  +amount: string,
  +isCopied: boolean,
}

declare type ConvertFundsData = {
  +invalidFields: FormFields,
  +fromAsset: string,
  +fromAmount: string,
  +toAsset: string,
  +toAmount: string,
}

declare type TXData = {
  to: Address,
  value: Bignumber,
  privateKey: string,
  contractAddress?: Address,
  gasPrice?: Bignumber,
  gasLimit?: Bignumber,
  nonce?: Bignumber,
}

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
  +wallets: WalletsState,
  +networks: NetworksData,
  +mnemonicAddresses: MnemonicAddressesData,
  +walletsCreate: WalletsCreateState,
  +walletsImport: WalletsImportState,
  +backupWallet: BackupWalletData,
  +changeWalletPassword: ChangeWalletPasswordData,
  +removeWallet: RemoveWalletData,
  +digitalAssets: DigitalAssetsData,
  +customAsset: CustomAssetData,
  +transactions: TransactionsData,
  +receiveFunds: ReceiveFundsData,
  +sendFunds: SendFundsData,
  +router: RouterData,
|}

declare type InitialState = {
  wallets?: WalletsState,
  networks?: NetworksData,
  mnemonicAddresses?: MnemonicAddressesData,
  walletsCreate?: WalletsCreateState,
  walletsImport?: WalletsImportState,
  backupWallet?: BackupWalletData,
  changeWalletPassword?: ChangeWalletPasswordData,
  removeWallet?: RemoveWalletData,
  digitalAssets?: DigitalAssetsData,
  customAsset?: CustomAssetData,
  transactions?: TransactionsData,
  receiveFunds?: ReceiveFundsData,
  sendFunds?: SendFundsData,
}

/**
 * Errors
 */
declare type InvalidFieldError = {
  +fieldName: string,
  +message: string,
}

/* eslint-enable no-unused-vars */
