function push(data) {
  const dataLayer = window.dataLayer || []
  dataLayer.push(data)
}

/**
 * eventAction value is one of:
 * Start/GenerateMnemonic/SaveMnemonic/ConfirmMnemonic/EnterPassword/CreateSuccess
 */
function pushCreateAccount(eventAction) {
  push({
    event: 'Account',
    eventCategory: 'New',
    eventAction,
  })
}

/**
 * eventAction value is one of Start/SetData/ChangeDerivationPath/EnterPassword/ImportSuccess
 * eventLabel value is one of address/privateKey/bip32Xpub/mnemonic
 */
function pushImportAccount(eventAction, eventLabel) {
  push({
    event: 'Account',
    eventCategory: 'Import',
    eventAction,
    eventLabel,
  })
}

function pushSetDerivationPathSuccess() {
  push({
    event: 'Account',
    eventCategory: 'DerivationPath',
    eventAction: 'SetDerivationPathSuccess',
  })
}

function pushRemoveAccountSuccess() {
  push({
    event: 'Account',
    eventCategory: 'Remove',
    eventAction: 'RemoveAccountSuccess',
  })
}

/**
 * eventLabel value is code of digital asset (e.g. ETH, JNT)
 */
function pushSendFundsSuccess(eventLabel) {
  push({
    event: 'Transaction',
    eventCategory: 'Send',
    eventAction: 'SendFundsSuccess',
    eventLabel,
  })
}

function pushGenerateQRCode() {
  push({
    event: 'ReceiveFunds',
    eventCategory: 'QRCode',
    eventAction: 'GenerateQRCode',
  })
}

function pushAddCustomToken() {
  push({
    event: 'DigitalAsset',
    eventCategory: 'CustomToken',
    eventAction: 'AddCustomToken',
  })
}

function pushBackupKeystore() {
  push({
    event: 'Keystore',
    eventCategory: 'Backup',
    eventAction: 'BackupKeystore',
  })
}

function pushChangePassword() {
  push({
    event: 'Keystore',
    eventCategory: 'Password',
    eventAction: 'ChangePassword',
  })
}

function pushClearKeystore() {
  push({
    event: 'Keystore',
    eventCategory: 'Remove',
    eventAction: 'ClearKeystore',
  })
}

function pushAddCustomNetwork() {
  push({
    event: 'Network',
    eventCategory: 'CustomNetwork',
    eventAction: 'AddCustomNetwork',
  })
}

function pushChangeLanguage() {
  push({
    event: 'Language',
    eventCategory: 'ChangeLanguage',
    eventAction: 'ChangeLanguage',
  })
}

export default {
  pushCreateAccount,
  pushImportAccount,
  pushSetDerivationPathSuccess,
  pushRemoveAccountSuccess,
  pushSendFundsSuccess,
  pushGenerateQRCode,
  pushAddCustomToken,
  pushBackupKeystore,
  pushChangePassword,
  pushClearKeystore,
  pushAddCustomNetwork,
  pushChangeLanguage,
}
