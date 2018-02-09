import { connect } from 'react-redux'

import {
  setPassword,
  setNewPassword,
  setConfirmPassword,
  change,
} from '../modules/changePassword'

import ChangePassword from '../components/ChangePassword'

const mapStateToProps = ({ changePassword }) => changePassword

const mapDispatchToProps = {
  setPassword,
  setNewPassword,
  setConfirmPassword,
  change,
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)
