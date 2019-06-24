// @flow strict

import { connect } from 'react-redux'

import {
  type Props,
  ContactsItemEditView,
} from './ContactsItemEditView'

type OwnProps = {|
  +contactId: ContactId,
|}

function mapStateToProps(state: AppState, { contactId }: OwnProps) {
  const note = ''
  const name = contactId

  return {
    contactId,
    note,
    name,
  }
}

export const ContactsItemEdit =
  connect< Props, OwnProps, _, _, _, _ >(mapStateToProps)(ContactsItemEditView)
