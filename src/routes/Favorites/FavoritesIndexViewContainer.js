// @flow

import { connect } from 'react-redux'

import flattenFavorites from 'utils/favorites/flattenFavorites'
import { selectFavoritesItems } from 'store/selectors/favorites'

import FavoritesIndexView from './FavoritesIndexView'
import { remove } from './modules/favorites'

function mapStateToProps(state: AppState) {
  const items: Favorites = selectFavoritesItems(state)

  return {
    items: flattenFavorites(items),
  }
}

const mapDispatchToProps = {
  remove,
}

export default (
  connect/* :: < AppState, any, OwnPropsEmpty, _, _ > */(mapStateToProps, mapDispatchToProps)
)(FavoritesIndexView)
