// @flow

import { connect } from 'react-redux'

import { router5BackOrFallbackFunctionCreator } from 'utils/browser'
import { selectActiveWalletAddress } from 'store/selectors/wallets'

// eslint-disable-next-line import/no-duplicates
import DigitalAssetsReceiveView from './DigitalAssetsReceiveView'

// eslint-disable-next-line import/no-duplicates
import { type Props } from './DigitalAssetsReceiveView'

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

export default connect< Props, OwnPropsEmpty, _, _, _, _ >(
  mapStateToProps,
  null,
)(DigitalAssetsReceiveView)
