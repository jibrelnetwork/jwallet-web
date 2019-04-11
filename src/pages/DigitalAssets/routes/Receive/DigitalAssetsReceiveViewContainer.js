// @flow

import { connect } from 'react-redux'

import { router5BackOrFallbackFunctionCreator } from 'utils/browser'
import { selectActiveWalletAddress } from 'store/selectors/wallets'

import DigitalAssetsReceiveView from './DigitalAssetsReceiveView'

const mapStateToProps = (state: AppState) => {
  const address = selectActiveWalletAddress(state)

  return {
    address,
    close: router5BackOrFallbackFunctionCreator(
      state.router.previousRoute,
      'Wallet',
    ),
  }
}

export default connect/* :: < AppState, any, OwnPropsEmpty, _, _ > */(
  mapStateToProps,
  null,
)(DigitalAssetsReceiveView)
