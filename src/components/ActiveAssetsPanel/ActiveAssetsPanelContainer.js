// @flow

import { compose } from 'ramda'
import { connect } from 'react-redux'
import { withState } from 'recompose'
import { push } from 'react-router-redux'

import keystore from 'services/keystore'
import checkWalletReadOnly from 'utils/keystore/checkWalletReadOnly'
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
  currentAssetAddress: ?Address,
  currentWalletAddress: ?Address,
  isLoading: boolean,
  isWalletReadOnly: boolean,
} => ({
  isLoading: digitalAssets.isBalancesLoading,
  currentAssetAddress: digitalAssets.currentAddress,
  digitalAssets: getActiveDigitalAssetsData(digitalAssets),
  isWalletReadOnly: checkWalletReadOnly(wallets.activeWalletId),
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
  withState('isManageHovered', 'setManageHovered', false),
)(ActiveAssetsPanel)
