import { connect } from 'react-redux'

import {
  closeBackupKeystoreModal,
  setBackupKeystorePassword,
  backupKeystore,
} from 'routes/JWallet/modules/keystore'

import KeystoreModal from './KeystoreModal'

const mapStateToProps = state => ({
  keystore: state.keystore,
})

const mapDispatchToProps = {
  closeBackupKeystoreModal,
  setBackupKeystorePassword,
  backupKeystore,
}

export default connect(mapStateToProps, mapDispatchToProps)(KeystoreModal)
