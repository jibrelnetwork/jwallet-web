// @flow

import { connect } from 'react-redux'

import { selectWalletsAddressesList } from 'store/stateSelectors'
import { selectActiveWallet } from 'store/selectors/wallets'
import { reactRouterBack } from 'utils/browser'
import { isVoid } from 'utils/type/'

import DigitalAssetsReceiveView from './DigitalAssetsReceiveView'

const mapStateToProps = (state: AppState) => {
  const walletsList: AddressNames = selectWalletsAddressesList(state)
    .reduce((acc, address, index) => ({ ...acc, [address]: `Address #${index}` }), {})

  const activeWallet = selectActiveWallet(state)
  const walletAddress = activeWallet ? activeWallet.address : null
  const items: AddressNames = isVoid(walletAddress) ?
    walletsList : { [walletAddress]: 'Address #0' }

  return {
    items,
  }
}

const mapDispatchToProps = {
  close: () => reactRouterBack({ fallbackUrl: '/digital-assets' }),
}

export default (
  connect/* :: < AppState, any, OwnPropsEmpty, _, _ > */(mapStateToProps, mapDispatchToProps)
)(DigitalAssetsReceiveView)
