// @flow strict

import { connect } from 'react-redux'

import {
  type Props,
  ContactsItemDeleteView,
} from './ContactsItemDeleteView'

type OwnProps = {|
  +contactId: ContactId,
|}

function mapStateToProps(state: AppState, { contactId }: OwnProps) {
  const name = 'Sarah Jessica Parcel'

  return {
    contactId,
    name,
  }
}

export const ContactsItemDelete =
  connect< Props, OwnProps, _, _, _, _ >(mapStateToProps)(ContactsItemDeleteView)
