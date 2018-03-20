// @flow

import { connect } from 'react-redux'

import keystore from 'services/keystore'
import getActiveDigitalAssetsData from 'utils/getActiveDigitalAssetsData'
import { setCurrent } from 'routes/DigitalAssets/modules/digitalAssets'

import ActiveAssetsPanel from './ActiveAssetsPanel'

const getWalletAddress = (id: ?WalletId): ?Address => {
  try {
    return id ? keystore.getAddress(id) : null
  } catch (err) {
    return null
  }
}

const mapStateToProps = ({ digitalAssets, wallets }: State): {
  digitalAssets: Array<Object>,
  isLoading: boolean,
  currentAssetAddress: ?Address,
  currentWalletAddress: ?Address,
} => ({
  isLoading: digitalAssets.isBalancesLoading,
  digitalAssets: getActiveDigitalAssetsData(digitalAssets),
  currentAssetAddress: digitalAssets.currentAddress,
  currentWalletAddress: getWalletAddress(wallets.activeWalletId),
})

const mapDispatchToProps = {
  setCurrent,
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveAssetsPanel)
