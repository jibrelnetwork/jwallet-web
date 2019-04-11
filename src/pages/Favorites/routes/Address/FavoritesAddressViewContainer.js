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

import FavoritesAddressView from './FavoritesAddressView'

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

/* ::
type OwnProps = {|
  +params: {|
    +address?: string,
  |}
|}
*/

export default (
  connect/* :: < AppState, any, OwnProps, _, _ > */(mapStateToProps, mapDispatchToProps)
)(FavoritesAddressView)
