// @flow

import { connect } from 'react-redux'

import {
  selectFavorites,
  selectFavoritesItems,
} from 'store/selectors/favorites'
import {
  edit,
  addByUser,
  setFormFieldValue,
  onAddressViewClose,
} from 'store/modules/favorites'
import { router5BackOrFallbackFunctionCreator } from 'utils/browser'

// eslint-disable-next-line import/no-duplicates
import FavoritesAddressView from './FavoritesAddressView'

// eslint-disable-next-line import/no-duplicates
import { type Props } from './FavoritesAddressView'

type OwnProps = {|
  +params: {|
    +address?: string,
  |},
|}

function mapStateToProps(state: AppState, ownProps: OwnProps) {
  const {
    formFieldValues,
    formFieldErrors,
    isLoading,
  }: FavoritesState = selectFavorites(state)

  const { address } = ownProps.params
  const items: Favorites = selectFavoritesItems(state)

  return {
    close: router5BackOrFallbackFunctionCreator(
      state.router.previousRoute,
      'Wallet.Favorites',
    ),
    isLoading,
    formFieldValues,
    formFieldErrors,
    foundFavorite: address ? items[address] : null,
  }
}

const mapDispatchToProps = {
  edit,
  setFormFieldValue,
  add: addByUser,
  onClose: onAddressViewClose,
}

export default (
  connect< Props, OwnProps, _, _, _, _ >(mapStateToProps, mapDispatchToProps)
)(FavoritesAddressView)
