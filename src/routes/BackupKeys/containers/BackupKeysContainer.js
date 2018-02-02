import { connect } from 'react-redux'

import {
  setPassword,
  // backup,
} from '../modules/backupKeys'

import BackupKeys from '../components/BackupKeys'

const mapStateToProps = ({ backupKeys }) => backupKeys

const mapDispatchToProps = {
  setPassword,
  // backup,
}

export default connect(mapStateToProps, mapDispatchToProps)(BackupKeys)
