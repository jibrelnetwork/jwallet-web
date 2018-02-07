import { connect } from 'react-redux'

import { removeKeystoreAccounts } from 'routes/JWallet/modules/keystore'
import { closeClearKeystoreModal } from 'routes/JWallet/modules/modals/clearKeystore'

import ClearKeystoreModal from './ClearKeystoreModal'

const mapStateToProps = ({ clearKeystoreModal }) => ({
  ...clearKeystoreModal,
  imageName: 'done',
  modalName: 'clear-keystore',
  alert: i18n('modals.removeAccounts.alert'),
  modalTitle: i18n('modals.removeAccounts.title'),
  buttonTitle: i18n('modals.removeAccounts.buttonTitle'),
})

const mapDispatchToProps = {
  closeClearKeystoreModal,
  removeKeystoreAccounts,
}

export default connect(mapStateToProps, mapDispatchToProps)(ClearKeystoreModal)
