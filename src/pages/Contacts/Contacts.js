// @flow

import { connect } from 'react-redux'
import {
  sortBy,
} from 'lodash-es'

import {
  type Props,
  ContactsView,
} from './ContactsView'

import CONTACT_LIST from './CONTACT_LIST'

function mapStateToProps() {
  const contactsList: Contact[] = sortBy(CONTACT_LIST, ['name', 'id'])

  return {
    list: contactsList,
  }
}

export const Contacts =
  connect< Props, {||}, _, _, _, _ >(mapStateToProps)(ContactsView)
