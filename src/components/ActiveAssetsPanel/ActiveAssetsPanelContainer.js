// @flow

import { compose } from 'ramda'
import { connect } from 'react-redux'
import { withState } from 'recompose'
import { push } from 'react-router-redux'

import keystore from 'services/keystore'
import getActiveDigitalAssetsData from 'utils/digitalAssets/getActiveDigitalAssetsData'
import { setCurrent } from 'routes/DigitalAssets/modules/digitalAssets'

import ActiveAssetsPanel from './ActiveAssetsPanel'

const getWalletAddress = (id: ?WalletId): ?Address => {
  try {
    return id ? keystore.getAddress(id) : null
  } catch (err) {
    return null
  }
}

const mapStateToProps: Function = ({ digitalAssets, wallets }: State): {
  digitalAssets: Array<DigitalAssetMainDataWithBalance>,
  isLoading: boolean,
  currentAssetAddress: ?Address,
  currentWalletAddress: ?Address,
} => ({
  isLoading: digitalAssets.isBalancesLoading,
  digitalAssets: getActiveDigitalAssetsData(digitalAssets),
  currentAssetAddress: digitalAssets.currentAddress,
  currentWalletAddress: getWalletAddress(wallets.activeWalletId),
})

const mapDispatchToProps: {
  setCurrent: Function,
  goToWallets: Function,
  goToDigitalAssets: Function,
} = {
  setCurrent,
  goToWallets: () => push('/wallets'),
  goToDigitalAssets: () => push('/digital-assets'),
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withState('hoveredAsset', 'hover', null),
)(ActiveAssetsPanel)
