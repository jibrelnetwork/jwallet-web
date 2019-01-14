// @flow

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
  +network?: ?number | string,
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
  +network: number | string,
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

declare type PasswordStatus = 'red' | 'orange' | 'yellow' | 'green'

declare type PasswordResult = {|
  +score: number,
  +feedback: {|
    +warning: string,
    +suggestions: Array<string>,
  |},
|}

declare type WalletsPersist = {|
  +items: Wallets,
  +testPasswordData: ?EncryptedData,
  +passwordOptions: ?PasswordOptions,
  +mnemonicOptions: ?MnemonicOptions,
  +activeWalletId: ?WalletId,
|}

declare type WalletsState = {|
  +persist: WalletsPersist,
  +invalidFields: FormFields,
  +name: string,
  +password: string,
  +passwordHint: string,
  +passwordConfirm: string,
  +isLoading: boolean,
|}

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
  +walletType: ?WalletCustomType,
  +currentStep: WalletsImportStepIndex,
|}

/**
 * Wallets backup
 */
declare type WalletsBackupPasswordStepIndex = 0
declare type WalletsBackupPrivateStepIndex = 1

declare type WalletsBackupStepIndex =
  WalletsBackupPasswordStepIndex |
  WalletsBackupPrivateStepIndex

declare type WalletsBackupSteps = {|
  +PASSWORD: WalletsBackupPasswordStepIndex,
  +PRIVATE: WalletsBackupPrivateStepIndex,
|}

declare type WalletsBackupState = {|
  +data: string,
  +currentStep: WalletsBackupStepIndex,
|}

/**
 * Wallets addresses
 */
declare type WalletsBalances = { [Address]: number }

declare type WalletsAddressesPersist = {|
  +addressNames: AddressNames,
|}

declare type WalletsAddressesState = {|
  +persist: WalletsAddressesPersist,
  +addresses: Address[],
  +balances: WalletsBalances,
  +iteration: Index,
  +isLoading: boolean,
|}

/**
 * Wallets rename address
 */
declare type WalletsRenameAddressState ={|
  +name: string,
  +invalidFields: FormFields,
|}

declare type HDPublicKey = {|
  +toString: () => string,
  +derive: (number) => HDPublicKey,
  +xpubkey: string,
  +publicKey: {|
    +toString: () => string,
  |},
|}

declare type HDPrivateKey = {|
  +toString: () => string,
  +isValidPath: (string) => boolean,
  +derive: (string | number) => HDPrivateKey,
  +xpubkey: string,
  +xprivkey: string,
  +hdPublicKey: HDPublicKey,
  +privateKey: {|
    +toString: () => string,
  |},
|}

declare type KeyPair = {|
  +getPublic: (boolean, 'hex') => string,
  +_importPrivate: (string, 'hex') => void,
|}

declare type KeyWordArray = {|
  +words: number[],
  +sigBytes: number,
  +toString: (KeyWordArrayEncoder) => string,
|}

declare type KeyWordArrayEncoder = {|
  +parse: (string) => KeyWordArray,
  +stringify: (KeyWordArray) => string,
|}
