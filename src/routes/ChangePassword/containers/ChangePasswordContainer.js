import { connect } from 'react-redux'

import {
  setOldPassword,
  setNewPassword,
  setConfirmPassword,
  // change,
} from '../modules/changePassword'

import ChangePassword from '../components/ChangePassword'

const mapStateToProps = ({ changePassword }) => changePassword

const mapDispatchToProps = {
  setOldPassword,
  setNewPassword,
  setConfirmPassword,
  // change,
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)
