// @flow

import { connect } from 'react-redux'
import { replace } from 'react-router-redux'

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
      isLoading: false,
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
    isLoading: false,
  }
}

const mapDispatchToProps = {
  onClose: () => reactRouterBack({ fallbackUrl: '/digital-assets' }),
  onUnavailable: () => replace('/digital-assets'),
  onSubmitPrivateKey: () => undefined,
  onSubmitMnemonic: () => undefined,
}

/* ::
type OwnProps = {|
|}
*/

export default connect/* :: < AppState, any, OwnProps, _, _ > */(
  mapStateToProps,
  mapDispatchToProps
)(VerifyView)
