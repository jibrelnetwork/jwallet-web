import type { Saga } from 'redux-saga'

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

declare type FormFields = { [string]: ?string }

declare type FSA = {
  +type: string,
  +payload: Object,
  +meta: Object,
  +error: boolean,
}

declare type Next = FSA => FSA
declare type Dispatch = Object => Next
declare type GetState = () => State

declare type Store = {
  dispatch: Dispatch,
  getState: GetState,
}

/**
 * Digital assets
 */
declare type DigitalAsset = {
  +address: Address,
  +symbol: string,
  +name: string,
  +decimals: Decimals,
  +isCustom: boolean,
  +isActive: boolean,
}

declare type DigitalAssets = Array<DigitalAsset>

declare type DigitalAssetsData = {
  +invalidFields: FormFields,
  +items: DigitalAssets,
  +foundAssets: Addresses,
  +balances: Balances,
  +searchQuery: string,
  +currentAddress: ?Address,
  +isBalancesLoading: boolean,
}

/**
 * Custom digital asset
 */
declare type CustomAssetData = {
  +address: Address,
  +symbol: string,
  +name: string,
  +decimals: string,
}

declare type AddCustomAssetData = {
  +invalidFields: FormFields,
  +address: Address,
  +name: string,
  +symbol: string,
  +decimals: string,
}

/**
 * Wallets
 */
declare type WalletId = string
declare type WalletAction = 'edit' | 'backup' | 'change-password' | 'remove'
declare type WalletType = 'mnemonic' | 'bip32Xpub' | 'privateKey' | 'address'
declare type Password = string

declare type Wallet = {
  +id: WalletId,
  +type: WalletType,
  +name: string,
  +customType: WalletType,
  +isReadOnly: boolean,
  +salt: ?string,
  +address: ?Address,
  +derivationPath: ?string,
  +bip32XPublicKey: ?string,
  +addressIndex: ?Index,
  +encrypted: ?{
    +privateKey: ?string,
    +mnemonic: ?string,
  +},
}

declare type Wallets = Array<Wallet>

declare type WalletsData = {
  +invalidFields: FormFields,
  +items: Wallets,
  +password: Password,
  +toggledWalletId: ?WalletId,
  +showActionsWalletId: ?WalletId,
  +activeWalletId: ?WalletId,
  +walletAction: ?WalletAction,
}

declare type DecryptedWalletData = {
  +id: WalletId,
  +type: WalletType,
  +name: string,
  +readOnly: 'yes' | 'no',
  +address?: Address,
  +bip32XPublicKey?: string,
  +privateKey?: string,
  +mnemonic?: string,
}

/**
 * Mnemonic addresses
 */
declare type MnemonicAddressesData = {
  +addresses: Addresses,
  +balances: Balances,
  +iteration: Index,
}

/**
 * Create wallet
 */
declare type CreateWalletData = {
  +validFields: FormFields,
  +invalidFields: FormFields,
  +name: string,
  +mnemonic: string,
  +mnemonicConfirm: string,
  +password: Password,
  +passwordConfirm: Password,
  +currentStep: Index,
}

/**
 * Import wallet
 */
declare type ImportWalletData = {
  +validFields: FormFields,
  +invalidFields: FormFields,
  +name: string,
  +data: string,
  +password: Password,
  +passwordConfirm: Password,
  +knownDerivationPath: string,
  +customDerivationPath: string,
  +currentStep: Index,
  +totalSteps: Index,
  +walletType?: WalletType,
}

/**
 * Edit wallet
 */
declare type EditWalletData = {
  +validFields: FormFields,
  +invalidFields: FormFields,
  +name: string,
  +password: Password,
  +knownDerivationPath: string,
  +customDerivationPath: string,
  +currentStep: Index,
  +walletType?: WalletType,
}

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
 * Networks
 */
declare type NetworkId = number

declare type Network = {
  title: string,
  rpcaddr: string,
  rpcport: string,
  id: NetworkId,
  ssl: boolean,
  isCustom: boolean,
}

declare type Networks = Array<Network>

declare type NetworksData = {
  +items: Networks,
  +customNetworkRpc: string,
  +currentNetworkIndex: Index,
  +isLoading: boolean,
}

/**
 * Transactions
 */
declare type Hash = string

declare type Transaction = {
  type: string,
  status: string,
  transactionHash: Hash,
  date: string,
  contractAddress: Address,
  fee: number,
  amount: number,
  timestamp: number,
  from?: Address,
  to?: Address,
  address?: Address,
  isJNT?: boolean,
}

declare type Transactions = Array<Transaction>

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
 * Entire state
 */
declare type State = {
  +networks: NetworksData,
  +currencies: DigitalAssetsData,
  +keystore: KeystoreData,
  +receiveFunds: ReceiveFundsData,
  +sendFunds: SendFundsData,
  +digitalAssets: DigitalAssetsData,
  +addCustomAsset: AddCustomAssetData,
  +wallets: WalletsData,
  +mnemonicAddresses: MnemonicAddressesData,
  +createWallet: CreateWalletData,
  +importWallet: ImportWalletData,
  +editWallet: EditWalletData,
  +backupWallet: BackupWalletData,
  +changeWalletPassword: ChangeWalletPasswordData,
  +removeWallet: RemoveWalletData,
}

/**
 * Errors
 */
declare type InvalidFieldError = {
  fieldName: string,
  message: string,
}

/**
 * Deprecated
 * TODO: remove types below
 */

/**
 * Keystore
 */
declare type AccountId = string

declare type Account = {
  encrypted: {
    privateKey: string,
    mnemonic: string,
  },
  id: string,
  type: string,
  name: string,
  customType: WalletType,
  accountName: string,
  isActive: boolean,
  isReadOnly: boolean,
  derivationPath?: string,
  bip32XPublicKey?: string,
  addressIndex?: Index,
}

declare type Accounts = Array<Account>

declare type NewAccountData = {
  type: string,
  isReadOnly: boolean,
  mnemonic?: string,
  bip32XPublicKey?: string,
  privateKey?: string,
  address?: string,
}

declare type KeystoreData = {
  currentAccount: Account,
  newAccountNameData: {
    accountId: AccountId,
    newAccountName: string,
  },
  addressesFromMnemonic: {
    items: Addresses,
    currentIteration: number,
  },
  accounts: Wallets,
  sortField: string,
  sortDirection: string,
  isLoading: boolean,
  isCreating: boolean,
  isOpen: boolean,
}
