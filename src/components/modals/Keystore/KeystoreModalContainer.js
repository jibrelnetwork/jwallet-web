import { connect } from 'react-redux'

import {
  setCurrentKeystoreAccount,
  removeKeystoreAccount,
  setKeystoreAccountName,
  setKeystoreAccountDerivationPath,
  setKeystoreAccountAddress,
  getKeystoreAddressesFromMnemonic,
  sortAccounts,
  openKeystoreModal,
  closeKeystoreModal,
  openImportKeyModal,
  openDerivationPathModal,
  setEditAccountName,
  setNewAccountName,
} from 'routes/JWallet/modules/keystore'

import { openBackupKeystoreModal } from 'routes/JWallet/modules/modals/backupKeystore'
import { openClearKeystoreModal } from 'routes/JWallet/modules/modals/clearKeystore'
import { openNewKeystoreAccountModal } from 'routes/JWallet/modules/modals/newKeystoreAccount'
import { openNewKeystorePasswordModal } from 'routes/JWallet/modules/modals/newKeystorePassword'

import KeystoreModal from './KeystoreModal'

const mapStateToProps = state => ({
  keystore: state.keystore,
  isOpen: state.keystore.isKeystoreModalOpen,
})

const mapDispatchToProps = {
  setCurrentKeystoreAccount,
  removeKeystoreAccount,
  setKeystoreAccountName,
  setKeystoreAccountDerivationPath,
  setKeystoreAccountAddress,
  getKeystoreAddressesFromMnemonic,
  sortAccounts,
  openKeystoreModal,
  closeKeystoreModal,
  openImportKeyModal,
  openDerivationPathModal,
  setEditAccountName,
  setNewAccountName,
  openBackupKeystoreModal,
  openClearKeystoreModal,
  openNewKeystoreAccountModal,
  openNewKeystorePasswordModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(KeystoreModal)
