import { connect } from 'react-redux'

import {
  closeBackupKeystoreModal,
  setBackupKeystorePassword,
  backupKeystore,
} from 'routes/JWallet/modules/keystore'

import BackupKeystoreModal from './BackupKeystoreModal'

const mapStateToProps = state => ({
  keystore: state.keystore,
})

const mapDispatchToProps = {
  closeBackupKeystoreModal,
  setBackupKeystorePassword,
  backupKeystore,
}

export default connect(mapStateToProps, mapDispatchToProps)(BackupKeystoreModal)
