import { connect } from 'react-redux'

import { openNewKeystoreAccountModal } from 'routes/JWallet/modules/modals/newKeystoreAccount'
import { openImportKeystoreAccountModal } from 'routes/JWallet/modules/modals/importKeystoreAccount'

import Auth from '../components/Auth'

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  openNewKeystoreAccountModal: openNewKeystoreAccountModal.bind(null, null),
  openImportKeystoreAccountModal: openImportKeystoreAccountModal.bind(null, null),
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
