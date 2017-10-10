import { connect } from 'react-redux'

import {
  openKeystoreModal,
  closeImportKeyModal,
  setImportKeyData,
  setImportKeyPassword,
  setImportKeyPasswordConfirm,
  createKeystoreAccount,
} from 'routes/JWallet/modules/keystore'

import ImportKeyModal from './ImportKeyModal'

const mapStateToProps = state => ({
  keystore: state.keystore,
})

const mapDispatchToProps = {
  openKeystoreModal,
  closeImportKeyModal,
  setImportKeyData,
  setImportKeyPassword,
  setImportKeyPasswordConfirm,
  createKeystoreAccount,
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportKeyModal)
