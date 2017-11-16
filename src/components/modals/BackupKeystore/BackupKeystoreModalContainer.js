import { connect } from 'react-redux'

import i18n from 'i18n/en'

import {
  closeBackupKeystoreModal,
  setBackupKeystorePassword,
  setBackupKeystoreInvalidField,
} from 'routes/JWallet/modules/modals/backupKeystore'

import { backupKeystore } from 'routes/JWallet/modules/keystore'

import BackupKeystoreModal from './BackupKeystoreModal'

const { title, buttonTitle } = i18n.modals.backupKeysore

const mapStateToProps = state => ({
  ...state.backupKeystoreModal,
  buttonTitle,
  modalTitle: title,
  modalName: 'backup-keystore',
  buttonType: 'password',
  imageName: 'keys-ok',
  iconName: 'txt',
})

const mapDispatchToProps = {
  closeBackupKeystoreModal,
  setBackupKeystorePassword,
  setBackupKeystoreInvalidField,
  backupKeystore,
}

export default connect(mapStateToProps, mapDispatchToProps)(BackupKeystoreModal)
