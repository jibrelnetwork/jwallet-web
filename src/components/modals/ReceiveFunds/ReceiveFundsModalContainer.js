import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'

import {
  closeReceiveFundsModal,
  setReceiveFundsAmount,
} from 'routes/JWallet/modules/modals/receiveFunds'

import ReceiveFundsModal from './ReceiveFundsModal'

const mapStateToProps = (state) => {
  const { receiveFundsModal, keystore } = state
  const { currentAccount, addressesFromMnemonic } = keystore
  const { address, addressIndex } = currentAccount

  const currentAddress = isEmpty(address) ? addressesFromMnemonic.items[addressIndex] : address

  return {
    ...receiveFundsModal,
    currentAddress,
    modalName: 'receive-funds',
    modalTitle: 'Receive Funds',
    buttonTitle: 'Generate QR Code',
    iconName: 'qr-code',
  }
}

const mapDispatchToProps = {
  closeReceiveFundsModal,
  setReceiveFundsAmount,
}

export default connect(mapStateToProps, mapDispatchToProps)(ReceiveFundsModal)
