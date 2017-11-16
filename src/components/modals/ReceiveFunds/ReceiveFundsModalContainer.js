import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'

import i18n from 'i18n/en'

import {
  closeReceiveFundsModal,
  setReceiveFundsAmount,
} from 'routes/JWallet/modules/modals/receiveFunds'

import ReceiveFundsModal from './ReceiveFundsModal'

const { title, buttonTitle } = i18n.modals.receiveFunds

const mapStateToProps = (state) => {
  const { receiveFundsModal, keystore } = state
  const { currentAccount, addressesFromMnemonic } = keystore
  const { address, addressIndex } = currentAccount

  const currentAddress = isEmpty(address) ? addressesFromMnemonic.items[addressIndex] : address

  return {
    ...receiveFundsModal,
    currentAddress,
    buttonTitle,
    modalName: 'receive-funds',
    modalTitle: title,
    iconName: 'qr-code',
  }
}

const mapDispatchToProps = {
  closeReceiveFundsModal,
  setReceiveFundsAmount,
}

export default connect(mapStateToProps, mapDispatchToProps)(ReceiveFundsModal)
