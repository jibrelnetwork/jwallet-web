import { connect } from 'react-redux'

import {
  setFromAsset,
  setFromAmount,
  setToAsset,
  // convert,
} from '../modules/convertFunds'

import FundsConvertView from '../components/FundsConvertView'

const mapStateToProps = ({ convertFunds }) => convertFunds

const mapDispatchToProps = {
  setFromAsset,
  setFromAmount,
  setToAsset,
  // convert,
}

export default connect(mapStateToProps, mapDispatchToProps)(FundsConvertView)
