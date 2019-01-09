// @flow

import { connect } from 'react-redux'

import reactRouterBack from 'utils/browser/reactRouterBack'

import { selectActiveWalletId, selectWalletsItems } from 'store/selectors/wallets'
import getWallet from 'utils/wallets/getWallet'
import checkMnemonicType from 'utils/wallets/checkMnemonicType'

import VerifyView from './VerifyView'

function mapStateToProps(state: AppState) {
  const wallets: Wallets = selectWalletsItems(state)
  const activeWalletId: ?WalletId = selectActiveWalletId(state)
  const wallet: ?Wallet = getWallet(wallets, activeWalletId)

  if (!wallet) {
    return {
      isReadOnly: false,
      isMnemonic: false,
    }
  }

  const {
    type,
    isReadOnly,
  }: Wallet = wallet
  const isMnemonic = checkMnemonicType(type)

  return {
    isReadOnly,
    isMnemonic,
  }
}

const mapDispatchToProps = {
  onClose: () => reactRouterBack({ fallbackUrl: '/digital-assets' }),
}

/* ::
type OwnProps = {|
|}
*/

export default connect/* :: < AppState, any, OwnProps, _, _ > */(
  mapStateToProps,
  mapDispatchToProps
)(VerifyView)
