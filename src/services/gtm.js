function push(data) {
  const dataLayer = window.dataLayer || []
  dataLayer.push(data)
}

/**
 * eventAction value is one of:
 * GenerateMnemonic/SaveMnemonic/ConfirmMnemonic/EnterPassword/CreateSuccess
 */
function pushCreateAccount(eventLabel) {
  push({
    event: 'RegistrationProcess',
    eventCategory: 'CreateNewWallet',
    eventAction: 'CreateNew',
    eventLabel,
  })
}

/**
 * eventLabel value is one of Start/SetData/ChangeDerivationPath/EnterPassword/Success
 * eventValue value is one of address/privateKey/bip32Xpub/mnemonic
 */
function pushImportAccount(eventLabel, eventValue) {
  push({
    event: 'RegistrationProcess',
    eventCategory: 'CreateNewWallet',
    eventAction: 'ImportFirstWallet',
    eventLabel,
    eventValue,
  })
}

/*
function pushSetDerivationPathSuccess() {
  push({
    event: 'Account',
    eventCategory: 'DerivationPath',
    eventAction: 'SetDerivationPathSuccess',
  })
}
*/

function pushRemoveAccountSuccess() {
  push({
    event: 'RemoveAccountSuccess',
    eventCategory: 'ProfileSettings',
    eventAction: 'Remove',
    eventLabel: 'RemoveAccountSuccess',
  })
}

/**
 * eventLabel value is code of digital asset (e.g. ETH, JNT)
 */
function pushSendFundsSuccess(eventLabel) {
  push({
    event: 'Transaction',
    eventCategory: 'TransactionInWallet',
    eventAction: 'SendFundsSuccess',
    eventLabel,
  })
}

/**
 * eventCategory value is one of ReceiveFunds/QRCodeGenerate
 */
function pushReceiveFunds(eventCategory) {
  push({
    event: 'ReceiveFundsProcess',
    eventCategory,
    eventAction: 'StartProcess',
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
function pushBackupKeystore(eventLabel) {
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
function pushChangeLanguage(eventLabel) {
  push({
    event: 'ChangeLanguage',
    eventCategory: 'ProfileSettings',
    eventAction: 'ChangeLanguage',
    eventLabel,
  })
}

export default {
  pushCreateAccount,
  pushImportAccount,
  /*
  pushSetDerivationPathSuccess,
  pushRemoveAccountSuccess,
  */
  pushSendFundsSuccess,
  pushReceiveFunds,
  pushAddCustomToken,
  pushBackupKeystore,
  pushChangePassword,
  pushClearKeystore,
  pushAddCustomNetwork,
  pushChangeLanguage,
}
