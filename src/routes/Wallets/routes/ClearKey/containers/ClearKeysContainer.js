import { connect } from 'react-redux'

import {
  clear,
} from '../modules/clearKeys'

import ClearKeys from '../components/ClearKeys'

const mapStateToProps = null

const mapDispatchToProps = {
  clear,
}

export default connect(mapStateToProps, mapDispatchToProps)(ClearKeys)
