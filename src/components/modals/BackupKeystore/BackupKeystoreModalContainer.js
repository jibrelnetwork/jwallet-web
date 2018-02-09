import { connect } from 'react-redux'

import { backupKeystore } from 'routes/JWallet/modules/keystore'
import { closeModal, setPassword } from 'routes/JWallet/modules/modals/backupKeystore'

import BackupKeystoreModal from './BackupKeystoreModal'

const mapStateToProps = ({ backupKeystoreModal }) => ({
  ...backupKeystoreModal,
  modalName: 'backup-keystore',
  buttonType: 'password',
  imageName: 'keys-ok',
  iconName: 'txt',
  modalTitle: i18n('routes.backupKeys.title'),
  buttonTitle: i18n('routes.backupKeys.buttonTitle'),
})

const mapDispatchToProps = {
  closeModal,
  setPassword,
  backupKeystore,
}

export default connect(mapStateToProps, mapDispatchToProps)(BackupKeystoreModal)
