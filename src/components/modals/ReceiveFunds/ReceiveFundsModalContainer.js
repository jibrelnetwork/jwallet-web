import isEmpty from 'lodash/isEmpty'
import { connect } from 'react-redux'

import getKeystoreAccountType from 'utils/getKeystoreAccountType'

import {
  closeReceiveFundsModal,
  setReceiveFundsAmount,
} from 'routes/JWallet/modules/modals/receiveFunds'

import ReceiveFundsModal from './ReceiveFundsModal'

const mapStateToProps = ({ receiveFundsModal, keystore }) => {
  const { currentAccount, addressesFromMnemonic } = keystore
  const { address, addressIndex } = currentAccount

  return {
    ...receiveFundsModal,
    modalName: 'receive-funds',
    iconName: 'qr-code',
    modalTitle: i18n('modals.receiveFunds.title'),
    buttonTitle: i18n('modals.receiveFunds.buttonTitle'),
    accountType: getKeystoreAccountType(currentAccount),
    currentAddress: isEmpty(address) ? addressesFromMnemonic.items[addressIndex] : address,
  }
}

const mapDispatchToProps = {
  closeReceiveFundsModal,
  setReceiveFundsAmount,
}

export default connect(mapStateToProps, mapDispatchToProps)(ReceiveFundsModal)
