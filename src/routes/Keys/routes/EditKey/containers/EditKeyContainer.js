import { compose } from 'ramda'
import { connect } from 'react-redux'
import lifecycle from 'recompose/lifecycle'

import keystore from 'services/keystore'
import isMnemonicType from 'utils/isMnemonicType'

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

const getKeyAddress = (id) => {
  if (!id) {
    return ''
  }

  const { address, addressIndex, type } = keystore.getAccount({ id })

  return isMnemonicType(type)
    ? keystore.getAddressesFromMnemonic(id, addressIndex, 1).shift()
    : address
}

const mapStateToProps = ({ editKey }) => ({
  ...editKey,
  address: getKeyAddress(editKey.keyId),
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
