import createWallet from '../routes/CreateWallet/sagas'
import importKey from '../routes/ImportKey/sagas'
import editKey from '../routes/EditKey/sagas'
import backupWallet from '../routes/BackupWallet/sagas'
import changeWalletPassword from '../routes/ChangeWalletPassword/sagas'
import removeWallet from '../routes/RemoveWallet/sagas'

export default {
  ...createWallet,
  ...importKey,
  ...editKey,
  ...backupWallet,
  ...changeWalletPassword,
  ...removeWallet,
}
