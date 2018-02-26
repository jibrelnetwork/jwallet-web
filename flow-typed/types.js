import type { Saga } from 'redux-saga'

/**
 * General
 */

declare type Index = number
declare type Address = string
declare type Addresses = Array<Address>
declare type Bignumber = any

declare type FSA = {
  type: string,
  payload: Object,
  meta: Object,
  error: boolean,
}

declare type Dispatch = Object => Next
declare type Next = FSA => FSA

/**
 * Digital Assets
 */

declare type DigitalAsset = {
  address: Address,
  symbol: string,
  name: string,
  decimals: number,
  isAuthRequired: boolean,
  isLicensed: boolean,
  isCustom: boolean,
  isActive: boolean,
  isCurrent?: boolean,
}

declare type DigitalAssets = Array<DigitalAsset>

declare type CustomAssetData = {
  address: Address,
  symbol: string,
  name: string,
  decimals: string,
}

declare type DigitalAssetsData = {
  items: DigitalAssets,
  foundItemsSymbols: Array<string>,
  balances: any,
  sortField: string,
  sortDirection: string,
  searchQuery: string,
  currentAddress: Address,
  isLoading: boolean,
  isActiveAll: boolean,
}

/**
 * Keystore
 */

declare type WalletType = 'mnemonic' | 'bip32Xpub' | 'privateKey' | 'address'
declare type WalletId = string
declare type AccountId = string
declare type Password = string

declare type Account = {
  encrypted: {
    privateKey: string,
    mnemonic: string,
  },
  id: string,
  type: string,
  name: string,
  customType: string,
  accountName: string,
  isActive: boolean,
  isReadOnly: boolean,
  derivationPath?: string,
  bip32XPublicKey?: string,
  addressIndex?: Index,
}

declare type Wallet = {
  id: WalletId,
  type: WalletType,
  name: string,
  customType: WalletType,
  isReadOnly: boolean,
  salt?: string,
  address?: Address,
  derivationPath?: string,
  bip32XPublicKey?: string,
  addressIndex?: Index,
  encrypted?: {
    privateKey?: string,
    mnemonic?: string,
  },
}

declare type Wallets = Array<Wallet>
declare type Accounts = Array<Account>

declare type DecryptedWalletData = {
  id: WalletId,
  type: WalletType,
  name: string,
  readOnly: 'yes' | 'no',
  address?: Address,
  bip32XPublicKey?: string,
  privateKey?: string,
  mnemonic?: string,
}

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
  accounts: Accounts,
  sortField: string,
  sortDirection: string,
  isLoading: boolean,
  isCreating: boolean,
  isOpen: boolean,
}

/**
 * Create key
 */

declare type CreateKeyData = {
  validFields: Object,
  invalidFields: Object,
  mnemonic: string,
  mnemonicConfirm: string,
  name: string,
  password: Password,
  passwordConfirm: Password,
  currentStep: Index,
  totalSteps: Index,
}

/**
 * Import key
 */

declare type ImportKeyData = {
  validFields: Object,
  invalidFields: Object,
  data: string,
  name: string,
  password: Password,
  passwordConfirm: Password,
  knownDerivationPath: string,
  customDerivationPath: string,
  currentStep: Index,
  totalSteps: Index,
  isMnemonic: boolean,
}

/**
 * Edit key
 */

declare type EditKeyData = {
  validFields: Object,
  invalidFields: Object,
  keyId: string,
  name: string,
  password: Password,
  knownDerivationPath: string,
  customDerivationPath: string,
  currentStep: Index,
  isMnemonic: boolean,
}

/**
 * Backup wallet
 */

declare type BackupWalletData = {
  validFields: Object,
  invalidFields: Object,
  password: Password,
}

/**
 * Change wallet password
 */

declare type ChangeWalletPasswordData = {
  validFields: Object,
  invalidFields: Object,
  password: Password,
  newPassword: Password,
  confirmPassword: Password,
}

/**
 * Remove wallet
 */

declare type RemoveWalletData = {}

/**
 * Networks
 */

declare type Network = {
  title: string,
  rpcaddr: string,
  rpcport: string,
  id: Index,
  ssl: boolean,
  isCustom: boolean,
}

declare type Networks = Array<Network>

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
  invalidFields: any,
  alert: string,
  amount: string,
  password: string,
  currentStep: number,
  gas?: string,
  gasPrice?: string,
  nonce?: string,
  /**
   * symbol & recipient should be replaced by assetAddress & recipientAdress
   */
  symbol: string,
  recipient: Address,
}

declare type ReceiveFundsData = {
  invalidFields: any,
  amount: string,
  /**
   * symbol should be replaced by assetAddress
   */
  symbol: string,
}

/**
 * Entire state
 */

declare type State = {
  currencies: DigitalAssetsData,
  createKey: CreateKeyData,
  editKey: EditKeyData,
  importKey: ImportKeyData,
  keystore: KeystoreData,
  receiveFunds: ReceiveFundsData,
  sendFunds: SendFundsData,
  backupWallet: BackupWalletData,
  changeWalletPassword: ChangeWalletPasswordData,
  removeWallet: RemoveWalletData,
}

/**
 * Errors
 */

declare type InvalidFieldError = {
  fieldName: string,
  message: string,
}
