import { connect } from 'react-redux'

import {
  closeBackupKeystoreModal,
  setBackupKeystorePassword,
  setBackupKeystoreInvalidField,
} from 'routes/JWallet/modules/modals/backupKeystore'

import { backupKeystore } from 'routes/JWallet/modules/keystore'

import BackupKeystoreModal from './BackupKeystoreModal'

const mapStateToProps = state => ({
  ...state.backupKeystoreModal,
  modalName: 'backup-keystore',
  buttonType: 'password',
  imageName: 'keys-ok',
  iconName: 'txt',
  modalTitle: i18n('modals.backupKeystore.title'),
  buttonTitle: i18n('modals.backupKeystore.buttonTitle'),
})

const mapDispatchToProps = {
  closeBackupKeystoreModal,
  setBackupKeystorePassword,
  setBackupKeystoreInvalidField,
  backupKeystore,
}

export default connect(mapStateToProps, mapDispatchToProps)(BackupKeystoreModal)
