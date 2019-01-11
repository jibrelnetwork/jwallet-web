// @flow

import { connect } from 'react-redux'
import { replace } from 'react-router-redux'

import reactRouterBack from 'utils/browser/reactRouterBack'

import getWallet from 'utils/wallets/getWallet'
import checkMnemonicType from 'utils/wallets/checkMnemonicType'
import { selectUpgrade } from 'store/selectors/upgrade'

import {
  selectWalletsItems,
  selectActiveWalletId,
} from 'store/selectors/wallets'

import UpgradeView from './UpgradeView'

import {
  submitMnemonicRequest as onSubmitMnemonic,
  submitPrivateKeyRequest as onSubmitPrivateKey,
} from './modules/upgrade'

function mapStateToProps(state: AppState) {
  const wallets: Wallets = selectWalletsItems(state)
  const activeWalletId: ?WalletId = selectActiveWalletId(state)
  const wallet: ?Wallet = getWallet(wallets, activeWalletId)

  const {
    isLoading,
    isInvalidPassword,
  }: UpgradeState = selectUpgrade(state)

  if (!wallet) {
    throw new Error('ActiveWalletNotFoundError')
  }

  const {
    type,
    isReadOnly,
  }: Wallet = wallet

  return {
    isLoading,
    isReadOnly,
    isInvalidPassword,
    isMnemonic: checkMnemonicType(type),
  }
}

const mapDispatchToProps = {
  onSubmitMnemonic,
  onSubmitPrivateKey,
  onUnavailable: () => replace('/digital-assets'),
  onClose: () => reactRouterBack({ fallbackUrl: '/digital-assets' }),
}

export default connect/* :: < AppState, any, OwnPropsEmpty, _, _ > */(
  mapStateToProps,
  mapDispatchToProps,
)(UpgradeView)
