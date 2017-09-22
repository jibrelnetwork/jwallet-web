import { connect } from 'react-redux'

import {
  closeReceiveFundsModal,
  setReceiveFundsAmount,
  setReceiveFundsSymbol,
  setReceiveFundsAccount,
  setReceiveFundsAddress,
  generateQRCode,
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
}

export default connect(mapStateToProps, mapDispatchToProps)(ReceiveFundsModal)
