import { compose } from 'ramda'
import { connect } from 'react-redux'
import lifecycle from 'recompose/lifecycle'

import keystore from 'services/keystore'

import {
  open,
  close,
  setKnownDerivationPath,
  setCustomDerivationPath,
  setName,
  setPassword,
  goToPasswordStep,
  save,
  remove,
} from '../modules/editKey'

import EditKey from '../components/EditKey'

const mapStateToProps = ({ editKey }) => ({
  ...editKey,
  address: editKey.keyId ? keystore.getAddress(editKey.keyId) : '',
})

const mapDispatchToProps = {
  open,
  close,
  setKnownDerivationPath,
  setCustomDerivationPath,
  setName,
  setPassword,
  goToPasswordStep,
  save,
  remove,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() { this.props.open(this.props.params.keyId) },
    componentWillUnmount() { this.props.close() },
  }),
)(EditKey)
