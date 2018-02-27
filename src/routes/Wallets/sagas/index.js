import createWallet from '../routes/CreateWallet/sagas'
import importWallet from '../routes/ImportWallet/sagas'
import editKey from '../routes/EditKey/sagas'
import backupWallet from '../routes/BackupWallet/sagas'
import changeWalletPassword from '../routes/ChangeWalletPassword/sagas'
import removeWallet from '../routes/RemoveWallet/sagas'

export default {
  ...createWallet,
  ...importWallet,
  ...editKey,
  ...backupWallet,
  ...changeWalletPassword,
  ...removeWallet,
}
