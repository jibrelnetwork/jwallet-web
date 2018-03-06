import { connect } from 'react-redux'

import {
  setFromAsset,
  setFromAmount,
  setToAsset,
  // convert,
} from '../modules/convertFunds'

import ConvertFunds from '../components/ConvertFunds'

const mapStateToProps = ({ convertFunds }) => convertFunds

const mapDispatchToProps = {
  setFromAsset,
  setFromAmount,
  setToAsset,
  // convert,
}

export default connect(mapStateToProps, mapDispatchToProps)(ConvertFunds)
