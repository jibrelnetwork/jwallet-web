// @flow strict

import { connect } from 'react-redux'

import {
  values,
  sortBy,
} from 'lodash-es'

import { selectFavoritesItems } from 'store/selectors/favorites'

import {
  type Props,
  ContactsView,
} from './ContactsView'

function mapStateToProps(state: AppState) {
  const contacts: Favorites = selectFavoritesItems(state)

  return {
    list: sortBy(values(contacts), ['name', 'address']),
  }
}

export const Contacts = connect< Props, OwnPropsEmpty, _, _, _, _ >(mapStateToProps)(ContactsView)
