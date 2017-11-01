import { connect } from 'react-redux'

import {
  closeReceiveFundsModal,
  setReceiveFundsAmount,
  setReceiveFundsSymbol,
  setReceiveFundsAccount,
} from 'routes/JWallet/modules/modals/receiveFunds'

import ReceiveFundsModal from './ReceiveFundsModal'

const mapStateToProps = state => ({
  ...state.receiveFundsModal,
  accounts: state.keystore.accounts,
  addressesFromMnemonic: state.keystore.addressesFromMnemonic.items,
})

const mapDispatchToProps = {
  closeReceiveFundsModal,
  setReceiveFundsAmount,
  setReceiveFundsSymbol,
  setReceiveFundsAccount,
}

export default connect(mapStateToProps, mapDispatchToProps)(ReceiveFundsModal)
