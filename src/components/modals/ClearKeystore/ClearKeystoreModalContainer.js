import { connect } from 'react-redux'

import {
  closeClearKeystoreModal,
  setClearKeystorePassword,
} from 'routes/JWallet/modules/modals/clearKeystore'

import { removeKeystoreAccounts } from 'routes/JWallet/modules/keystore'

import ClearKeystoreModal from './ClearKeystoreModal'

const mapStateToProps = ({ clearKeystoreModal }) => ({
  ...clearKeystoreModal,
  imageName: 'done',
  buttonType: 'password',
  modalName: 'clear-keystore',
  alert: i18n('modals.removeAccounts.alert'),
  modalTitle: i18n('modals.removeAccounts.title'),
  buttonTitle: i18n('modals.removeAccounts.buttonTitle'),
})

const mapDispatchToProps = {
  closeClearKeystoreModal,
  setClearKeystorePassword,
  removeKeystoreAccounts,
}

export default connect(mapStateToProps, mapDispatchToProps)(ClearKeystoreModal)
