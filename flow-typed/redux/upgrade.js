// @flow

declare type UpgradeMnemonicFormFieldValues = {|
  +password: string,
  +mnemonic: string,
  +passphrase: string,
  +derivationPath: string,
|}

declare type UpgradePrivateKeyFormFieldValues = {|
  +password: string,
  +privateKey: string,
|}

declare type UpgradeState = {
  isLoading: boolean,
  isInvalidPassword: boolean,
}
