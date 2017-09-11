import { connect } from 'react-redux'

import {
  closeReceiveFundsModal,
  setReceiveFundsAmount,
  setReceiveFundsSymbol,
  setReceiveFundsAccount,
  setReceiveFundsAddress,
  generateQRCode,
  receiveFunds,
} from 'routes/JWallet/modules/funds'

import ReceiveFundsModal from './ReceiveFundsModal'

const mapStateToProps = state => ({
  funds: state.funds,
})

const mapDispatchToProps = {
  closeReceiveFundsModal,
  setReceiveFundsAddress,
  setReceiveFundsAmount,
  setReceiveFundsSymbol,
  setReceiveFundsAccount,
  generateQRCode,
  receiveFunds,
}

export default connect(mapStateToProps, mapDispatchToProps)(ReceiveFundsModal)
