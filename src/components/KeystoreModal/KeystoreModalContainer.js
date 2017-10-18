import { connect } from 'react-redux'

import {
  setCurrentKeystoreAccount,
  removeKeystoreAccount,
  removeKeystoreAccounts,
  setKeystoreAccountName,
  setKeystoreAccountDerivationPath,
  setKeystoreAccountAddress,
  getKeystoreAddressesFromMnemonic,
  sortAccounts,
  openKeystoreModal,
  closeKeystoreModal,
  openNewKeyModal,
  openImportKeyModal,
  openBackupKeystoreModal,
  openDerivationPathModal,
  setEditAccountName,
  setNewAccountName,
} from 'routes/JWallet/modules/keystore'

import { openNewKeystorePasswordModal } from 'routes/JWallet/modules/modals/newKeystorePassword'

import KeystoreModal from './KeystoreModal'

const mapStateToProps = state => ({
  keystore: state.keystore,
})

const mapDispatchToProps = {
  setCurrentKeystoreAccount,
  removeKeystoreAccount,
  removeKeystoreAccounts,
  setKeystoreAccountName,
  setKeystoreAccountDerivationPath,
  setKeystoreAccountAddress,
  getKeystoreAddressesFromMnemonic,
  sortAccounts,
  openKeystoreModal,
  closeKeystoreModal,
  openNewKeyModal,
  openImportKeyModal,
  openBackupKeystoreModal,
  openDerivationPathModal,
  setEditAccountName,
  setNewAccountName,
  openNewKeystorePasswordModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(KeystoreModal)
