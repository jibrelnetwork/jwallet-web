// @flow

import { connect } from 'react-redux'

import { selectWalletsAddressesList } from 'store/stateSelectors'
import { selectActiveWallet } from 'store/selectors/wallets'
import { reactRouterBack } from 'utils/browser'

import DigitalAssetsReceiveView from './DigitalAssetsReceiveView'

const mapStateToProps = (state: AppState) => {
  const items: AddressNames = selectWalletsAddressesList(state)
    .reduce((acc, address, index) => ({ ...acc, [address]: `Address #${index}` }), {})

  const wallet = selectActiveWallet(state)

  return {
    items,
    wallet,
  }
}

const mapDispatchToProps = {
  close: () => reactRouterBack({ fallbackUrl: '/digital-assets' }),
}

export default (
  connect/* :: < AppState, any, OwnPropsEmpty, _, _ > */(mapStateToProps, mapDispatchToProps)
)(DigitalAssetsReceiveView)
