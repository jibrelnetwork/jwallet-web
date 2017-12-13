import { connect } from 'react-redux'

import {
  closeNewKeystorePasswordModal,
  setOldKeystorePassword,
  setNewKeystorePassword,
  setNewKeystorePasswordInvalidField,
} from 'routes/JWallet/modules/modals/newKeystorePassword'

import { setKeystorePassword } from 'routes/JWallet/modules/keystore'

import NewKeystorePasswordModal from './NewKeystorePasswordModal'

const mapStateToProps = ({ newKeystorePasswordModal }) => ({
  ...newKeystorePasswordModal,
  iconName: '',
  modalName: 'new-keystore-password',
  modalTitle: i18n('modals.changePassword.title'),
  buttonTitle: i18n('modals.changePassword.buttonTitle'),
})

const mapDispatchToProps = {
  closeNewKeystorePasswordModal,
  setOldKeystorePassword,
  setNewKeystorePassword,
  setNewKeystorePasswordInvalidField,
  setKeystorePassword,
}

export default connect(mapStateToProps, mapDispatchToProps)(NewKeystorePasswordModal)
