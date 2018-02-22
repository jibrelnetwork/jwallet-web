import createKey from '../routes/CreateKey/sagas'
import importKey from '../routes/ImportKey/sagas'
import editKey from '../routes/EditKey/sagas'
import backupWallet from '../routes/BackupWallet/sagas'
import changeWalletPassword from '../routes/ChangeWalletPassword/sagas'
import clearKey from '../routes/ClearKey/sagas'

export default {
  ...createKey,
  ...importKey,
  ...editKey,
  ...backupWallet,
  ...changeWalletPassword,
  ...clearKey,
}
