import { connect } from 'react-redux'

import {
  closeBackupKeysModal,
  setBackupKeysAddress,
  setBackupKeysPrivateKey,
  setBackupKeysMnemonic,
  setBackupKeysPincode,
  backupKeys,
} from 'routes/JWallet/modules/keys'

import BackupKeysModal from './BackupKeysModal'

const mapStateToProps = state => ({
  keys: state.keys,
})

const mapDispatchToProps = {
  closeBackupKeysModal,
  setBackupKeysAddress,
  setBackupKeysPrivateKey,
  setBackupKeysMnemonic,
  setBackupKeysPincode,
  backupKeys,
}

export default connect(mapStateToProps, mapDispatchToProps)(BackupKeysModal)
