// @flow

import { connect } from 'react-redux'

import { reactRouterBack } from 'utils/browser'
import { selectActiveWalletAddress } from 'store/selectors/wallets'

import DigitalAssetsReceiveView from './DigitalAssetsReceiveView'

const mapStateToProps = (state: AppState) => {
  const address = selectActiveWalletAddress(state)

  return {
    address,
  }
}

const mapDispatchToProps = {
  close: () => reactRouterBack({ fallbackUrl: '/digital-assets' }),
}

export default connect/* :: < AppState, any, OwnPropsEmpty, _, _ > */(
  mapStateToProps,
  mapDispatchToProps,
)(DigitalAssetsReceiveView)
