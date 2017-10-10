import { connect } from 'react-redux'

import {
  setCurrentKeystoreAccount,
  removeKeystoreAccount,
  removeKeystoreAccounts,
  setKeystoreAccountName,
  setKeystoreAccountDerivationPath,
  setKeystoreAccountAddress,
  getKeystoreAddressesFromMnemonic,
  setKeystorePassword,
  sortAccounts,
  closeKeystoreModal,
  openNewKeyModal,
  openImportKeyModal,
  openBackupKeystoreModal,
} from 'routes/JWallet/modules/keystore'

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
  setKeystorePassword,
  sortAccounts,
  closeKeystoreModal,
  openNewKeyModal,
  openImportKeyModal,
  openBackupKeystoreModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(KeystoreModal)
