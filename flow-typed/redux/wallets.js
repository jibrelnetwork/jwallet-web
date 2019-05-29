// @flow strict

declare type Password = string
declare type WalletId = string
declare type WalletType = 'address' | 'mnemonic'
declare type WalletCustomType = WalletType | 'xprv' | 'xpub' | 'privateKey'

type EncryptedData = {|
  +data: string,
  +nonce: string,
|}

declare type WalletEncryptedData = {|
  +xprv: ?EncryptedData,
  +mnemonic: ?EncryptedData,
  +passphrase: ?EncryptedData,
  +privateKey: ?EncryptedData,
|}

declare type ScryptParams = {|
  +N: number,
  +r: number,
  +p: number,
|}

declare type WalletCreatedBlockNumber = { [NetworkName]: ?number }

declare type Wallet = {|
  +encrypted: WalletEncryptedData,
  +createdBlockNumber: ?WalletCreatedBlockNumber,
  +id: string,
  +name: string,
  +xpub: ?string,
  +type: WalletType,
  +address: ?string,
  +derivationPath: ?string,
  +customType: WalletCustomType,
  +orderIndex: number,
  +addressIndex: ?number,
  +isReadOnly: boolean,
  +isSimplified: ?boolean,
|}

declare type WalletUpdatedData = {|
  +encrypted?: WalletEncryptedData,
  +name?: string,
  +xpub?: ?string,
  +derivationPath?: string,
  +customType?: ?WalletCustomType,
  +addressIndex?: ?number,
  +isReadOnly?: ?boolean,
  +isSimplified?: ?boolean,
|}

declare type Wallets = Wallet[]

declare type PasswordResult = {|
  +score: number,
  +feedback: {|
    +warning: string,
    +suggestions: string[],
  |},
|}

declare type WalletsPersist = {|
  +items: Wallets,
  +activeWalletId: ?WalletId,
|}

declare type WalletsState = {|
  +persist: WalletsPersist,
|}

/**
 * Wallets Create
 */
declare type WalletsCreateState = {|
  +createdBlockNumber: ?WalletCreatedBlockNumber,
  +isBlocksLoading: boolean,
|}

/**
 * Wallets addresses
 */
declare type WalletsBalances = { [OwnerAddress]: ?string }

declare type WalletsAddressesPersist = {|
  +addressNames: AddressNames,
|}

declare type WalletsAddressesState = {|
  +persist: WalletsAddressesPersist,
  +addresses: OwnerAddress[],
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
