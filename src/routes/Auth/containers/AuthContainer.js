import { connect } from 'react-redux'

import { addNewKeys, importKeys } from 'routes/JWallet/modules/keys'

import Auth from '../components/Auth'

const mapStateToProps = () => ({})
const mapDispatchToProps = { addNewKeys, importKeys }

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
