import { connect } from 'react-redux'

import {
  setCurrentKeystoreAccount,
  removeKeystoreAccount,
  setKeystoreAccountName,
  setKeystoreAccountDerivationPath,
  setKeystoreAccountAddressIndex,
  getKeystoreAddressesFromMnemonic,
  sortAccounts,
  openKeystoreModal,
  closeKeystoreModal,
  setEditAccountName,
  setNewAccountName,
} from 'routes/JWallet/modules/keystore'

import { openBackupKeystoreModal } from 'routes/JWallet/modules/modals/backupKeystore'
import { openClearKeystoreModal } from 'routes/JWallet/modules/modals/clearKeystore'
import { openImportKeystoreAccountModal } from 'routes/JWallet/modules/modals/importKeystoreAccount'
import { openNewDerivationPathModal } from 'routes/JWallet/modules/modals/newDerivationPath'
import { openNewKeystoreAccountModal } from 'routes/JWallet/modules/modals/newKeystoreAccount'
import { openNewKeystorePasswordModal } from 'routes/JWallet/modules/modals/newKeystorePassword'

import KeystoreModal from './KeystoreModal'

const mapStateToProps = state => state.keystore

const mapDispatchToProps = {
  setCurrentKeystoreAccount,
  removeKeystoreAccount,
  setKeystoreAccountName,
  setKeystoreAccountDerivationPath,
  setKeystoreAccountAddressIndex,
  getKeystoreAddressesFromMnemonic,
  sortAccounts,
  openKeystoreModal,
  closeKeystoreModal,
  setEditAccountName,
  setNewAccountName,
  openBackupKeystoreModal,
  openClearKeystoreModal,
  openImportKeystoreAccountModal,
  openNewDerivationPathModal,
  openNewKeystoreAccountModal,
  openNewKeystorePasswordModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(KeystoreModal)
