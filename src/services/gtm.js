// @flow

function push(data: any) {
  const dataLayer = window.dataLayer || []

  /* eslint-disable fp/no-mutating-methods */
  dataLayer.push(data)
  /* eslint-enable fp/no-mutating-methods */
}

/**
 * eventAction value is one of:
 * Start/GenerateMnemonic/SaveMnemonic/ConfirmMnemonic/EnterPassword/CreateSuccess
 */
function pushCreateAccount(eventLabel: string, isInitialised: boolean = false) {
  push({
    event: 'RegistrationProcess',
    eventCategory: 'CreateNewAccount',
    eventAction: isInitialised ? 'CreateNew' : 'CreateFirst',
    eventLabel,
  })
}

/**
 * eventLabel value is one of Start/SetData/ChangeDerivationPath/EnterPassword/Success
 * accountType value is one of null/address/privateKey/bip32Xpub/mnemonic
 */
function pushImportAccount(
  eventLabel: string,
  accountType: string | void,
  isInitialised: boolean = false,
) {
  push({
    event: 'RegistrationProcess',
    eventCategory: 'CreateNewAccount',
    eventAction: isInitialised ? 'ImportNew' : 'ImportFirst',
    eventLabel,
    accountType,
  })
}

function pushSetDerivationPathSuccess() {
  push({
    event: 'SetDerivationPathSuccess',
    eventCategory: 'ProfileSettings',
    eventAction: 'SetDerivationPath',
    eventLabel: 'SetDerivationPathSuccess',
  })
}

/**
 * accountType value is one of address/privateKey/bip32Xpub/mnemonic
 */
function pushRemoveAccountSuccess(accountType: string) {
  push({
    event: 'RemoveAccountSuccess',
    eventCategory: 'ProfileSettings',
    eventAction: 'Remove',
    eventLabel: 'RemoveAccountSuccess',
    accountType,
  })
}

/**
 * eventLabel value is code of digital asset (e.g. ETH, JNT)
 * accountType value is one of privateKey/mnemonic
 */
function pushSendFundsSuccess(eventLabel: string, accountType: string) {
  push({
    event: 'Transaction',
    eventCategory: 'TransactionInWallet',
    eventAction: 'SendFundsSuccess',
    eventLabel,
    accountType,
  })
}

/**
 * eventCategory value is one of ReceiveFunds/QRCodeGenerate
 * accountType value is one of address/privateKey/bip32Xpub/mnemonic
 */
function pushReceiveFunds(eventCategory: string, accountType: string) {
  push({
    event: 'ReceiveFundsProcess',
    eventCategory,
    eventAction: 'StartProcess',
    accountType,
  })
}

function pushAddCustomToken() {
  push({
    event: 'AddCustom',
    eventCategory: 'DigitalAsset',
    eventAction: 'AddCustomToken',
    eventLabel: 'Success',
  })
}

/**
 * eventLabel value is one of Open/Success
 */
function pushBackupKeystore(eventLabel: string) {
  push({
    event: 'BackupKeystore',
    eventCategory: 'ProfileSettings',
    eventAction: 'BackupKeystore',
    eventLabel,
  })
}

function pushChangePassword() {
  push({
    event: 'ChangePassword',
    eventCategory: 'ProfileSettings',
    eventAction: 'ChangePassword',
    eventLabel: 'Success',
  })
}

function pushClearKeystore() {
  push({
    event: 'DeleteKeystore',
    eventCategory: 'ProfileSettings',
    eventAction: 'DeleteKeystore',
    eventLabel: 'Success',
  })
}

function pushAddCustomNetwork() {
  push({
    event: 'AddCustom',
    eventCategory: 'Network',
    eventAction: 'AddCustomNetwork',
    eventLabel: 'Success',
  })
}

/**
 * eventLabel value is a current language
 */
function pushChangeLanguage(eventLabel: string) {
  push({
    event: 'ChangeLanguage',
    eventCategory: 'ProfileSettings',
    eventAction: 'ChangeLanguage',
    eventLabel,
  })
}

/**
 * Wallets
 */
function pushSetActiveWallet(walletType: ?WalletType) {
  push({
    event: 'SetActiveWallet',
    eventCategory: 'Wallet',
    eventAction: 'SetActiveWallet',
    walletType,
  })
}

function pushCreateWallet(step: string) {
  push({
    event: 'CreateWallet',
    eventCategory: 'Wallet',
    eventAction: 'CreateWallet',
    eventLabel: step,
  })
}

function pushImportWallet(step: string, walletType: WalletType) {
  push({
    event: 'ImportWallet',
    eventCategory: 'Wallet',
    eventAction: 'ImportWallet',
    eventLabel: step,
    walletType,
  })
}

function pushEditWallet(step: string, walletType: WalletType) {
  push({
    event: 'EditWallet',
    eventCategory: 'Wallet',
    eventAction: 'EditWallet',
    eventLabel: step,
    walletType,
  })
}

function pushBackupWallet(walletType: WalletType) {
  push({
    event: 'BackupWallet',
    eventCategory: 'Wallet',
    eventAction: 'BackupWallet',
    walletType,
  })
}

function pushChangeWalletPassword(walletType: WalletType) {
  push({
    event: 'ChangeWalletPassword',
    eventCategory: 'Wallet',
    eventAction: 'ChangeWalletPassword',
    walletType,
  })
}

function pushRemoveWallet(walletType: WalletType) {
  push({
    event: 'RemoveWallet',
    eventCategory: 'Wallet',
    eventAction: 'RemoveWallet',
    walletType,
  })
}

/**
 * Digital Assets
 */
function pushAddCustomAsset() {
  push({
    event: 'AddCustom',
    eventCategory: 'DigitalAsset',
    eventAction: 'AddCustomAsset',
    eventLabel: 'Success',
  })
}

/**
 * Funds
 */
function pushSendFunds() {
  push({
    event: 'SendFunds',
    eventCategory: 'Transaction',
    eventAction: 'SendFundsSuccess',
  })
}

export default {
  pushCreateAccount,
  pushImportAccount,
  pushSetDerivationPathSuccess,
  pushRemoveAccountSuccess,
  pushSendFundsSuccess,
  pushReceiveFunds,
  pushAddCustomToken,
  pushBackupKeystore,
  pushChangePassword,
  pushClearKeystore,
  pushAddCustomNetwork,
  pushChangeLanguage,
  // wallets
  pushSetActiveWallet,
  pushCreateWallet,
  pushImportWallet,
  pushEditWallet,
  pushBackupWallet,
  pushChangeWalletPassword,
  pushRemoveWallet,
  // digital assets
  pushAddCustomAsset,
  // funds
  pushSendFunds,
}
