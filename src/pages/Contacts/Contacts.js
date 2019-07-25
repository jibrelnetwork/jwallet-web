// @flow

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
  const favorites = selectFavoritesItems(state)

  const contactsList = sortBy(values(favorites), ['name', 'address'])

  return {
    list: contactsList,
  }
}

export const Contacts = connect< Props, OwnPropsEmpty, _, _, _, _ >(
  mapStateToProps,
)(ContactsView)
