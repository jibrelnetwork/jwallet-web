// @flow

import { connect } from 'react-redux'

import getWallet from 'utils/wallets/getWallet'
import { selectWalletsPersist } from 'store/stateSelectors'

import MenuLayout from './MenuLayout'

type StateProps = {|
  +wallet: ?Wallet,
|}

function mapStateToProps(state: AppState): StateProps {
  const {
    items,
    activeWalletId,
  }: WalletsPersist = selectWalletsPersist(state)

  return {
    wallet: getWallet(items, activeWalletId),
  }
}

export default connect(mapStateToProps)(MenuLayout)
