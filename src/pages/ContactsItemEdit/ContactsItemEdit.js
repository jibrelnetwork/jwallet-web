// @flow strict

import { connect } from 'react-redux'

import { getShortenedAddress } from 'utils/address'

import {
  type Props,
  ContactsItemEditView,
} from './ContactsItemEditView'

type OwnProps = {|
  +contactId: ContactId,
|}

function mapStateToProps(state: AppState, { contactId }: OwnProps) {
  // const hasTransaction = transactionsIndex(state)[itemId] !== undefined

  // if (!hasTransaction) {
  //   throw new PageNotFoundError()
  // }

  const note = ''
  const name = getShortenedAddress(contactId)

  return {
    contactId,
    note,
    name,
  }
}

export const ContactsItemEdit =
  connect< Props, OwnProps, _, _, _, _ >(mapStateToProps)(ContactsItemEditView)
