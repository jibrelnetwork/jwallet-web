// @flow

function push(data: any) {
  const dataLayer = window.dataLayer || []
  dataLayer.push(data)
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

function pushBackupWallet(walletType: WalletType) {
  push({
    event: 'BackupWallet',
    eventCategory: 'ProfileSettings',
    eventAction: 'BackupWallet',
    eventLabel: walletType,
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
  pushBackupWallet,
}
