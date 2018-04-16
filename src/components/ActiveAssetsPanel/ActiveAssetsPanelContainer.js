// @flow

import { connect } from 'react-redux'
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

const mapDispatchToProps: {
  setCurrent: Function,
  goToWallets: Function,
  goToDigitalAssets: Function,
} = {
  setCurrent,
  goToWallets: () => push('/wallets'),
  goToDigitalAssets: () => push('/digital-assets'),
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveAssetsPanel)
