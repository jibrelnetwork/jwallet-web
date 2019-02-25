// @flow

import { connect } from 'react-redux'
import { t } from 'ttag'

import { remove } from 'store/modules/favorites'
import flattenFavorites from 'utils/favorites/flattenFavorites'
import { selectActiveWallet } from 'store/selectors/wallets'
import { selectFavoritesItems } from 'store/selectors/favorites'

import FavoritesIndexView from './FavoritesIndexView'

function mapStateToProps(state: AppState) {
  const activeWallet: ?Wallet = selectActiveWallet(state)

  if (!activeWallet) {
    throw new Error(t`ActiveWalletNotFoundError`)
  }

  const items: Favorites = selectFavoritesItems(state)

  return {
    items: flattenFavorites(items),
    isWalletReadOnly: activeWallet.isReadOnly,
  }
}

const mapDispatchToProps = {
  remove,
}

export default (
  connect/* :: < AppState, any, OwnPropsEmpty, _, _ > */(mapStateToProps, mapDispatchToProps)
)(FavoritesIndexView)
