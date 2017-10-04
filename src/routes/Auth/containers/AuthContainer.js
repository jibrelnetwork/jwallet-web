import { connect } from 'react-redux'

import { openNewKeyModal, openImportKeyModal } from 'routes/JWallet/modules/keystore'

import Auth from '../components/Auth'

const mapStateToProps = () => ({})
const mapDispatchToProps = { openNewKeyModal, openImportKeyModal }

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
