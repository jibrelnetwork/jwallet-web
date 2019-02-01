// @flow

import { connect } from 'react-redux'
import { t } from 'ttag'

import { selectAllAddressNames } from 'store/selectors/favorites'
import { reactRouterBack } from 'utils/browser'
import {
  selectActiveWallet,
  selectWalletsAddresses,
} from 'store/selectors/wallets'

import DigitalAssetsReceiveView from './DigitalAssetsReceiveView'

const mapStateToProps = (state: AppState) => {
  const addressNames: AddressNames = selectAllAddressNames(state)
  const { addresses }: WalletsAddressesState = selectWalletsAddresses(state)

  const items: AddressNames = addresses
    .reduce((acc, address, index) => ({
      ...acc,
      [address]: addressNames[address] || t`Address #${index}`,
    }), {})

  const wallet = selectActiveWallet(state)

  return {
    items,
    wallet,
  }
}

const mapDispatchToProps = {
  close: () => reactRouterBack({ fallbackUrl: '/digital-assets' }),
}

export default connect/* :: < AppState, any, OwnPropsEmpty, _, _ > */(
  mapStateToProps,
  mapDispatchToProps,
)(DigitalAssetsReceiveView)
