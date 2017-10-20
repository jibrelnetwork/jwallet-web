import { connect } from 'react-redux'

import {
  closeReceiveFundsModal,
  setReceiveFundsAmount,
  setReceiveFundsSymbol,
  setReceiveFundsAccount,
  setReceiveFundsAddress,
} from 'routes/JWallet/modules/modals/receiveFunds'

import ReceiveFundsModal from './ReceiveFundsModal'

const mapStateToProps = state => state.receiveFundsModal

const mapDispatchToProps = {
  closeReceiveFundsModal,
  setReceiveFundsAddress,
  setReceiveFundsAmount,
  setReceiveFundsSymbol,
  setReceiveFundsAccount,
}

export default connect(mapStateToProps, mapDispatchToProps)(ReceiveFundsModal)
