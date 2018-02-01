import { connect } from 'react-redux'

import {
  setAddress,
  setName,
  setSymbol,
  setDecimals,
  // add,
} from '../modules/addCustomAsset'

import AddCustomAsset from '../components/AddCustomAsset'

const mapStateToProps = ({ addCustomAsset }) => addCustomAsset

const mapDispatchToProps = {
  setAddress,
  setName,
  setSymbol,
  setDecimals,
  // add,
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCustomAsset)
