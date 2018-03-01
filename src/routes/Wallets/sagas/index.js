import * as wallets from './wallets'
import addresses from '../routes/Addresses/sagas'
import createWallet from '../routes/CreateWallet/sagas'
import importWallet from '../routes/ImportWallet/sagas'
import editWallet from '../routes/EditWallet/sagas'
import backupWallet from '../routes/BackupWallet/sagas'
import changeWalletPassword from '../routes/ChangeWalletPassword/sagas'
import removeWallet from '../routes/RemoveWallet/sagas'

export default {
  ...wallets,
  ...addresses,
  ...createWallet,
  ...importWallet,
  ...editWallet,
  ...backupWallet,
  ...changeWalletPassword,
  ...removeWallet,
}
