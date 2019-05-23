// @flow

import { connect } from 'react-redux'

import { remove } from 'store/modules/favorites'
import flattenFavorites from 'utils/favorites/flattenFavorites'
import { selectActiveWalletOrThrow } from 'store/selectors/wallets'
import { selectFavoritesItems } from 'store/selectors/favorites'

// eslint-disable-next-line import/no-duplicates
import FavoritesIndexView from './FavoritesIndexView'

// eslint-disable-next-line import/no-duplicates
import { type Props } from './FavoritesIndexView'

function mapStateToProps(state: AppState) {
  const activeWallet: Wallet = selectActiveWalletOrThrow(state)

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
  connect< Props, OwnPropsEmpty, _, _, _, _ >(mapStateToProps, mapDispatchToProps)
)(FavoritesIndexView)
