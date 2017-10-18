import { connect } from 'react-redux'

import {
  openKeystoreModal,
  closeBackupKeystoreModal,
  setBackupKeystorePassword,
  setBackupKeystoreInvalidField,
  backupKeystore,
} from 'routes/JWallet/modules/keystore'

import BackupKeystoreModal from './BackupKeystoreModal'

const mapStateToProps = state => ({
  keystore: state.keystore,
})

const mapDispatchToProps = {
  openKeystoreModal,
  closeBackupKeystoreModal,
  setBackupKeystorePassword,
  setBackupKeystoreInvalidField,
  backupKeystore,
}

export default connect(mapStateToProps, mapDispatchToProps)(BackupKeystoreModal)
