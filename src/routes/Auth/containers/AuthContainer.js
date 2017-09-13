import { connect } from 'react-redux'

import { openNewKeysModal, openImportKeysModal } from 'routes/JWallet/modules/keys'

import Auth from '../components/Auth'

const mapStateToProps = () => ({})
const mapDispatchToProps = { openNewKeysModal, openImportKeysModal }

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
