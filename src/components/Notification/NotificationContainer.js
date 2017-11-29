import { connect } from 'react-redux'

import { checkNotification, closeNotification } from 'routes/JWallet/modules/notification'

import Notification from './Notification'

const mapStateToProps = (state) => state.notification

const mapDispatchToProps = { checkNotification, closeNotification }

export default connect(mapStateToProps, mapDispatchToProps)(Notification)
