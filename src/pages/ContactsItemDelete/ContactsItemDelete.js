// @flow strict

import { connect } from 'react-redux'
import { actions as routerActions } from 'redux-router5'

import { selectFavorite } from 'store/selectors/favorites'

import * as favorites from 'store/modules/favorites'

import {
  type Props,
  ContactsItemDeleteView,
} from './ContactsItemDeleteView'

type OwnProps = {|
  +contactId: OwnerAddress,
|}

function mapStateToProps(state: AppState, { contactId }: OwnProps) {
  const {
    address,
    name = '',
  } = selectFavorite(state, contactId || '') || {}

  return {
    address,
    name,
  }
}

const mapDispatchToProps = {
  onDeleteContact: (address: OwnerAddress) => favorites.remove(address),
  goBack: () => routerActions.navigateTo('Contacts'),
}

export const ContactsItemDelete = connect<Props, OwnProps, _, _, _, _>(
  mapStateToProps,
  mapDispatchToProps,
)(ContactsItemDeleteView)
