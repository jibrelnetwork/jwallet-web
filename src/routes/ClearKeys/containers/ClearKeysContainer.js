import { connect } from 'react-redux'

import {
  setPassword,
  // clear,
} from '../modules/clearKeys'

import ClearKeys from '../components/ClearKeys'

const mapStateToProps = ({ clearKeys }) => clearKeys

const mapDispatchToProps = {
  setPassword,
  // clear,
}

export default connect(mapStateToProps, mapDispatchToProps)(ClearKeys)
