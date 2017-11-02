import { connect } from 'react-redux'

import {
  closeReceiveFundsModal,
  setReceiveFundsAmount,
  setReceiveFundsSymbol,
  setReceiveFundsAccountId,
} from 'routes/JWallet/modules/modals/receiveFunds'

import ReceiveFundsModal from './ReceiveFundsModal'

const mapStateToProps = state => ({
  ...state.receiveFundsModal,
  accounts: state.keystore.accounts,
  addressesFromMnemonic: state.keystore.addressesFromMnemonic.items,
  modalName: 'receive-funds',
  modalTitle: 'Receive Funds',
  buttonTitle: 'Generate QR Code',
  iconName: 'qr-code',
})

const mapDispatchToProps = {
  closeReceiveFundsModal,
  setReceiveFundsAmount,
  setReceiveFundsSymbol,
  setReceiveFundsAccountId,
}

export default connect(mapStateToProps, mapDispatchToProps)(ReceiveFundsModal)
